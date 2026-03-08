'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';

const steps = [
  {
    id: 'verify',
    label: '01',
    eyebrow: 'Parent verify',
    title: 'The adult becomes the source of trust.',
    body: 'A parent completes verification once, then issues the authority needed to unlock the child context without exposing the child’s raw identity.',
    status: 'ParentVC minted',
  },
  {
    id: 'credential',
    label: '02',
    eyebrow: 'Child credential',
    title: 'The device proves eligibility, not biography.',
    body: 'The phone answers the gate with a proof of authorization. No birthdate, name, or face has to move through a central dashboard.',
    status: 'ZK proof accepted',
  },
  {
    id: 'guardian',
    label: '03',
    eyebrow: 'Edge guardian',
    title: 'The keyboard only wakes when trust is live.',
    body: 'Once the gate is satisfied, local AI can block grooming, bullying, and PII leakage before anything harmful is sent upstream.',
    status: 'Protection active',
  },
];

export function HandshakeShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length);
    }, 2800);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <div className="surface-panel overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,250,241,0.08),rgba(255,255,255,0.02))] p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.34em] text-gold/80">Visible handshake</p>
          <p className="mt-3 text-lg text-paper/75">Mechanical trust, not hidden surveillance.</p>
        </div>
        <div className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-[0.64rem] uppercase tracking-[0.32em] text-emerald-200">
          Zero-data path
        </div>
      </div>

      <div className="relative mt-8 rounded-[1.8rem] border border-white/10 bg-[#0f0f0d] p-5 md:p-6">
        <div className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 bg-[linear-gradient(90deg,rgba(255,255,255,0.05),rgba(213,177,112,0.55),rgba(255,255,255,0.05))] md:block" />

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => {
            const isActive = activeStep === index;

            return (
              <m.button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(index)}
                animate={{
                  borderColor: isActive ? 'rgba(213, 177, 112, 0.55)' : 'rgba(255,255,255,0.08)',
                  backgroundColor: isActive ? 'rgba(255,248,232,0.08)' : 'rgba(255,255,255,0.02)',
                  y: isActive ? -4 : 0,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[1.4rem] border p-4 text-left"
              >
                <m.div
                  animate={{ scale: isActive ? 1.08 : 1, opacity: isActive ? 1 : 0.45 }}
                  className="mb-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/40 text-sm font-semibold tracking-[0.2em] text-paper"
                >
                  {step.label}
                </m.div>
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-paper/45">{step.eyebrow}</p>
                <p className="mt-4 text-xl leading-8 text-paper">{step.title}</p>

                <AnimatePresence mode="wait">
                  <m.div
                    key={step.id === steps[activeStep].id ? `${step.id}-active` : `${step.id}-idle`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6"
                  >
                    <p className="text-sm leading-7 text-paper/62">{isActive ? step.body : step.status}</p>
                  </m.div>
                </AnimatePresence>

                <m.div
                  animate={{ opacity: isActive ? 1 : 0.24, scale: isActive ? 1 : 0.92 }}
                  className="pointer-events-none absolute right-4 top-4 h-3 w-3 rounded-full bg-gold shadow-[0_0_20px_rgba(213,177,112,0.75)]"
                />
              </m.button>
            );
          })}
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/30 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-paper/45">Current state</p>
              <p className="mt-3 text-2xl text-paper">{steps[activeStep].status}</p>
            </div>
            <div className="text-right">
              <p className="text-[0.62rem] uppercase tracking-[0.3em] text-paper/45">Result</p>
              <p className="mt-3 text-sm leading-7 text-paper/68">The gate opens only when verification, proof, and local protection align.</p>
            </div>
          </div>

          <div className="mt-6 h-1.5 rounded-full bg-white/8">
            <m.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#d5b170,#f6f2e8)]"
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
