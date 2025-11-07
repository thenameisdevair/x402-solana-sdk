import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  SendOptions,
  Keypair,
  TransactionSignature,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import {
  Network,
  TokenType,
  PaymentRequirements,
  TransactionFailedError,
  TransactionStatus,
} from "@shared/x402-types";

/**
 * Token mint addresses for Solana networks
 */
const TOKEN_MINTS: Record<Network, Record<TokenType, string>> = {
  "mainnet-beta": {
    SOL: "So11111111111111111111111111111111111111112", // Wrapped SOL
    USDC: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  },
  devnet: {
    SOL: "So11111111111111111111111111111111111111112",
    USDC: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU", // USDC Devnet
    USDT: "EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS",
  },
  testnet: {
    SOL: "So11111111111111111111111111111111111111112",
    USDC: "CpMah17kQEL2wqyMKt3mZBdTnZbkbfx4nqmQMFDP5vwp",
    USDT: "EJwZgeZrdC8TXTQbQBoL6bfuAnFUUy1PVCMB4DYPzVaS",
  },
};

/**
 * Token decimals
 */
const TOKEN_DECIMALS: Record<TokenType, number> = {
  SOL: 9,
  USDC: 6,
  USDT: 6,
};

/**
 * Get RPC endpoint for network
 */
export function getRpcEndpoint(network: Network, customEndpoint?: string): string {
  if (customEndpoint) return customEndpoint;
  
  switch (network) {
    case "mainnet-beta":
      return "https://api.mainnet-beta.solana.com";
    case "devnet":
      return "https://api.devnet.solana.com";
    case "testnet":
      return "https://api.testnet.solana.com";
    default:
      return "https://api.devnet.solana.com";
  }
}

/**
 * Create a connection to Solana network
 */
export function createConnection(
  network: Network,
  customEndpoint?: string
): Connection {
  const endpoint = getRpcEndpoint(network, customEndpoint);
  return new Connection(endpoint, "confirmed");
}

/**
 * Convert amount string to base units (lamports or token base units)
 */
export function amountToBaseUnits(amount: string, token: TokenType): bigint {
  const decimals = TOKEN_DECIMALS[token];
  const parts = amount.split(".");
  const whole = parts[0] || "0";
  const fraction = (parts[1] || "").padEnd(decimals, "0").slice(0, decimals);
  return BigInt(whole + fraction);
}

/**
 * Convert base units to display amount
 */
export function baseUnitsToAmount(baseUnits: bigint, token: TokenType): string {
  const decimals = TOKEN_DECIMALS[token];
  const str = baseUnits.toString().padStart(decimals + 1, "0");
  const whole = str.slice(0, -decimals) || "0";
  const fraction = str.slice(-decimals);
  return `${whole}.${fraction}`.replace(/\.?0+$/, "");
}

/**
 * Create a SOL payment transaction
 */
export async function createSOLPaymentTransaction(
  connection: Connection,
  payer: PublicKey,
  requirements: PaymentRequirements
): Promise<Transaction> {
  const recipient = new PublicKey(requirements.recipient);
  
  // IMPORTANT: requirements.amount is already in lamports (smallest unit)
  // Parse as BigInt to avoid precision loss with large values
  const lamports = BigInt(requirements.amount);
  
  // Ensure lamports fits in safe Number range for the instruction
  if (lamports > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new TransactionFailedError(
      `Amount ${lamports} exceeds safe integer range. Use a smaller amount.`
    );
  }

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: recipient,
      lamports: Number(lamports),
    })
  );

  // Add memo if provided
  if (requirements.memo) {
    // Note: Memo program would be added here in production
    // For now, we'll skip it to keep dependencies minimal
  }

  // Get recent blockhash
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  return transaction;
}

/**
 * Create a token (USDC/USDT) payment transaction
 */
export async function createTokenPaymentTransaction(
  connection: Connection,
  payer: PublicKey,
  requirements: PaymentRequirements
): Promise<Transaction> {
  const recipient = new PublicKey(requirements.recipient);
  const mintAddress = new PublicKey(
    TOKEN_MINTS[requirements.network][requirements.token]
  );
  
  // Parse amount as BigInt (already in token base units)
  const amount = BigInt(requirements.amount);

  // Get associated token accounts
  const senderATA = await getAssociatedTokenAddress(
    mintAddress,
    payer,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const recipientATA = await getAssociatedTokenAddress(
    mintAddress,
    recipient,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const transaction = new Transaction();

  // Check if sender ATA exists - critical for first-time payers
  const senderAccount = await connection.getAccountInfo(senderATA);
  if (!senderAccount) {
    throw new TransactionFailedError(
      `Sender does not have an associated token account for ${requirements.token}. ` +
      `Please create one first at address: ${senderATA.toBase58()}`
    );
  }

  // Check if recipient ATA exists, create if not
  const recipientAccount = await connection.getAccountInfo(recipientATA);
  if (!recipientAccount) {
    transaction.add(
      createAssociatedTokenAccountInstruction(
        payer,
        recipientATA,
        recipient,
        mintAddress,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );
  }

  // Add transfer instruction
  transaction.add(
    createTransferInstruction(
      senderATA,
      recipientATA,
      payer,
      amount,
      [],
      TOKEN_PROGRAM_ID
    )
  );

  // Get recent blockhash
  const { blockhash } = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = payer;

  return transaction;
}

/**
 * Create payment transaction based on requirements
 */
export async function createPaymentTransaction(
  connection: Connection,
  payer: PublicKey,
  requirements: PaymentRequirements
): Promise<Transaction> {
  if (requirements.token === "SOL") {
    return createSOLPaymentTransaction(connection, payer, requirements);
  } else {
    return createTokenPaymentTransaction(connection, payer, requirements);
  }
}

/**
 * Sign and send transaction
 */
export async function signAndSendTransaction(
  connection: Connection,
  transaction: Transaction,
  signer: Keypair,
  options?: SendOptions
): Promise<TransactionSignature> {
  try {
    // Sign transaction
    transaction.sign(signer);

    // Send transaction
    const signature = await connection.sendRawTransaction(
      transaction.serialize(),
      options || { skipPreflight: false, preflightCommitment: "confirmed" }
    );

    return signature;
  } catch (error) {
    throw new TransactionFailedError(
      `Failed to send transaction: ${error instanceof Error ? error.message : "Unknown error"}`,
      error
    );
  }
}

/**
 * Wait for transaction confirmation
 */
export async function confirmTransaction(
  connection: Connection,
  signature: TransactionSignature,
  commitment: "processed" | "confirmed" | "finalized" = "confirmed"
): Promise<boolean> {
  try {
    const result = await connection.confirmTransaction(signature, commitment);
    return !result.value.err;
  } catch (error) {
    throw new TransactionFailedError(
      `Failed to confirm transaction: ${error instanceof Error ? error.message : "Unknown error"}`,
      error
    );
  }
}

/**
 * Get transaction status
 */
export async function getTransactionStatus(
  connection: Connection,
  signature: TransactionSignature
): Promise<TransactionStatus> {
  try {
    const status = await connection.getSignatureStatus(signature);
    
    if (!status.value) {
      return "pending";
    }
    
    if (status.value.err) {
      return "failed";
    }
    
    if (status.value.confirmationStatus === "finalized") {
      return "finalized";
    }
    
    if (status.value.confirmationStatus === "confirmed") {
      return "confirmed";
    }
    
    return "pending";
  } catch (error) {
    return "failed";
  }
}

/**
 * Verify a payment transaction exists and matches requirements
 * SECURITY CRITICAL: This function validates on-chain payments
 */
export async function verifyPaymentTransaction(
  connection: Connection,
  signature: TransactionSignature,
  requirements: PaymentRequirements,
  commitment: "confirmed" | "finalized" = "confirmed"
): Promise<boolean> {
  try {
    // Fetch transaction with proper commitment level (confirmed or finalized)
    const transaction = await connection.getTransaction(signature, {
      commitment,
      maxSupportedTransactionVersion: 0,
    });

    if (!transaction) {
      console.error("Transaction not found:", signature);
      return false;
    }

    // CRITICAL: Check transaction succeeded
    if (transaction.meta?.err) {
      console.error("Transaction failed on-chain:", transaction.meta.err);
      return false;
    }

    // Ensure proper finality
    if (commitment === "finalized" && transaction.slot) {
      const currentSlot = await connection.getSlot(commitment);
      // Transaction must be old enough to be finalized
      if (currentSlot - transaction.slot < 32) {
        console.warn("Transaction not yet finalized");
        return false;
      }
    }

    const recipient = new PublicKey(requirements.recipient);
    const expectedAmount = BigInt(requirements.amount);

    // Verify SOL transfers
    if (requirements.token === "SOL") {
      const accountKeys = transaction.transaction.message.getAccountKeys();
      const recipientIndex = accountKeys.staticAccountKeys.findIndex((key) =>
        key.equals(recipient)
      );

      if (recipientIndex === -1) {
        console.error("Recipient not found in transaction");
        return false;
      }

      const preBalance = BigInt(transaction.meta?.preBalances[recipientIndex] || 0);
      const postBalance = BigInt(transaction.meta?.postBalances[recipientIndex] || 0);
      const actualAmount = postBalance - preBalance;

      // Allow some tolerance for fees (actual should be >= expected)
      if (actualAmount < expectedAmount) {
        console.error(
          `Insufficient payment: expected ${expectedAmount}, got ${actualAmount}`
        );
        return false;
      }

      return true;
    }

    // Verify token transfers (USDC/USDT)
    if (requirements.token === "USDC" || requirements.token === "USDT") {
      const mintAddress = new PublicKey(
        TOKEN_MINTS[requirements.network][requirements.token]
      );

      // Get recipient's associated token address
      const recipientATA = await getAssociatedTokenAddress(
        mintAddress,
        recipient,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      // Parse token balance changes from transaction metadata
      const postTokenBalances = transaction.meta?.postTokenBalances || [];
      const preTokenBalances = transaction.meta?.preTokenBalances || [];

      // Find the recipient's token account in post balances
      const postBalance = postTokenBalances.find(
        (balance) => balance.owner === recipient.toBase58() &&
                    balance.mint === mintAddress.toBase58()
      );

      const preBalance = preTokenBalances.find(
        (balance) => balance.owner === recipient.toBase58() &&
                    balance.mint === mintAddress.toBase58()
      );

      if (!postBalance) {
        console.error("Recipient token balance not found in transaction");
        return false;
      }

      const actualAmount = BigInt(postBalance.uiTokenAmount.amount) -
                          BigInt(preBalance?.uiTokenAmount.amount || 0);

      if (actualAmount < expectedAmount) {
        console.error(
          `Insufficient token payment: expected ${expectedAmount}, got ${actualAmount}`
        );
        return false;
      }

      return true;
    }

    console.error("Unsupported token type:", requirements.token);
    return false;
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
}
