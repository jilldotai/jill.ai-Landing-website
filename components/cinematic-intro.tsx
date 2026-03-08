'use client';

import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

const questionLines = [
  'The internet was built for adults.',
  'Kids were added later.',
  'And now they live inside a system that was never designed for them.',
];

const revealPanels = [
  {
    eyebrow: 'Experiment 01',
    title: 'A new line of inquiry',
    body: 'A digital research lab exploring safer infrastructure for the next generation.',
    image: '/assets/images/bg-logo.jpeg',
    meta: 'Independent AI research lab',
    footer: 'Curiosity / ethics / infrastructure',
  },
  {
    eyebrow: 'IOkT',
    title: 'Internet of Kids Things',
    body: 'A privacy-first safety layer for children online.',
    image: '/assets/images/ioktid-anchor.jpeg',
    meta: 'Project 01',
    footer: 'Identity / trust / child context',
  },
  {
    eyebrow: 'Mechanism',
    title: 'Trust before access',
    body: 'Verified guardians, child-safe identity context, and local-first intervention.',
    image: '/assets/images/ioktkey-interface.jpeg',
    meta: 'System design',
    footer: 'Verification / local AI / prevention',
  },
  {
    eyebrow: 'Principle',
    title: 'Free for every child',
    body: 'Protection should not be a premium feature reserved for families who can afford it.',
    image: '/assets/images/problem-visual.jpeg',
    meta: 'Public-interest design',
    footer: 'Safety / dignity / access',
  },
  {
    eyebrow: 'Model',
    title: 'Licensed to platforms that care',
    body: 'The infrastructure scales by helping developers and institutions build responsibly.',
    image: '/assets/images/ioktnet-shield.jpeg',
    meta: 'Scale path',
    footer: 'Licensing / platforms / institutions',
  },
];

const movementRoles = ['parents', 'developers', 'partners', 'supporters'];

const introDocs = [
  {
    title: 'Privacy Policy',
    href: '/assets/Privacy_Policy.pdf',
    body: 'How Jill.ai handles personal information and privacy commitments.',
  },
  {
    title: 'Terms of Use',
    href: '/assets/Terms_of_Use.pdf',
    body: 'The governing terms for use of the site and related materials.',
  },
  {
    title: 'PAIA Manual',
    href: '/assets/PAIA_Manual.pdf',
    body: 'South African access-to-information and compliance documentation.',
  },
  {
    title: 'Architecture Blueprint',
    href: '/assets/Public_Architecture_Blueprint_Jill.ai__iokt_(public_edition).pdf',
    body: 'A public-facing technical view of the IOkT architecture and trust model.',
  },
  {
    title: 'Technical Whitepaper',
    href: '/assets/IOkTSuite_Technical_Whitepaper_.pdf',
    body: 'Longer-form technical framing for the IOkT suite and design rationale.',
  },
];

function ScrollLine({
  line,
  progress,
  start,
  className,
}: {
  line: string;
  progress: MotionValue<number>;
  start: number;
  className: string;
}) {
  const opacity = useTransform(progress, [start, start + 0.1, start + 0.24], [0.12, 1, 1]);
  const y = useTransform(progress, [start, start + 0.1], [32, 0]);

  return (
    <m.p style={{ opacity, y }} className={className}>
      {line}
    </m.p>
  );
}

function StoryCard({
  line,
  progress,
  start,
}: {
  line: string;
  progress: MotionValue<number>;
  start: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.12], [0.16, 1]);
  const y = useTransform(progress, [start, start + 0.12], [28, 0]);

  return (
    <m.div
      style={{ opacity, y }}
      className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6 text-2xl leading-tight text-paper md:p-8 md:text-4xl"
    >
      {line}
    </m.div>
  );
}

function CompanionLine({
  line,
  progress,
  start,
}: {
  line: string;
  progress: MotionValue<number>;
  start: number;
}) {
  const opacity = useTransform(progress, [start, start + 0.12], [0.14, 1]);
  const y = useTransform(progress, [start, start + 0.12], [24, 0]);

  return (
    <m.p style={{ opacity, y }} className="text-3xl leading-tight text-paper md:text-5xl">
      {line}
    </m.p>
  );
}

