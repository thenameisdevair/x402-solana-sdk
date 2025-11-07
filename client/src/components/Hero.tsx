import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

const exampleCode = `import { x402Fetch } from '@x402/solana-sdk';
import { Keypair } from '@solana/web3.js';

// Initialize your wallet
const wallet = Keypair.fromSecretKey(yourSecretKey);

// One line to enable autonomous payments!
const response = await x402Fetch('https://api.example.com/data', {
  network: 'mainnet-beta',
  signer: wallet
});

const data = await response.json();
console.log(data); // Your premium content`;

export function Hero() {
  return (
    <section className="container mx-auto px-6 py-24 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit">
            <Terminal className="h-3 w-3" />
            <span>Solana x402 Hackathon</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
            Autonomous Payments
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            The first TypeScript SDK for building HTTP 402 payment flows on Solana. 
            Enable AI agents and applications to pay for APIs with sub-second finality 
            and negligible fees.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="gap-2" data-testid="button-hero-start">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" data-testid="button-hero-github">
              View on GitHub
            </Button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex flex-col">
              <span className="text-2xl font-bold">~400ms</span>
              <span className="text-sm text-muted-foreground">Finality</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">$0.00025</span>
              <span className="text-sm text-muted-foreground">Per Transaction</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">USDC</span>
              <span className="text-sm text-muted-foreground">Native Support</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg blur-2xl opacity-30" />
          <div className="relative">
            <CodeBlock code={exampleCode} language="typescript" />
          </div>
        </div>
      </div>
    </section>
  );
}
