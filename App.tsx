'use client';


import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';
import Layout from './components/Layout';
import ArrivalScene from './components/sections/ArrivalScene';
import QuestionSequence from './components/sections/QuestionSequence';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import LabSection from './components/sections/LabSection';
import CompanionSection from './components/sections/CompanionSection';
import MovementSection from './components/sections/MovementSection';
import FutureSection from './components/sections/FutureSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import SupportAgent from './components/SupportAgent';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  useEffect(() => {
    ScrollTrigger.refresh();

    gsap.utils.toArray('.fade-step').forEach((item) => {
      gsap.fromTo(
        item as gsap.TweenTarget,
        { opacity: 0.12, y: 35, filter: 'blur(7px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item as Element,
            start: 'top 84%',
            end: 'top 45%',
            scrub: 0.9,
          },
        }
      );
    });

    gsap.utils.toArray('[data-section]').forEach((section) => {
      gsap.fromTo(
        section as gsap.TweenTarget,
        { opacity: 0.82, y: 26 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section as Element,
            start: 'top 90%',
            end: 'top 60%',
            scrub: 0.8,
          },
        }
      );
    });
  }, []);

  const handleWhitepaperDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/assets/IOkTSuite_Technical_Whitepaper_.pdf';
    link.download = 'IOkT_Technical_Whitepaper.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout>
      <main className="relative z-10 w-full">
        <div data-section>
          <ArrivalScene />
        </div>

        <div data-section>
          <QuestionSequence />
        </div>

        <div data-section>
          <HorizontalScrollSection />
        </div>

        <div data-section>
          <LabSection />
        </div>

        <div data-section>
          <CompanionSection />
        </div>

        <div data-section>
          <MovementSection />
        </div>

        <div data-section>
          <FutureSection />
        </div>

        <div id="contact" data-section>
          <ContactSection />
        </div>

        <Footer />
        <SupportAgent />
      </main>
      <Analytics />
    </Layout>
  );
};

export default App;
