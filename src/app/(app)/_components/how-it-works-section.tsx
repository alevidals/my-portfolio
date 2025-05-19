"use client";

import { FadeIn } from "@/components/ui/fade-in";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  return (
    <section className=" py-12 md:py-24 px-12 md:px-24 bg-muted/20 rounded-lg my-12 z-10">
      <FadeIn>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
            In three simple steps, your portfolio and resume will be ready to
            share.
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
            <h3 className="text-xl font-bold">Sign up</h3>
            <p className="text-muted-foreground">
              Create your account on MyPortfolio in less than a minute.
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
            <h3 className="text-xl font-bold">Complete your profile</h3>
            <p className="text-muted-foreground">
              Add your professional information, experience, projects, and
              skills.
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
            <h3 className="text-xl font-bold">Share</h3>
            <p className="text-muted-foreground">
              Get your unique URL and generate your resume to share with anyone
              you want.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
