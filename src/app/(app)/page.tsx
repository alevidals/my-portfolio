import { CtaSection } from "@/app/(app)/_components/cta-section";
import { FeaturesSection } from "@/app/(app)/_components/features-section";
import { HeroSection } from "@/app/(app)/_components/hero-section";
import { HowItWorksSection } from "@/app/(app)/_components/how-it-works-section";
import { AnimatedGradient } from "@/components/ui/animated-gradient";
import { getSession } from "@/lib/auth";

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