export function CinematicIntro() {
  const reduceMotion = useReducedMotion();

  const arrivalRef = useRef<HTMLDivElement | null>(null);
  const questionRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);
  const labRef = useRef<HTMLDivElement | null>(null);
  const companionRef = useRef<HTMLDivElement | null>(null);

  const arrivalScroll = useScroll({ target: arrivalRef, offset: ['start start', 'end start'] });
  const questionScroll = useScroll({ target: questionRef, offset: ['start start', 'end start'] });
  const revealScroll = useScroll({ target: revealRef, offset: ['start start', 'end start'] });
  const labScroll = useScroll({ target: labRef, offset: ['start start', 'end start'] });
  const companionScroll = useScroll({ target: companionRef, offset: ['start start', 'end start'] });

  const arrivalOpacity = useTransform(arrivalScroll.scrollYProgress, [0, 0.58, 1], [1, 1, 0.15]);
  const arrivalScale = useTransform(arrivalScroll.scrollYProgress, [0, 1], [1, 0.94]);
  const arrivalY = useTransform(arrivalScroll.scrollYProgress, [0, 1], [0, -80]);

  const revealX = useTransform(
    revealScroll.scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['0%', '-58%'],
  );

  const labOpacity = useTransform(labScroll.scrollYProgress, [0, 0.18, 0.85, 1], [0.25, 1, 1, 0.3]);
  const companionOpacity = useTransform(companionScroll.scrollYProgress, [0, 0.18, 0.85, 1], [0.25, 1, 1, 0.3]);

  return (
    <>
      <section id="top" ref={arrivalRef} className="relative min-h-[180svh]">
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-5 md:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_20%_70%,rgba(213,197,255,0.12),transparent_24%),radial-gradient(circle_at_80%_25%,rgba(246,168,216,0.1),transparent_20%)]" />
          <m.div className="relative z-10 flex max-w-[1200px] flex-col items-center text-center" style={{ opacity: arrivalOpacity, scale: arrivalScale, y: arrivalY }}>
            <Image src="/assets/icons/logo-iridescent.svg" alt="Jill.ai logo" width={124} height={124} className="h-24 w-24 md:h-32 md:w-32" />
            <h1 className="mt-8 text-6xl font-semibold tracking-[0.16em] text-paper md:text-[8rem]">
              Jill<sup className="ml-1 text-[0.26em] tracking-[0.08em] text-paper/72">AI</sup>
            </h1>
            <p className="mt-8 max-w-3xl text-2xl leading-tight text-paper md:text-5xl md:leading-[1.08]">
              Turning curiosity into clarity
              <br />
              and ideas into impact
            </p>
            <p className="mt-8 max-w-2xl text-sm uppercase tracking-[0.28em] text-paper/48 md:text-[0.8rem]">
              An independent AI research lab
              <br />
              building safer digital infrastructure.
            </p>
            <div className="mt-16 flex flex-col items-center gap-3 text-paper/42">
              <span className="text-[0.62rem] uppercase tracking-[0.34em]">Scroll to enter</span>
              <m.span
                animate={reduceMotion ? undefined : { y: [0, 8, 0], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl"
              >
                ↓
              </m.span>
            </div>
          </m.div>
        </div>
      </section>

      <section id="mission" ref={questionRef} className="relative min-h-[240svh]">
        <div className="sticky top-0 flex h-[100svh] items-center px-5 md:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="iridescent-border rounded-[2.2rem] border border-white/10 bg-black/35 px-6 py-10 md:px-10 md:py-14">
              <p className="text-[0.7rem] uppercase tracking-[0.34em] text-paper/42">The question</p>
              <div className="mt-10 space-y-10 md:space-y-14">
                {questionLines.map((line, index) => (
                  <ScrollLine
                    key={line}
                    line={line}
                    progress={questionScroll.scrollYProgress}
                    start={index * 0.24}
                    className="max-w-5xl text-3xl leading-tight text-paper md:text-6xl md:leading-[1.06]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto max-w-[1440px]">
          <div className="iridescent-border rounded-[2rem] border border-white/10 bg-black/20 p-6 md:p-8">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-gold/85">Trust center</p>
                <h2 className="mt-4 max-w-3xl text-3xl leading-tight text-paper md:text-5xl">
                  Substance before hype.
                </h2>
              </div>
              <p className="max-w-md text-base leading-7 text-paper/68 md:text-right">
                Families, partners, and investors should be able to verify the governance posture early, not discover it as an afterthought.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {introDocs.map((doc) => (
                <a
                  key={doc.title}
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-[rgba(213,197,255,0.45)] hover:bg-white/[0.05]"
                >
                  <p className="text-[0.58rem] uppercase tracking-[0.28em] text-paper/42">Open document</p>
                  <p className="mt-4 text-xl leading-7 text-paper">{doc.title}</p>
                  <p className="mt-3 text-sm leading-7 text-paper/68">{doc.body}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="showcase" ref={revealRef} className="relative min-h-[320svh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden px-5 md:px-10">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="mb-6 flex items-end justify-between gap-6">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.34em] text-paper/42">The reveal</p>
                <h2 className="mt-3 max-w-xl text-3xl leading-tight text-paper md:text-5xl">Scroll to move through the first experiment.</h2>
              </div>
              <p className="hidden max-w-sm text-right text-sm leading-7 text-paper/58 md:block">
                Vertical scroll. Horizontal discovery. Enough detail to intrigue, not enough to satisfy the question completely.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2.4rem] border border-white/10 bg-black/35 p-3 md:p-4">
              <m.div className="flex gap-4 md:gap-6" style={{ x: revealX }}>
                {revealPanels.map((panel, index) => (
                  <article
                    key={panel.title}
                    className="relative flex h-[72svh] min-w-[88vw] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-5 md:min-w-[62vw] md:p-8"
                  >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_55%)]" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-paper/45">{panel.eyebrow}</p>
                        <p className="mt-5 max-w-[16rem] text-[0.62rem] uppercase tracking-[0.3em] text-paper/38 md:max-w-none">
                          {panel.meta}
                        </p>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-paper/42">
                        0{index + 1}
                      </div>
                    </div>

                    <div className="relative grid flex-1 gap-5 md:grid-cols-[0.54fr_0.46fr] md:items-end">
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="max-w-xl text-4xl leading-[0.94] text-paper md:text-[5.4rem]">{panel.title}</p>
                          <p className="mt-5 max-w-md text-base leading-7 text-paper/70 md:text-xl md:leading-9">{panel.body}</p>
                        </div>

                        <div className="mt-8 hidden items-center justify-between border-t border-white/10 pt-4 md:flex">
                          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-paper/38">JillAI / reveal sequence</p>
                          <p className="text-[0.6rem] uppercase tracking-[0.3em] text-paper/38">{panel.footer}</p>
                        </div>
                      </div>

                      <div className="relative min-h-[18rem] md:min-h-[26rem]">
                        <div className="image-mask absolute inset-y-4 left-0 right-[14%] overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0f0f12] shadow-[0_24px_60px_rgba(0,0,0,0.38)]">
                          <Image src={panel.image} alt={panel.title} fill className="object-cover opacity-88" />
                        </div>
                        <div className="absolute -bottom-1 right-0 w-[46%] rounded-[1.2rem] border border-white/10 bg-black/72 p-4 backdrop-blur">
                          <p className="text-[0.56rem] uppercase tracking-[0.3em] text-paper/42">Lab note</p>
                          <p className="mt-3 text-sm leading-6 text-paper/72">
                            {index === 0 && 'The lab starts with a question, not a product slogan.'}
                            {index === 1 && 'IOkT is the first concrete experiment in the JillAI lab.'}
                            {index === 2 && 'Protection has to happen before harm is sent, not after it is logged.'}
                            {index === 3 && 'The principle is public good first, monetization second.'}
                            {index === 4 && 'The scale path is platform licensing, not child data extraction.'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-4 md:hidden">
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-paper/38">{panel.footer}</p>
                    </div>
                  </article>
                ))}
              </m.div>
            </div>
          </div>
        </div>
      </section>

      <section ref={labRef} className="relative min-h-[220svh]">
        <div className="sticky top-0 flex h-[100svh] items-center px-5 md:px-10">
          <m.div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.8fr_1.2fr]" style={{ opacity: labOpacity }}>
            <div className="rounded-[2rem] border border-white/10 bg-black/28 p-8 md:p-10">
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-paper/42">The lab</p>
              <h2 className="mt-6 text-4xl leading-tight text-paper md:text-6xl">Curiosity with a discipline.</h2>
            </div>
            <div className="grid gap-4">
              {[
                'JillAI is not a company chasing trends.',
                'It is a research lab exploring ethical AI.',
                'One problem at a time.',
                'Built by a mom who refused to accept that the internet could not be safer.',
              ].map((line, index) => (
                <StoryCard key={line} line={line} progress={labScroll.scrollYProgress} start={index * 0.16} />
              ))}
            </div>
          </m.div>
        </div>
      </section>

      <section ref={companionRef} className="relative min-h-[240svh]">
        <div className="sticky top-0 flex h-[100svh] items-center px-5 md:px-10">
          <m.div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[1.05fr_0.95fr]" style={{ opacity: companionOpacity }}>
            <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-8 md:p-10">
              <p className="text-[0.72rem] uppercase tracking-[0.34em] text-paper/42">The companion</p>
              <div className="mt-8 space-y-8">
                {[
                  'Artificial intelligence can amplify the worst of humanity.',
                  'Or the best of it.',
                  'In the wrong hands, AI becomes a weapon.',
                  'In the right hands, it becomes a guardian.',
                ].map((line, index) => (
                  <CompanionLine key={line} line={line} progress={companionScroll.scrollYProgress} start={index * 0.16} />
                ))}
              </div>
            </div>

            <div className="iridescent-border flex flex-col justify-end rounded-[2rem] border border-white/10 bg-black/28 p-8 md:p-10">
              <Image src="/assets/icons/logo-iridescent.svg" alt="Jill.ai logo" width={92} height={92} className="h-20 w-20" />
              <p className="mt-10 text-5xl tracking-[0.12em] text-paper md:text-7xl">
                Jill<sup className="text-[0.28em] text-paper/72">AI</sup>
              </p>
              <p className="mt-6 max-w-md text-xl leading-9 text-paper/72 md:text-3xl md:leading-[1.3]">
                Jill to the power of AI.
              </p>
            </div>
          </m.div>
        </div>
      </section>

      <section className="relative px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2rem] border border-white/10 bg-black/28 p-8 md:p-10">
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-paper/42">The movement</p>
            <h2 className="mt-6 text-4xl leading-tight text-paper md:text-6xl">
              Protecting children online is not a solo mission.
            </h2>
            <p className="mt-8 max-w-lg text-lg leading-8 text-paper/72 md:text-2xl md:leading-10">
              It takes parents. Developers. Researchers. Companies. Communities.
            </p>
            <p className="mt-6 text-2xl uppercase tracking-[0.24em] text-paper/46 md:text-3xl">It takes a village.</p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))] p-8 md:p-10">
            <p className="text-[0.72rem] uppercase tracking-[0.34em] text-gold/85">Join the mission</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {movementRoles.map((role) => (
                <a
                  key={role}
                  href="#contact"
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-5 py-5 text-2xl uppercase tracking-[0.18em] text-paper transition hover:border-[rgba(213,197,255,0.45)] hover:bg-white/[0.05]"
                >
                  {role}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px] rounded-[2.4rem] border border-white/10 bg-black/28 px-8 py-12 text-center md:px-12 md:py-16">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-paper/42">The future</p>
          <div className="mt-8 space-y-8">
            <p className="text-4xl leading-tight text-paper md:text-6xl">IOkT is only the beginning.</p>
            <p className="text-2xl leading-tight text-paper/76 md:text-4xl">More experiments are already underway.</p>
            <p className="text-2xl leading-tight text-paper/76 md:text-4xl">
              The future of the internet should belong to the next generation.
            </p>
          </div>
          <div className="mt-12 flex items-center justify-center">
            <Image src="/assets/icons/logo-iridescent.svg" alt="Jill.ai logo" width={96} height={96} className="h-20 w-20 md:h-24 md:w-24" />
          </div>
        </div>
      </section>
    </>
  );
}
