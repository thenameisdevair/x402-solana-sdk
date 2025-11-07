import { Button } from "@/components/ui/button";
import { Moon, Sun, Github } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import logoIcon from "@assets/nft1_1762553480515.png";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3">
          <img src={logoIcon} alt="x402 SDK" className="h-10 w-10 rounded-full border-2 border-primary/20" />
          <div className="flex flex-col">
            <span className="font-semibold text-base">x402 Solana SDK</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#quickstart"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-quickstart"
          >
            Quick Start
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-features"
          >
            Features
          </a>
          <a
            href="#demo"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-demo"
          >
            Live Demo
          </a>
          <a
            href="https://github.com/yourusername/x402-solana-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-github"
          >
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          <Button variant="outline" size="sm" asChild data-testid="button-github">
            <a
              href="https://github.com/yourusername/x402-solana-sdk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </Button>
          <Button size="sm" asChild data-testid="button-get-started">
            <a href="#quickstart">Get Started</a>
          </Button>
        </div>
      </div>
    </header>
  );
}
