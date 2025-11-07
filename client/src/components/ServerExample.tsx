import { Card } from "@/components/ui/card";
import { CodeBlock } from "./CodeBlock";
import { Badge } from "@/components/ui/badge";
import { Server, Shield, Zap } from "lucide-react";

const serverCode = `import { createX402Server } from '@x402/solana-sdk';
import express from 'express';

const app = express();
const x402 = createX402Server({
  network: 'mainnet-beta',
  recipientAddress: 'YOUR_SOLANA_ADDRESS',
  enableCache: true
});

// Protect premium endpoints
app.get('/api/premium-data',
  x402.requirePayment({
    amount: '0.001',  // SOL amount
    token: 'SOL'
  }),
  (req, res) => {
    // Payment verified automatically!
    res.json({ 
      data: 'Premium content',
      payment: req.payment 
    });
  }
);

app.listen(3000);`;

export function ServerExample() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
              <Server className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-4xl font-bold">Server-Side Integration</h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Accept x402 payments on your API with Express middleware. 
            Automatic payment verification, caching, and request enrichment.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <CodeBlock code={serverCode} language="typescript" showLineNumbers />

          <div className="flex flex-col gap-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Automatic Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    The middleware verifies payment transactions on-chain before 
                    granting access. No manual blockchain queries needed.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">Performance Caching</h3>
                  <p className="text-sm text-muted-foreground">
                    Verified payments are cached to reduce RPC calls and improve 
                    response times for repeated requests.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex flex-wrap gap-2">
              <Badge>Express Middleware</Badge>
              <Badge>Payment Verification</Badge>
              <Badge>Caching Built-in</Badge>
              <Badge>Request Enrichment</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
