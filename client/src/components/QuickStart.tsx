import { CodeBlock } from "./CodeBlock";
import { Badge } from "@/components/ui/badge";

const installCode = `npm install @x402/solana-sdk @solana/web3.js @solana/spl-token`;

const configCode = `import { X402Client } from '@x402/solana-sdk';
import { Keypair } from '@solana/web3.js';

// Load your wallet
const wallet = Keypair.fromSecretKey(yourSecretKey);

// Create client instance
const client = new X402Client({
  network: 'mainnet-beta',
  signer: wallet,
  commitment: 'confirmed'
});`;

const executeCode = `// Automatic HTTP 402 handling
const response = await client.fetch('https://api.example.com/premium', {
  method: 'GET',
  autoPayment: true // default
});

const data = await response.json();

// Or use the one-liner
import { x402Fetch } from '@x402/solana-sdk';
const result = await x402Fetch(url, { network: 'devnet', signer: wallet });`;

export function QuickStart() {
  return (
    <section id="quickstart" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-4xl font-bold">Quick Start</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get up and running in three simple steps. Integrate x402 payments into 
            your application or AI agent in minutes.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="rounded-full h-8 w-8 flex items-center justify-center font-bold">
                1
              </Badge>
              <h3 className="text-xl font-semibold">Install the SDK</h3>
            </div>
            <CodeBlock code={installCode} language="bash" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="rounded-full h-8 w-8 flex items-center justify-center font-bold">
                2
              </Badge>
              <h3 className="text-xl font-semibold">Configure Your Client</h3>
            </div>
            <CodeBlock code={configCode} language="typescript" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Badge className="rounded-full h-8 w-8 flex items-center justify-center font-bold">
                3
              </Badge>
              <h3 className="text-xl font-semibold">Make Payment-Enabled Requests</h3>
            </div>
            <CodeBlock code={executeCode} language="typescript" />
          </div>
        </div>
      </div>
    </section>
  );
}
