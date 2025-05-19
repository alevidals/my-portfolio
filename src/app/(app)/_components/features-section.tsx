"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";
import { IconFileCv, IconUser, IconWorld } from "@tabler/icons-react";
import { motion } from "framer-motion";

export function FeaturesSection() {
  return (
    <section className="container py-12 md:py-24 z-10">
      <FadeIn>
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Everything you need to stand out
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px]">
            MyPortfolio provides all the tools to create a complete and
            attractive professional profile.
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
                <h3 className="text-xl font-bold">Personalized profile</h3>
                <p className="text-muted-foreground flex-grow">
                  Create a complete profile with your professional data,
                  experience, skills, and projects.
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
                <h3 className="text-xl font-bold">Unique URL</h3>
                <p className="text-muted-foreground flex-grow">
                  Get a personalized web address to share your profile with
                  anyone you want.
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
                <h3 className="text-xl font-bold">Resume generator</h3>
                <p className="text-muted-foreground flex-grow">
                  Create professional resumes from your profile data using
                  different templates.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
