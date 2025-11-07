import { Card } from "@/components/ui/card";
import { Zap, Shield, Code, Wallet, Globe, Boxes } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "One-Line Integration",
    description: "Replace fetch() with x402Fetch() and automatically handle all payment flows. No complex setup required."
  },
  {
    icon: Shield,
    title: "Production Ready",
    description: "Built with TypeScript, comprehensive error handling, and full test coverage for production deployments."
  },
  {
    icon: Code,
    title: "Developer First",
    description: "Intuitive API design, complete TypeScript definitions, and extensive documentation for rapid development."
  },
  {
    icon: Wallet,
    title: "Wallet Flexibility",
    description: "Support for Node.js keypairs and browser wallets (Phantom, Solflare). Perfect for agents and web apps."
  },
  {
    icon: Globe,
    title: "Network Support",
    description: "Seamlessly switch between Devnet, Testnet, and Mainnet. Test thoroughly before going live."
  },
  {
    icon: Boxes,
    title: "Full Stack",
    description: "Client SDK for making payments and server middleware for accepting them. Complete x402 solution."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-12 text-center">
          <h2 className="text-4xl font-bold">Built for Developers</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to implement x402 payment flows on Solana, 
            optimized for autonomous agents and modern applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 flex flex-col gap-4 hover-elevate transition-all"
                data-testid={`card-feature-${index}`}
              >
                <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
