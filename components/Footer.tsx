'use client';

import Image from 'next/image';
import { m } from 'motion/react';
import { Reveal } from '@/components/site-motion';

export function Footer() {
  return (
    <footer className="relative px-5 pb-10 md:px-10 md:pb-14">
      <Reveal>
        <m.div
          whileHover={{ y: -6 }}
          className="mx-auto flex w-full max-w-360 flex-col gap-8 rounded-4xl border border-white/10 bg-white/3 px-6 py-8 md:flex-row md:items-end md:justify-between md:px-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <Image src="/assets/icons/logo-iridescent.svg" alt="Jill.ai logo" width={30} height={30} className="h-8 w-8" />
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-paper/45">Jill.ai</p>
            </div>
            <p className="mt-4 max-w-xl text-2xl leading-tight text-paper md:text-3xl">
              Intelligence with integrity, expressed as privacy-first infrastructure for a safer digital childhood.
            </p>
          </div>

          <div className="space-y-3 text-[0.68rem] uppercase tracking-[0.28em] text-paper/42 md:text-right">
            <p>hello@jilldotai.co.za</p>
            <p>jilldotai.co.za</p>
            <div className="flex flex-wrap gap-4 md:justify-end">
              <a href="/assets/Privacy_Policy.pdf" target="_blank" rel="noreferrer" className="hover:text-paper">
                Privacy Policy
              </a>
              <a href="/assets/Terms_of_Use.pdf" target="_blank" rel="noreferrer" className="hover:text-paper">
                Terms
              </a>
              <a href="/assets/PAIA_Manual.pdf" target="_blank" rel="noreferrer" className="hover:text-paper">
                PAIA Manual
              </a>
            </div>
            <p>&copy; 2026 Jill.ai</p>
          </div>
        </m.div>
      </Reveal>
    </footer>
  );
}
