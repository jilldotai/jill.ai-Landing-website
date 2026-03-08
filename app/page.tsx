'use client';

<<<<<<< HEAD
import { ContactForm } from '@/components/contact-form';
import { CinematicIntro } from '@/components/cinematic-intro';
import { Footer } from '@/components/footer';
import { FounderStory } from '@/components/founder-story';
import { Navbar } from '@/components/navbar';
import { MotionRoot, Parallax, Reveal } from '@/components/site-motion';

const roadmap = [
  {
    stage: 'Phase 0',
    title: 'Design and validation',
    body: 'Architecture, compliance research, patent framing, and a clear product thesis already exist. Radical honesty about stage is part of the brand.',
  },
  {
    stage: 'Phase 1',
    title: 'Parent verification service',
    body: 'Build the IOkT (ID) backend for onboarding verified parents, child profiles, and the first credential checks for the keyboard.',
  },
  {
    stage: 'Phase 2',
    title: 'Guardian keyboard MVP',
    body: 'Ship the Android keyboard with on-device inference, intervention prompts, and aggregate parent alerts for the founding families.',
  },
  {
    stage: 'Phase 3',
    title: 'Identity mesh',
    body: 'Extend the system toward device-level identity binding, cross-app verification, and the broader IOkT suite.',
  },
];

const partnerPaths = [
  {
    label: 'Founding families',
    body: 'For parents who want early access, product feedback loops, and a direct line into the first real operating environment.',
  },
  {
    label: 'Partners and schools',
    body: 'For institutions exploring pilot programs, compliance-led child safety infrastructure, or future integrations.',
  },
  {
    label: 'Investors and advisors',
    body: 'For aligned funders and operators evaluating the thesis, moat, roadmap, and technical credibility.',
  },
];

const trustDocs = [
  {
    title: 'Privacy Policy',
    href: '/assets/Privacy_Policy.pdf',
    body: 'How Jill.ai handles personal information and platform privacy commitments.',
  },
  {
    title: 'Terms of Use',
    href: '/assets/Terms_of_Use.pdf',
    body: 'The governing terms for use of the site and related Jill.ai materials.',
  },
  {
    title: 'PAIA Manual',
    href: '/assets/PAIA_Manual.pdf',
    body: 'South African access-to-information and compliance documentation.',
  },
];

export default function Home() {
  return (
    <MotionRoot>
      <main className="noise-overlay relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(213,197,255,0.18),transparent_30%),radial-gradient(circle_at_85%_12%,rgba(246,168,216,0.08),transparent_20%),radial-gradient(circle_at_15%_70%,rgba(241,181,143,0.08),transparent_22%),linear-gradient(180deg,#10100d_0%,#090908_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

        <Navbar />
        <CinematicIntro />

        <section id="roadmap" className="relative px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid w-full max-w-[1440px] gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <Parallax offset={36}>
              <Reveal className="surface-panel rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(213,197,255,0.18),transparent_55%),rgba(255,255,255,0.03)] p-8 md:p-10">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-gold/85">Roadmap</p>
                <h2 className="mt-6 text-4xl tracking-[-0.05em] text-paper md:text-6xl">
                  Deliberate phases, not vague ambition.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-paper/72">
                  The site should make the stage legible. Right now that means proof of thinking, a clear build order, and a compelling invitation to the first families and aligned partners.
                </p>
                <div className="mt-8 rounded-[1.4rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-[0.62rem] uppercase tracking-[0.28em] text-paper/42">Roadmap logic</p>
                  <p className="mt-3 text-lg leading-8 text-paper/80">
                    Validate the trust model first, prove local intervention next, then expand toward a broader identity mesh and external integrations.
                  </p>
                </div>
              </Reveal>
            </Parallax>

            <div className="grid gap-4">
              {roadmap.map((item, index) => (
                <Reveal key={item.stage} delay={index * 0.1}>
                  <article className="rounded-[1.7rem] border border-white/10 bg-[#10100d] px-6 py-6 md:px-8">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <p className="text-[0.72rem] uppercase tracking-[0.32em] text-gold/82">{item.stage}</p>
                      <p className="text-[0.72rem] uppercase tracking-[0.3em] text-paper/38">In sequence</p>
                    </div>
                    <h3 className="mt-5 text-2xl tracking-[-0.03em] text-paper md:text-3xl">{item.title}</h3>
                    <p className="mt-4 max-w-3xl text-base leading-8 text-paper/70">{item.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="relative px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-[1440px]">
            <FounderStory />
          </div>
        </section>

        <section id="contact" className="relative px-5 pb-20 pt-10 md:px-10 md:pb-28">
          <Parallax className="mx-auto max-w-[1440px]" offset={24}>
            <Reveal className="iridescent-border surface-panel grid w-full gap-8 rounded-[2.4rem] border border-white/10 bg-[linear-gradient(135deg,rgba(217,229,255,0.1),rgba(246,168,216,0.06),rgba(255,255,255,0.03))] p-8 md:grid-cols-[0.88fr_1.12fr] md:p-12">
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-gold/85">Join the mission</p>
                <h2 className="mt-5 text-4xl tracking-[-0.05em] text-paper md:text-6xl">
                  Families, partners, and early supporters can register interest now.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-8 text-paper/72">
                  This form submits to a Next.js API route and stores enquiries on the server. It is enough to work locally and on a Node-hosted deployment.
                  If you later want delivery to email, Airtable, Supabase, or a CRM, I can wire that next.
                </p>

                <div className="mt-10 grid gap-4">
                  {partnerPaths.map((item, index) => (
                    <Reveal key={item.label} delay={0.1 + index * 0.06}>
                      <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-paper/45">{item.label}</p>
                        <p className="mt-4 text-lg leading-8 text-paper/80">{item.body}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-[0.68rem] uppercase tracking-[0.3em] text-paper/45">Direct</p>
                  <a href="mailto:hello@jilldotai.co.za" className="mt-4 block text-xl text-paper hover:text-[rgb(213,197,255)]">
                    hello@jilldotai.co.za
                  </a>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {trustDocs.map((doc, index) => (
                    <Reveal key={doc.title} delay={0.2 + index * 0.05}>
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noreferrer"
                        className="block rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-[rgba(213,197,255,0.45)] hover:bg-white/[0.05]"
                      >
                        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-paper/42">Trust document</p>
                        <p className="mt-4 text-xl text-paper">{doc.title}</p>
                        <p className="mt-3 text-sm leading-7 text-paper/68">{doc.body}</p>
                      </a>
                    </Reveal>
                  ))}
                </div>
              </div>

              <ContactForm />
            </Reveal>
          </Parallax>
        </section>

        <Footer />
      </main>
    </MotionRoot>
  );
=======
import App from '../App';

export default function HomePage() {
  return <App />;
>>>>>>> 1ef9574d953de48238ed3800f4740a5c6e21a9f0
}
