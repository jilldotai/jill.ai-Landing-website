'use client';

import { ReactNode, useRef } from 'react';
import { LazyMotion, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'motion/react';

type MotionRootProps = {
  children: ReactNode;
};

type RevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  offset?: number;
};

export function MotionRoot({ children }: MotionRootProps) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

export function Reveal({ children, className, delay = 0, distance = 32 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: distance, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}

export function Parallax({ children, className, offset = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [offset, -offset]);

  return (
    <m.div ref={ref} className={className} style={{ y }}>
      {children}
    </m.div>
  );
}

export function Float({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </m.div>
  );
}
