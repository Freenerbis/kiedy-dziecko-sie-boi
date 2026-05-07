'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

const containerVariants = (staggerDelay: number, delayStart: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayStart,
    },
  },
});

export const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function StaggerContainer({
  children,
  className,
  staggerDelay = 0.12,
  delayStart = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay, delayStart)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
