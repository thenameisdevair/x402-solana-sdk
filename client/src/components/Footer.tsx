import { Github, Twitter, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">x402 Solana SDK</h3>
            <p className="text-sm text-muted-foreground">
              Production-ready TypeScript SDK for autonomous agent payments on Solana.
            </p>
            <Badge variant="outline" className="w-fit">MIT License</Badge>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Documentation</h4>
            <a href="#quickstart" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Quick Start
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              API Reference
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Examples
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Migration Guide
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Resources</h4>
            <a href="https://solana.com/x402/hackathon" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Solana x402 Hackathon
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Protocol Specification
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Community
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contributing
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm">Built With</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-xs">Solana</Badge>
              <Badge variant="secondary" className="text-xs">TypeScript</Badge>
              <Badge variant="secondary" className="text-xs">x402</Badge>
              <Badge variant="secondary" className="text-xs">USDC</Badge>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 x402 Solana SDK. Built for the Solana x402 Hackathon.
          </p>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-footer-docs"
            >
              <FileText className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
