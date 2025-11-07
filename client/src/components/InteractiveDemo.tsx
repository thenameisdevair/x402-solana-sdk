import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle2, Loader2 } from "lucide-react";
import paymentFlowDiagram from "@assets/generated_images/Payment_flow_diagram_illustration_0de7a5c8.png";

export function InteractiveDemo() {
  const [step, setStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { label: "Client Request", description: "Application requests protected resource" },
    { label: "402 Response", description: "Server returns payment requirements" },
    { label: "Payment Execution", description: "SDK creates and signs Solana transaction" },
    { label: "Payment Verification", description: "Server verifies on-chain payment" },
    { label: "Resource Access", description: "Client receives requested data" }
  ];

  const runDemo = () => {
    setIsRunning(true);
    setStep(0);
    
    const interval = setInterval(() => {
      setStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
  };

  return (
    <section id="demo" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col gap-4 mb-12 text-center">
          <h2 className="text-4xl font-bold">See It In Action</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how the x402 protocol seamlessly handles payments in the background. 
            Your application focuses on functionality while the SDK manages the payment flow.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="p-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Payment Flow Demo</h3>
                <Button 
                  onClick={runDemo} 
                  disabled={isRunning}
                  data-testid="button-run-demo"
                  className="gap-2"
                >
                  {isRunning ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Running
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Run Demo
                    </>
                  )}
                </Button>
              </div>

              <div className="flex flex-col gap-3">
                {steps.map((s, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 p-4 rounded-md transition-all ${
                      index <= step
                        ? "bg-primary/10 border border-primary/20"
                        : "bg-muted/30"
                    }`}
                    data-testid={`step-${index}`}
                  >
                    <div className="flex-shrink-0 mt-0.5">
                      {index < step ? (
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      ) : index === step ? (
                        <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{s.label}</span>
                        {index === step && isRunning && (
                          <Badge variant="secondary" className="text-xs">Active</Badge>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {s.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="flex flex-col gap-6">
              <h3 className="text-xl font-semibold">Visual Overview</h3>
              <img 
                src={paymentFlowDiagram} 
                alt="x402 Payment Flow Diagram" 
                className="rounded-md border w-full"
              />
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Automatic Detection</p>
                    <p className="text-sm text-muted-foreground">
                      SDK detects 402 responses and extracts payment requirements
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Blockchain Transaction</p>
                    <p className="text-sm text-muted-foreground">
                      Creates and signs Solana transaction with USDC payment
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Seamless Retry</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically retries request with payment proof in X-Payment header
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
