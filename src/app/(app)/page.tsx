import { CtaSection } from "@/app/(app)/_components/cta-section";
import { FeaturesSection } from "@/app/(app)/_components/features-section";
import { HeroSection } from "@/app/(app)/_components/hero-section";
import { HowItWorksSection } from "@/app/(app)/_components/how-it-works-section";
import { AnimatedGradient } from "@/components/ui/animated-gradient";

export default function Home() {
  return (
    <>
      <AnimatedGradient />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
    </>
  );
}
