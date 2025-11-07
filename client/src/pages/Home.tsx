import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { QuickStart } from "@/components/QuickStart";
import { Features } from "@/components/Features";
import { ServerExample } from "@/components/ServerExample";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <QuickStart />
        <Features />
        <ServerExample />
        <InteractiveDemo />
      </main>
      <Footer />
    </div>
  );
}
