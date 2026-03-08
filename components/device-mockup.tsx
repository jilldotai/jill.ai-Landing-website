'use client';

import Image from 'next/image';
import { m, useReducedMotion } from 'motion/react';

const messages = [
  {
    from: 'Unknown adult',
    text: 'Keep this between us. Send your address and I will get you a gift.',
    blocked: true,
  },
  {
    from: 'Guardian keyboard',
    text: 'Blocked before send. Private details and coercive language detected.',
    blocked: false,
  },
  {
    from: 'Parent signal',
    text: 'A risk pattern was intercepted locally. Review guidance, not chat logs.',
    blocked: false,
  },
];

export function DeviceMockup() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative">
      <m.div
        className="pointer-events-none absolute -left-10 top-12 h-28 w-28 rounded-full aurora-orb opacity-70"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        className="pointer-events-none absolute -right-6 bottom-12 h-36 w-36 rounded-full aurora-orb opacity-60"
        animate={reduceMotion ? undefined : { scale: [1.04, 0.94, 1.04], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="iridescent-border surface-panel relative mx-auto w-full max-w-[520px] rounded-[2.2rem] bg-[linear-gradient(180deg,rgba(10,10,12,0.96),rgba(19,19,24,0.92))] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(217,229,255,0.16),transparent_32%),linear-gradient(180deg,#121217_0%,#090909_100%)] p-4">
          <div className="mb-4 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-3">
              <Image src="/assets/icons/logo-iridescent.svg" alt="Jill.ai logo" width={30} height={30} className="h-7 w-7" />
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.3em] text-paper/45">IOkT Key</p>
                <p className="text-sm text-paper">Guardian keyboard active</p>
              </div>
            </div>
            <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-[0.58rem] uppercase tracking-[0.26em] text-emerald-200">
              Local only
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0b0b0f] p-4">
            <Image
              src="/assets/icons/data-orbit.svg"
              alt=""
              width={420}
              height={420}
              className="pointer-events-none absolute inset-x-0 top-0 mx-auto w-[78%] opacity-16"
            />

            <div className="relative z-10 grid gap-3">
              {messages.map((message, index) => (
                <m.div
                  key={message.text}
                  initial={{ opacity: 0, x: index === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.7 }}
                  transition={{ delay: index * 0.14, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`max-w-[88%] rounded-[1.35rem] border px-4 py-3 ${
                    index === 0
                      ? 'ml-auto border-rose-300/18 bg-rose-300/8'
                      : 'border-white/10 bg-white/[0.04]'
                  }`}
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-paper/45">{message.from}</p>
                  <p className="mt-2 text-sm leading-6 text-paper/82">{message.text}</p>
                  {message.blocked && (
                    <div className="mt-3 inline-flex rounded-full border border-rose-300/20 bg-rose-300/10 px-3 py-1 text-[0.56rem] uppercase tracking-[0.26em] text-rose-200">
                      Send prevented
                    </div>
                  )}
                </m.div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-paper/45">Handshake state</p>
              <p className="mt-3 text-xl iridescent-text">Verified parent → active child credential → protected input</p>
            </div>
            <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[0.58rem] uppercase tracking-[0.28em] text-paper/45">Why this matters</p>
              <p className="mt-3 text-sm leading-7 text-paper/74">The alert is about risk and intervention quality, not full surveillance transcripts.</p>
            </div>
          </div>

          <div className="mt-4 rounded-[1.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(217,229,255,0.1),rgba(246,168,216,0.08),rgba(241,181,143,0.08))] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-paper/45">Impact clips</p>
                <p className="mt-2 text-sm leading-7 text-paper/74">When your short clips are ready, this device scene can become the visual anchor beside them.</p>
              </div>
              <div className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-[0.56rem] uppercase tracking-[0.24em] text-paper/58">
                Video-ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
