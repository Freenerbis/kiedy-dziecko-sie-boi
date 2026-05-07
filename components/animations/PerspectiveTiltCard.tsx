'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  glareOpacity?: number;
}

export default function PerspectiveTiltCard({
  children,
  className = '',
  maxTilt = 8,
  scaleOnHover = 1.02,
  glareOpacity = 0.06,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [maxTilt, -maxTilt]),
    { stiffness: 200, damping: 22 }
  );
  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-maxTilt, maxTilt]),
    { stiffness: 200, damping: 22 }
  );

  const glareLeft = useTransform(rawX, [-0.5, 0.5], ['-50%', '50%']);
  const glareTop = useTransform(rawY, [-0.5, 0.5], ['-50%', '50%']);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: 'preserve-3d' as const,
      }}
      animate={{ scale: hovered ? scaleOnHover : 1 }}
      transition={{ duration: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
        animate={{ opacity: hovered ? glareOpacity : 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%)',
            left: glareLeft,
            top: glareTop,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
