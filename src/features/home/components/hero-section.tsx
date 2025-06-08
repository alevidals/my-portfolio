"use client";

import { SignInButton } from "@/shared/components/sign-in-button";
import { AnimatedText } from "@/shared/components/ui/animated-text";
import { Button } from "@/shared/components/ui/button";
import { FadeIn } from "@/shared/components/ui/fade-in";
import { FloatingElement } from "@/shared/components/ui/floating-element";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Props = {
  isAuthenticated: boolean;
};

export function HeroSection({ isAuthenticated }: Props) {
  return (
    <section className="container flex flex-col-reverse md:flex-row items-center justify-between py-12 md:py-24 z-10">
      <div className="space-y-6 md:w-3/5">
        <AnimatedText
          text="Your professional profile, simplified"
          className="text-4xl md:text-6xl font-bold tracking-tighter"
        />
        <FadeIn delay={0.5} direction="up">
          <p className="text-xl text-muted-foreground max-w-[600px]">
            Create your portfolio and resume in one place. Share your profile
            with a unique link and stand out in selection processes.
          </p>
        </FadeIn>
        <FadeIn delay={0.7} direction="up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isAuthenticated ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/dashboard">
                    Get started now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <SignInButton>
                  Get started now <IconArrowRight className="ml-2 h-4 w-4" />
                </SignInButton>
              )}
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" asChild>
                <Link href="/portfolio/alevidals" target="_blank">
                  See portfolio example
                </Link>
              </Button>
            </motion.div>
          </div>
        </FadeIn>
      </div>
      <div className="md:w-2/5 mb-8 md:mb-0 flex justify-center">
        <FloatingElement
          duration={6}
          delay={1}
          className="w-full max-w-[500px]"
        >
          <motion.img
            src="/programmer.svg"
            alt="Programmer illustration"
            className="w-full max-w-[700px] h-auto"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          />
        </FloatingElement>
      </div>
    </section>
  );
}
