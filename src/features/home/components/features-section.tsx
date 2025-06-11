"use client";

import { Card, CardContent } from "@/shared/components/ui/card";
import { FadeIn } from "@/shared/components/ui/fade-in";
import { IconFileCv, IconUser, IconWorld } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function FeaturesSection() {
  const t = useTranslations("home");

  return (
    <section className="container py-12 md:py-24 z-10">
      <FadeIn>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            {t("featuresSection.title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px]">
            {t("featuresSection.description")}
          </p>
        </div>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FadeIn direction="up" delay={0.1} className="h-full">
          <motion.div
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="h-full"
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur h-full flex flex-col">
              <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <IconUser className="h-10 w-10 text-neutral-400" />
                </motion.div>
                <h3 className="text-xl font-bold">
                  {t("featuresSection.features.profile.title")}
                </h3>
                <p className="text-muted-foreground flex-grow">
                  {t("featuresSection.features.profile.description")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </FadeIn>
        <FadeIn direction="up" delay={0.2} className="h-full">
          <motion.div
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="h-full"
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur h-full flex flex-col">
              <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <IconWorld className="h-10 w-10 text-neutral-400" />
                </motion.div>
                <h3 className="text-xl font-bold">
                  {t("featuresSection.features.url.title")}
                </h3>
                <p className="text-muted-foreground flex-grow">
                  {t("featuresSection.features.url.description")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </FadeIn>
        <FadeIn direction="up" delay={0.3} className="h-full">
          <motion.div
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="h-full"
          >
            <Card className="bg-card/50 border-border/50 backdrop-blur h-full flex flex-col">
              <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <IconFileCv className="h-10 w-10 text-neutral-400" />
                </motion.div>
                <h3 className="text-xl font-bold">
                  {t("featuresSection.features.resume.title")}
                </h3>
                <p className="text-muted-foreground flex-grow">
                  {t("featuresSection.features.resume.description")}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
