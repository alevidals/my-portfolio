"use client";

import type React from "react";

import { motion } from "framer-motion";

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FloatingElement({
  children,
  delay = 0,
  duration = 4,
  className = "",
}: FloatingElementProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [0, -10, 0],
        transition: {
          duration,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          delay,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
