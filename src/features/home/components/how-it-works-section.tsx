"use client";

import { FadeIn } from "@/shared/components/ui/fade-in";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HowItWorksSection() {
  const t = useTranslations("home");

  return (
    <section className=" py-12 md:py-24 px-12 md:px-24 bg-muted/20 rounded-lg my-12 z-10">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
            {t("howItWorks.description")}
          </p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FadeIn direction="up" delay={0.1}>
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              1
            </motion.div>
            <h3 className="text-xl font-bold">
              {t("howItWorks.steps.1.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("howItWorks.steps.1.description")}
            </p>
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              2
            </motion.div>
            <h3 className="text-xl font-bold">
              {t("howItWorks.steps.2.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("howItWorks.steps.2.description")}
            </p>
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.3}>
          <div className="flex flex-col items-center text-center space-y-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              3
            </motion.div>
            <h3 className="text-xl font-bold">
              {t("howItWorks.steps.3.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("howItWorks.steps.3.description")}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
