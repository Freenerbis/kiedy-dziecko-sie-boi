'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback } from 'react';

export default function Book3D() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 120, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const onMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const BOOK_W = 160;
  const BOOK_H = 220;
  const SPINE_W = 28;

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ width: BOOK_W + SPINE_W, height: BOOK_H, perspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating shadow */}
      <motion.div
        className="absolute bottom-[-18px] left-[10%] w-[80%] h-4 rounded-full blur-xl bg-black/30 pointer-events-none"
        animate={{ scaleX: [1, 0.92, 1], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{
          rotateY,
          rotateX,
          transformStyle: 'preserve-3d',
          width: BOOK_W + SPINE_W,
          height: BOOK_H,
        }}
        animate={{ rotateY: [4, -4, 4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Front cover */}
        <div
          className="absolute top-0 left-0 rounded-r-lg overflow-hidden"
          style={{
            width: BOOK_W,
            height: BOOK_H,
            left: SPINE_W,
            transformOrigin: 'left center',
            background: 'linear-gradient(135deg, #1a3a2a 0%, #0f2318 60%, #1a3a2a 100%)',
            boxShadow: '4px 0 20px rgba(0,0,0,0.4), inset -2px 0 8px rgba(0,0,0,0.2)',
            transform: 'translateZ(6px)',
          }}
        >
          {/* Cover content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            {/* Top label */}
            <div>
              <div className="inline-block bg-coral/20 border border-coral/30 rounded-full px-2 py-0.5 mb-3">
                <span className="text-coral text-[9px] font-bold tracking-widest uppercase">Pierwsza Pomoc</span>
              </div>
              <h3 className="font-display text-white font-black italic leading-tight text-[13px]">
                Co robić,<br />
                zanim<br />
                dostaniesz się<br />
                do psychologa?
              </h3>
            </div>

            {/* Bottom */}
            <div>
              <div className="w-8 h-0.5 bg-coral/60 mb-2 rounded-full" />
              <p className="text-sage/70 text-[8px] leading-snug">
                Pierwsza pomoc<br />emocjonalna dla mamy
              </p>
            </div>
          </div>

          {/* Glare effect */}
          <div
            className="absolute inset-0 pointer-events-none rounded-r-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 50%)',
            }}
          />

          {/* Right edge shadow */}
          <div
            className="absolute top-0 right-0 w-3 h-full pointer-events-none"
            style={{ background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.15))' }}
          />
        </div>

        {/* Spine */}
        <div
          className="absolute top-0 left-0 rounded-l-sm"
          style={{
            width: SPINE_W,
            height: BOOK_H,
            background: 'linear-gradient(to right, #0d1e15, #1a3a2a)',
            transform: `rotateY(-90deg) translateX(-${SPINE_W / 2}px)`,
            transformOrigin: 'right center',
            boxShadow: 'inset -4px 0 8px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            className="text-sage/50 font-bold tracking-[0.2em] uppercase"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              fontSize: 8,
              transform: 'rotate(180deg)',
            }}
          >
            Pierwsza Pomoc Emocjonalna
          </span>
        </div>

        {/* Back cover */}
        <div
          className="absolute top-0 left-0 rounded-l-sm"
          style={{
            width: BOOK_W,
            left: SPINE_W,
            height: BOOK_H,
            background: '#0f2318',
            transform: 'translateZ(-6px)',
          }}
        />
      </motion.div>

      {/* Stars badge */}
      <motion.div
        className="absolute -top-3 -right-4 bg-white rounded-xl px-2.5 py-1.5 shadow-lg shadow-forest/20 flex items-center gap-1"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 300 }}
      >
        <span className="text-amber-400 text-xs">★★★★★</span>
        <span className="text-forest font-bold text-[10px]">4.9</span>
      </motion.div>

      {/* Pages count badge */}
      <motion.div
        className="absolute -bottom-2 -right-6 bg-coral text-white rounded-xl px-2.5 py-1.5 shadow-lg shadow-coral/30"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, type: 'spring', stiffness: 300 }}
      >
        <span className="text-[10px] font-bold">75 stron</span>
      </motion.div>
    </motion.div>
  );
}
