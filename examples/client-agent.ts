/**
 * Example: AI Agent Client
 * 
 * This example shows how an autonomous AI agent can use the x402 SDK
 * to automatically pay for API access using Solana USDC micropayments.
 * 
 * Run with: npx tsx examples/client-agent.ts
 */

import { x402Fetch } from "../sdk";
import { Keypair } from "@solana/web3.js";

// In production, load from secure environment variables
const AGENT_PRIVATE_KEY = process.env.AGENT_PRIVATE_KEY;

async function main() {
  console.log("🤖 Starting AI Agent with x402 Payment Capability\n");

  // Initialize agent wallet
  let agentKeypair: Keypair;
  
  if (AGENT_PRIVATE_KEY) {
    // Load from environment
    const secretKey = Uint8Array.from(JSON.parse(AGENT_PRIVATE_KEY));
    agentKeypair = Keypair.fromSecretKey(secretKey);
  } else {
    // Generate new keypair for demo
    agentKeypair = Keypair.generate();
    console.log("⚠️  No AGENT_PRIVATE_KEY found, using demo keypair");
    console.log("📝 Public Key:", agentKeypair.publicKey.toBase58());
    console.log("💰 Please fund this address with SOL/USDC on devnet\n");
  }

  // Example 1: Simple x402 fetch with automatic payment
  console.log("📡 Example 1: Fetching premium data with automatic payment");
  
  try {
    const response = await x402Fetch("http://localhost:5000/api/premium-data", {
      network: "devnet",
      signer: agentKeypair,
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      console.log("✅ Success! Received data:", data);
    } else {
      console.log("❌ Request failed:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
  }

  console.log("\n" + "=".repeat(60) + "\n");

  // Example 2: LLM API call with usage-based pricing
  console.log("📡 Example 2: Calling AI model API with micropayment");
  
  try {
    const response = await x402Fetch("http://localhost:5000/api/ai/generate", {
      network: "devnet",
      signer: agentKeypair,
      method: "POST",
      body: JSON.stringify({
        prompt: "Explain x402 protocol in simple terms",
        max_tokens: 100,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const result = await response.json();
      console.log("✅ AI Response:", result.text);
      console.log("💰 Cost:", result.cost, result.token);
    } else {
      console.log("❌ Request failed:", response.status);
    }
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
  }

  console.log("\n✨ Agent completed all tasks!");
}

// Run the agent
main().catch(console.error);
