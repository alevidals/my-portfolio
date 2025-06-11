"use client";

import { SignInButton } from "@/shared/components/sign-in-button";
import { Button } from "@/shared/components/ui/button";
import { FadeIn } from "@/shared/components/ui/fade-in";
import { IconArrowRight } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  isAuthenticated: boolean;
};

export function CtaSection({ isAuthenticated }: Props) {
  const t = useTranslations("home");

  return (
    <FadeIn>
      <section className="container py-12 md:py-24 z-10">
        <motion.div
          className="bg-card border rounded-lg p-8 md:p-12 text-center"
          whileInView={{
            boxShadow: [
              "0px 0px 0px rgba(255,255,255,0)",
              "0px 0px 20px rgba(255,255,255,0.1)",
              "0px 0px 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
          viewport={{ once: false, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px] mx-auto mb-8">
            {t("cta.description")}
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {isAuthenticated ? (
              <Button size="lg" variant="secondary" className="mx-auto" asChild>
                <Link href="/dashboard">
                  {t("cta.button")} <IconArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <SignInButton>
                {t("cta.button")} <IconArrowRight className="ml-2 h-4 w-4" />
              </SignInButton>
            )}
          </motion.div>
        </motion.div>
      </section>
    </FadeIn>
  );
}
