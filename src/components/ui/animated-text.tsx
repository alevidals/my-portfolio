"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  once = true,
}: AnimatedTextProps) {
  const [scope, setScope] = useState<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!scope) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(scope);
    return () => observer.disconnect();
  }, [scope, once]);

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      ref={setScope}
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: here we use index as key
        <motion.span key={index} className="mr-3 mt-1.5" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
