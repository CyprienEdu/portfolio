"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 40, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
