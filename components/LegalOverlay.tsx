import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LegalOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const LegalOverlay: React.FC<LegalOverlayProps> = ({ isOpen, onClose, title, content }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Lock main scroll
      if ((window as any).lenis) (window as any).lenis.stop();

      gsap.to(overlayRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out'
      });

      gsap.fromTo('.legal-content-inner',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      // Unlock main scroll
      if ((window as any).lenis) (window as any).lenis.start();

      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        y: 20,
        duration: 0.5,
        ease: 'power3.in'
      });
    }
  }, [isOpen]);

  const handleDownloadPDF = () => {
    // Generate a simulated high-quality PDF from the rendered content
    const textContent = scrollContainerRef.current?.innerText || "";
    const blob = new Blob([`JILL.AI OFFICIAL LEGAL DOCUMENT\nDOCUMENT: ${title}\n\n${textContent}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `JillAI_${title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-3xl flex flex-col opacity-0 invisible translate-y-5"
    >
      {/* Persistent Floating Close Button */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 z-[2100] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300 shadow-2xl backdrop-blur-md group"
        aria-label="Close Overlay"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:rotate-90 transition-transform duration-500"><path d="M18 6L6 18M6 6l12 12" /></svg>
      </button>

      {/* Header */}
      <div className="flex justify-between items-center p-8 md:p-12 border-b border-white/10 shrink-0 pr-24">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-1">Legal Artifact</span>
          <h2 className="text-2xl md:text-3xl font-light tracking-tighter text-white drop-shadow-md">{title}</h2>
        </div>
      </div>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-8 md:p-24 scrollbar-hide"
      >
        <div className="max-w-4xl mx-auto legal-content-inner">
          <div className="prose prose-invert prose-stone max-w-none 
            prose-h1:font-light prose-h1:tracking-tighter prose-h1:text-6xl prose-h1:mb-12 prose-h1:text-white prose-h1:drop-shadow-lg
            prose-h2:font-light prose-h2:tracking-tight prose-h2:text-accent prose-h2:text-3xl prose-h2:mt-16 prose-h2:drop-shadow-sm
            prose-h3:text-white/90 prose-h3:text-xl
            prose-p:text-white/90 prose-p:font-light prose-p:leading-relaxed prose-p:text-lg prose-p:drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]
            prose-li:text-white/80 prose-li:font-light prose-li:text-lg prose-li:mb-2
            prose-strong:text-white prose-strong:font-semibold prose-strong:text-accent/90">
            {title === 'privacy' && (
              <div className="space-y-8">
                <h1>Privacy Policy</h1>
                <p><strong>Last Updated: December 2025</strong></p>
                <p>JillAI (Pty) Ltd ("Jill") is committed to protecting the privacy of the next generation. Unlike traditional platforms, our "Local-First" architecture ensures that data remains on the device.</p>
                <h2>1. Data Minimization</h2>
                <p>We do not collect PII (Personally Identifiable Information) for behavioral profiling. All sentiment analysis occurs on the Jill-Edge node.</p>
                <h2>2. Zero-Knowledge Proofs</h2>
                <p>We verify identities without storing them. Your child is a node, not a product.</p>
                <p>For full details, download the <a href="/assets/Privacy_Policy.pdf" target="_blank" className="text-accent underline">Complete Privacy Artifact (PDF)</a>.</p>
              </div>
            )}
            {title === 'paia' && (
              <div className="space-y-8">
                <h1>PAIA Manual</h1>
                <p><strong>Prepared in terms of Section 51 of the Promotion of Access to Information Act.</strong></p>
                <p>JillAI (Pty) Ltd operates under the laws of the Republic of South Africa. This manual provides the necessary information for external nodes to request access to records held by the entity.</p>
                <h2>Contact Person</h2>
                <p>Information Officer: E. Coetzee<br />Address: Vaalpark, Sasolburg, Freestate.</p>
                <p>Access the full manual: <a href="/assets/PAIA_Manual.pdf" target="_blank" className="text-accent underline">Download PAIA PDF</a>.</p>
              </div>
            )}
            {title === 'terms' && (
              <div className="space-y-8">
                <h1>Terms of Use</h1>
                <p>By engaging with the Jill ecosystem, you agree to the structural protocols of the IOkT network.</p>
                <h2>1. Ethical Boundaries</h2>
                <p>The Jill-Node may not be used for the creation of harmful behavioral loops.</p>
                <p>Full spectrum terms: <a href="/assets/Terms_of_Use.pdf" target="_blank" className="text-accent underline">Download Terms (PDF)</a>.</p>
              </div>
            )}
          </div>

          <div className="mt-32 pt-16 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 pb-32">
            <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-medium">
              Authorized and Issued by JillAI (Pty) Ltd. Secure Node ID: LEGAL-VAAL-01
            </div>
            <div className="flex gap-8">
              <button
                onClick={handleDownloadPDF}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-accent hover:text-white transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>
                Download PDF
              </button>
              <button
                onClick={() => window.print()}
                className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-all"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" /></svg>
                Print Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalOverlay;