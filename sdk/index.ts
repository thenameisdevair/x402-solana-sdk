/**
 * @x402/solana-sdk
 * 
 * TypeScript SDK for implementing HTTP 402 payment flows on Solana
 * 
 * @example Client Usage (Node.js)
 * ```typescript
 * import { x402Fetch } from '@x402/solana-sdk';
 * import { Keypair } from '@solana/web3.js';
 * 
 * const wallet = Keypair.fromSecretKey(yourSecretKey);
 * 
 * const response = await x402Fetch('https://api.example.com/data', {
 *   network: 'devnet',
 *   signer: wallet
 * });
 * ```
 * 
 * @example Server Usage (Express)
 * ```typescript
 * import { createX402Server } from '@x402/solana-sdk';
 * import express from 'express';
 * 
 * const server = createX402Server({
 *   network: 'devnet',
 *   recipientAddress: 'YOUR_SOLANA_ADDRESS'
 * });
 * 
 * app.get('/premium-data', 
 *   server.requirePayment({
 *     amount: '0.001',
 *     token: 'SOL'
 *   }),
 *   (req, res) => {
 *     res.json({ data: 'premium content' });
 *   }
 * );
 * ```
 */

// Client exports
export {
  X402Client,
  x402Fetch,
  createPaymentProof,
  type X402ClientConfig,
  type X402FetchOptions,
  type X402FetchWrapperOptions,
  type WalletAdapter,
  type Signer,
} from "./client";

// Server exports
export {
  X402Server,
  createX402Server,
  x402Middleware,
  type X402ServerConfig,
  type PaymentOptions,
} from "./server";

// Utilities - All Solana transaction helpers
export {
  createConnection,
  getRpcEndpoint,
  createPaymentTransaction,
  createSOLPaymentTransaction,
  createTokenPaymentTransaction,
  signAndSendTransaction,
  confirmTransaction,
  getTransactionStatus,
  verifyPaymentTransaction, // SECURITY CRITICAL: Use for server-side validation
  amountToBaseUnits,
  baseUnitsToAmount,
} from "./solana-utils";

// Types
export {
  type PaymentRequirements,
  type PaymentProof,
  type Network,
  type TokenType,
  type PaymentScheme,
  type TransactionStatus,
  type SDKConfig,
  type X402Response,
  PaymentRequirementsSchema,
  PaymentProofSchema,
  NetworkSchema,
  TokenTypeSchema,
  PaymentSchemeSchema,
  TransactionStatusSchema,
  SDKConfigSchema,
  X402Error,
  PaymentRequiredError,
  TransactionFailedError,
  InvalidPaymentProofError,
} from "@shared/x402-types";

// Version
export const VERSION = "1.0.0";
