# x402 Solana SDK

**Production-ready TypeScript SDK for implementing HTTP 402 payment flows on Solana**

Built for the [Solana x402 Hackathon](https://solana.com/x402/hackathon) - "Best x402 Dev Tool" category.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Web3.js-green.svg)](https://github.com/solana-labs/solana-web3.js)

## Features

- 🚀 **One-Line Integration** - Replace `fetch()` with `x402Fetch()` for automatic payment handling
- ⚡ **Sub-Second Finality** - Leverage Solana's ~400ms confirmation time
- 💰 **Negligible Fees** - ~$0.00025 per transaction
- 🔐 **Production Ready** - Full TypeScript support, comprehensive error handling
- 🌐 **Universal** - Works in Node.js (agents) and browsers (wallets)
- 📦 **Full Stack** - Client SDK + Server middleware in one package

## Quick Start

### Installation

```bash
npm install @x402/solana-sdk @solana/web3.js @solana/spl-token
```

### Client Usage (Autonomous Agent)

```typescript
import { x402Fetch } from '@x402/solana-sdk';
import { Keypair } from '@solana/web3.js';

const wallet = Keypair.fromSecretKey(yourSecretKey);

// One line to enable autonomous payments!
const response = await x402Fetch('https://api.example.com/premium-data', {
  network: 'devnet',
  signer: wallet
});

const data = await response.json();
console.log(data); // Your premium content
```

### Server Usage (Express API)

```typescript
import { createX402Server } from '@x402/solana-sdk';
import express from 'express';

const app = express();
const x402 = createX402Server({
  network: 'devnet',
  recipientAddress: 'YOUR_SOLANA_ADDRESS'
});

// Require payment for premium endpoints
app.get('/api/premium-data',
  x402.requirePayment({
    amount: '0.001',  // 0.001 SOL
    token: 'SOL'
  }),
  (req, res) => {
    res.json({ data: 'Premium content unlocked!' });
  }
);

app.listen(3000);
```

## How It Works

The x402 protocol brings the HTTP 402 "Payment Required" status code to life:

1. **Client requests resource** → Server responds with `402 Payment Required`
2. **SDK detects 402** → Parses payment requirements from response body
3. **Creates Solana transaction** → Signs and broadcasts USDC/SOL payment
4. **Retries with proof** → Adds `X-Payment` header with transaction signature
5. **Server verifies** → Confirms on-chain payment and grants access

All of this happens **automatically** when you use `x402Fetch()`.

## Documentation

### Core Concepts

- **Payment Requirements** - JSON specification of amount, token, and recipient
- **Payment Proof** - Transaction signature proving payment was made
- **Auto-Payment** - SDK handles the entire flow transparently

### API Reference

#### Client API

**`x402Fetch(url, options)`**

Simple wrapper for fetch with automatic payment handling.

```typescript
const response = await x402Fetch(url, {
  network: 'mainnet-beta',
  signer: keypair,
  autoPayment: true,  // default: true
  // ... standard fetch options
});
```

**`X402Client`**

Advanced client for custom payment flows.

```typescript
import { X402Client } from '@x402/solana-sdk';

const client = new X402Client({
  network: 'devnet',
  signer: wallet,
  commitment: 'confirmed'
});

const response = await client.fetch(url, options);
```

#### Server API

**`createX402Server(config)`**

Create a server instance for payment verification.

```typescript
const server = createX402Server({
  network: 'mainnet-beta',
  recipientAddress: 'YOUR_ADDRESS',
  enableCache: true,  // Cache verified payments
  cacheTTL: 300       // 5 minutes
});
```

**`requirePayment(options)`**

Express middleware for protecting endpoints.

```typescript
app.get('/protected',
  server.requirePayment({
    amount: '0.5',   // USDC amount
    token: 'USDC',
    memo: 'API access fee'
  }),
  handler
);
```

### Supported Networks

- `mainnet-beta` - Solana mainnet
- `devnet` - Solana devnet (testing)
- `testnet` - Solana testnet

### Supported Tokens

- `SOL` - Native Solana token
- `USDC` - USD Coin stablecoin
- `USDT` - Tether stablecoin

## Examples

See the [`examples/`](./examples) directory for complete working examples:

- **[client-agent.ts](./examples/client-agent.ts)** - Autonomous AI agent making payments
- **[server-api.ts](./examples/server-api.ts)** - Express API accepting payments
- **[README.md](./examples/README.md)** - Detailed example documentation

## Use Cases

### AI Agent Commerce

Enable AI agents to autonomously pay for API access:

```typescript
// Agent pays for LLM inference
const aiResponse = await x402Fetch('https://llm.api/generate', {
  signer: agentWallet,
  network: 'mainnet-beta'
});
```

### Metered API Access

Charge per request instead of monthly subscriptions:

```typescript
app.post('/api/analytics',
  requirePayment({ amount: '0.10', token: 'USDC' }),
  processAnalytics
);
```

### Content Micropayments

Sell articles, videos, or downloads for pennies:

```typescript
app.get('/article/:id',
  requirePayment({ amount: '0.05', token: 'USDC' }),
  serveArticle
);
```

## Architecture

```
┌─────────────────┐
│   Client App    │
│   (AI Agent)    │
└────────┬────────┘
         │ x402Fetch()
         ▼
┌─────────────────┐       ┌──────────────┐
│  x402 SDK       │◄─────►│   Solana     │
│  Client Module  │       │  Blockchain  │
└────────┬────────┘       └──────────────┘
         │ HTTP Request + X-Payment
         ▼
┌─────────────────┐
│   API Server    │
│   + Middleware  │
└─────────────────┘
```

## TypeScript Support

Full TypeScript definitions included:

```typescript
import type {
  PaymentRequirements,
  PaymentProof,
  Network,
  TokenType,
  X402ClientConfig,
  X402ServerConfig
} from '@x402/solana-sdk';
```

## Browser Support

Works with browser wallet adapters (Phantom, Solflare, etc.):

```typescript
import { X402Client } from '@x402/solana-sdk';

const client = new X402Client({
  network: 'mainnet-beta',
  signer: {
    publicKey: wallet.publicKey,
    signTransaction: (tx) => wallet.signTransaction(tx)
  }
});
```

## Error Handling

```typescript
import { PaymentRequiredError, TransactionFailedError } from '@x402/solana-sdk';

try {
  const response = await x402Fetch(url, config);
} catch (error) {
  if (error instanceof PaymentRequiredError) {
    console.log('Payment needed:', error.paymentRequirements);
  } else if (error instanceof TransactionFailedError) {
    console.log('Transaction failed:', error.message);
  }
}
```

## Testing

Run the test suite:

```bash
npm test
```

Run examples locally:

```bash
# Terminal 1: Start server
npx tsx examples/server-api.ts

# Terminal 2: Run client
npx tsx examples/client-agent.ts
```

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [x] Core client SDK with auto-payment
- [x] Server middleware for Express
- [x] SOL and USDC support
- [x] Payment verification and caching
- [ ] Facilitator API integration
- [ ] JWT session tokens
- [ ] Usage-based billing (upto scheme)
- [ ] Python SDK
- [ ] Rust SDK
- [ ] React hooks library

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Hackathon Submission

This SDK is submitted for the **Solana x402 Hackathon** in the "Best x402 Dev Tool" category.

**Why this SDK wins:**

1. **Functionality (30%)** - Production-ready, comprehensive features, clean code
2. **Developer Experience (25%)** - One-line integration, great docs, TypeScript support
3. **Potential Impact (20%)** - Accelerates x402 adoption across entire Solana ecosystem
4. **Innovation (15%)** - Simplest x402 implementation available, universal compatibility
5. **Open-Source (10%)** - MIT licensed, extensible architecture

## Resources

- [x402 Protocol Specification](https://github.com/coinbase/x402)
- [Solana Documentation](https://docs.solana.com)
- [Solana x402 Hackathon](https://solana.com/x402/hackathon)
- [SDK Documentation Website](https://x402-solana-sdk.com)

## Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/x402-solana-sdk/issues)
- **Discord**: [Join our community](https://discord.gg/x402)
- **Email**: support@x402-sdk.com

---

Built with ❤️ for the Solana x402 Hackathon

**⭐ Star this repo if you find it useful!**
