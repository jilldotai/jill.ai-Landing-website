'use client';

import Image from 'next/image';
import { m } from 'motion/react';
import { Reveal } from '@/components/site-motion';

export function FounderStory() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
      <Reveal>
        <div className="surface-panel rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(217,229,255,0.08),rgba(255,255,255,0.02))] p-6 md:p-8">
          <div className="relative mx-auto max-w-[340px] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(213,197,255,0.18),transparent_32%),#101014]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(246,168,216,0.18),transparent_24%)]" />
            <Image
              src="/assets/images/founder-no-bg.png.png"
              alt="Estelle Coetzee"
              width={800}
              height={1000}
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>
        </div>
      </Reveal>

      <div className="grid gap-4">
        <Reveal className="surface-panel rounded-[2rem] border border-white/10 bg-black/20 p-8 md:p-10">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-gold/80">Founder-led story</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.05em] text-paper md:text-6xl">
            Built by a mother, architected by a developer.
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-8 text-paper/72">
            Estelle Coetzee is not building Jill.ai as an abstract safety brand. She is building from direct experience with the gaps families actually face, with the conviction that children should not have to choose between exposure and surveillance.
          </p>
          <div className="mt-8 rounded-[1.4rem] border-l-2 border-[rgba(213,197,255,0.6)] bg-white/[0.03] px-5 py-5 text-paper/84">
            <p className="text-lg leading-8 italic">
              "I am Estelle Coetzee, a South African founder and User Zero. When I could not find a safety tool that protected my neurodiverse daughter without invading her privacy, I taught myself to code and started building one."
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-paper/72">
            The point is not to watch children harder. The point is to engineer a system where the harmful path is mechanically harder to take, while trust, dignity, and intervention quality remain intact.
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            'Safety-critical thinking shaped by real operational environments and radical honesty.',
            'A founder story rooted in lived digital-parenting risk, not trend-chasing.',
            'A product thesis built on dignity, privacy, and intervention without data exploitation.',
          ].map((item, index) => (
            <Reveal key={item} delay={index * 0.08}>
              <m.div
                whileHover={{ y: -6, borderColor: 'rgba(213, 197, 255, 0.42)' }}
                className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-[0.62rem] uppercase tracking-[0.28em] text-paper/42">Why her</p>
                <p className="mt-4 text-lg leading-8 text-paper/80">{item}</p>
              </m.div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
