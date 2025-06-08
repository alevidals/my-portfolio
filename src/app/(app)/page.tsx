import { CtaSection } from "@/features/home/components/cta-section";
import { FeaturesSection } from "@/features/home/components/features-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { HowItWorksSection } from "@/features/home/components/how-it-works-section";
import { AnimatedGradient } from "@/shared/components/ui/animated-gradient";
import { getSession } from "@/shared/lib/auth";

export default async function Home() {
  const session = await getSession();

  const isAuthenticated = Boolean(session);

  return (
    <>
      <AnimatedGradient />
      <HeroSection isAuthenticated={isAuthenticated} />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection isAuthenticated={isAuthenticated} />
    </>
  );
}
