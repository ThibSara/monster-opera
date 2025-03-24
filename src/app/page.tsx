import StepSequencer from "@/components/StepSequencer";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <HeroSection />
      <StepSequencer />
      <Footer />
    </div>
  );
}
