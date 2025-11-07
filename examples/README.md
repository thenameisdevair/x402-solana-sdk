# x402 Solana SDK Examples

This directory contains working examples demonstrating how to use the x402 Solana SDK for both client and server applications.

## Examples

### 1. Client Agent (`client-agent.ts`)

Demonstrates how an autonomous AI agent can use the SDK to automatically pay for API access.

**Features:**
- Automatic HTTP 402 detection and payment
- Solana transaction signing
- Error handling and retries
- Support for both SOL and USDC payments

**Run:**
```bash
# Set up your agent keypair
export AGENT_PRIVATE_KEY='[1,2,3,...]'  # Your keypair secret key array

# Run the client
npx tsx examples/client-agent.ts
```

### 2. API Server (`server-api.ts`)

Shows how to build an API server that accepts x402 payments using Express middleware.

**Features:**
- Payment verification middleware
- Multiple payment options (SOL/USDC)
- Payment caching for performance
- Transaction status checking

**Run:**
```bash
# Set your recipient address
export RECIPIENT_ADDRESS='YOUR_SOLANA_ADDRESS'

# Start the server
npx tsx examples/server-api.ts
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Fund Your Wallets

For testing on Devnet:

```bash
# Get SOL airdrop
solana airdrop 2 YOUR_ADDRESS --url devnet

# For USDC, use the SPL token faucet or testnet USDC
```

### 3. Run Full Example

**Terminal 1 - Start Server:**
```bash
npx tsx examples/server-api.ts
```

**Terminal 2 - Run Client:**
```bash
npx tsx examples/client-agent.ts
```

## Configuration

### Environment Variables

- `AGENT_PRIVATE_KEY` - Agent wallet private key (as JSON array)
- `RECIPIENT_ADDRESS` - Server wallet address to receive payments
- `PORT` - Server port (default: 3402)
- `SOLANA_RPC_URL` - Custom RPC endpoint (optional)

### Network Selection

All examples use `devnet` by default. To use mainnet:

1. Change `network: "devnet"` to `network: "mainnet-beta"`
2. Ensure wallets are funded with real SOL/USDC
3. Update RPC endpoints if using custom nodes

## Real-World Use Cases

### AI Agent Payments

```typescript
import { x402Fetch } from '@x402/solana-sdk';

// Agent automatically pays for LLM API calls
const response = await x402Fetch('https://api.ai-service.com/generate', {
  network: 'mainnet-beta',
  signer: agentWallet,
  method: 'POST',
  body: JSON.stringify({ prompt: 'Analyze this data...' })
});
```

### Metered API Access

```typescript
// Server charges based on usage
app.post('/api/analytics',
  x402Server.requirePayment({
    amount: calculateCost(req.body.complexity),
    token: 'USDC'
  }),
  handleAnalytics
);
```

### Content Micropayments

```typescript
// Pay per article, video, or download
app.get('/content/:id',
  x402Server.requirePayment({
    amount: '0.10', // 10 cents in USDC
    token: 'USDC'
  }),
  serveContent
);
```

## Troubleshooting

### "Payment verification failed"

- Ensure transaction is confirmed (wait ~400ms)
- Check recipient address matches server config
- Verify sufficient balance for payment + fees

### "No signer provided"

- Set `AGENT_PRIVATE_KEY` environment variable
- Or pass `signer` parameter to `x402Fetch()`

### "Transaction failed"

- Check Solana network status
- Ensure wallet has SOL for transaction fees
- Verify RPC endpoint is responsive

## Next Steps

1. **Production Deployment**: Use Helius/QuickNode RPC for reliability
2. **Key Management**: Use hardware wallets or KMS for production keys
3. **Monitoring**: Track payment success rates and failed transactions
4. **Facilitator**: Consider using a facilitator service for gasless transactions

## Resources

- [x402 Protocol Specification](https://github.com/coinbase/x402)
- [Solana Developer Docs](https://docs.solana.com)
- [SDK Documentation](../README.md)
- [Solana x402 Hackathon](https://solana.com/x402/hackathon)
