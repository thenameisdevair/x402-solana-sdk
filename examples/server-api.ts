/**
 * Example: x402-Enabled API Server
 * 
 * This example shows how to build an API that accepts x402 payments
 * using the server SDK middleware.
 * 
 * Run with: npx tsx examples/server-api.ts
 */

import express from "express";
import { createX402Server } from "../sdk";

const app = express();
app.use(express.json());

// Initialize x402 server
// In production, use your actual Solana address
const RECIPIENT_ADDRESS = process.env.RECIPIENT_ADDRESS || "DemoAddress1111111111111111111111111111111";

const x402Server = createX402Server({
  network: "devnet",
  recipientAddress: RECIPIENT_ADDRESS,
  enableCache: true, // Cache verified payments for 5 minutes
  cacheTTL: 300,
});

console.log("🚀 Starting x402-Enabled API Server");
console.log("💰 Recipient Address:", RECIPIENT_ADDRESS);
console.log("🌐 Network: devnet\n");

// Public endpoint (no payment required)
app.get("/api/public", (req, res) => {
  res.json({
    message: "This endpoint is free!",
    timestamp: Date.now(),
  });
});

// Premium data endpoint (requires 0.001 SOL payment)
app.get(
  "/api/premium-data",
  x402Server.requirePayment({
    amount: "0.001",
    token: "SOL",
    memo: "Premium data access",
  }),
  (req, res) => {
    console.log("✅ Payment verified for premium data request");
    console.log("   Transaction:", req.payment?.proof.signature);
    
    res.json({
      data: "This is premium content",
      insights: [
        "Real-time market data",
        "Advanced analytics",
        "Exclusive research",
      ],
      payment: {
        verified: true,
        amount: req.payment?.amount,
        token: req.payment?.token,
      },
    });
  }
);

// AI model endpoint (requires 0.5 USDC payment)
app.post(
  "/api/ai/generate",
  x402Server.requirePayment({
    amount: "0.5",
    token: "USDC",
    memo: "AI generation request",
  }),
  (req, res) => {
    const { prompt, max_tokens = 100 } = req.body;
    
    console.log("✅ Payment verified for AI generation");
    console.log("   Prompt:", prompt?.substring(0, 50) + "...");
    
    // Simulate AI generation
    const response = {
      text: `The x402 protocol enables seamless micropayments for API access. It allows AI agents and applications to pay for resources on-demand using blockchain transactions, eliminating the need for traditional subscriptions or accounts.`,
      tokens_used: max_tokens,
      cost: req.payment?.amount,
      token: req.payment?.token,
      model: "gpt-4-turbo",
    };
    
    res.json(response);
  }
);

// Transaction status endpoint
app.get("/api/payment/status/:signature", async (req, res) => {
  try {
    const status = await x402Server.getTransactionStatus(req.params.signature);
    res.json({ signature: req.params.signature, status });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get transaction status",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "healthy", timestamp: Date.now() });
});

const PORT = process.env.PORT || 3402;

app.listen(PORT, () => {
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log("\n📚 Available endpoints:");
  console.log("   GET  /api/public          - Free endpoint");
  console.log("   GET  /api/premium-data    - Requires 0.001 SOL");
  console.log("   POST /api/ai/generate     - Requires 0.5 USDC");
  console.log("   GET  /api/payment/status/:signature");
  console.log("   GET  /health\n");
});
