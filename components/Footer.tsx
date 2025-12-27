import React, { useState } from 'react';
import ScrollVideoSection from './ScrollVideoSection';
import LegalOverlay from './LegalOverlay';

const Footer: React.FC = () => {
  const footerVideo = "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-a-woman-in-a-field-of-flowers-43187-large.mp4";
  
  const [activeDoc, setActiveDoc] = useState<'privacy' | 'paia' | 'terms' | null>(null);

  const docs = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <>
          <h1>Privacy Policy</h1>
          <p>Effective Date: 18 December 2025 | Version: 1.1</p>
          
          <h2>1. Acronyms and definitions</h2>
          <p>In this Privacy Policy:</p>
          <ul>
            <li><strong>“JillAI”</strong>, “we”, “us”, “our” means JillAI (Pty) Ltd, trading as Jill.AI</li>
            <li><strong>“IO”</strong> means the Information Officer.</li>
            <li><strong>“PAIA”</strong> means the Promotion of Access to Information Act 2 of 2000 (as amended).</li>
            <li><strong>“POPIA”</strong> means the Protection of Personal Information Act 4 of 2013.</li>
            <li><strong>“IOkT”</strong> means Internet Of Kids Things.</li>
          </ul>

          <h2>2. Purpose of this Privacy Policy</h2>
          <p>This Privacy Policy explains what personal information we collect and process, why we process it, who we share it with, and how we secure it.</p>

          <h2>3. Scope</h2>
          <p>This Privacy Policy applies to all Services that JillAI develops or operates and that link to or reference this policy, including the IOkT Suite (planned roll out 2026).</p>

          <h2>4. Key contact details (Privacy / POPIA)</h2>
          <p><strong>Information Officer:</strong> Estelle Coetzee<br/>
          <strong>Email:</strong> estelle.coetzee@jilldotai.co.za<br/>
          <strong>Website:</strong> jilldotai.co.za<br/>
          <strong>Address:</strong> Sasolburg, Freestate, South Africa, 1947</p>

          <h2>5. Our "privacy-first" architecture</h2>
          <p>Before verification we process minimal security signals to protect the service. After verification we may process additional device signals to prevent fraud and keep children safe. We do not use these signals for advertising.</p>

          <h2>6. Data Storage & Retention</h2>
          <p>We keep personal information only for as long as necessary for the purposes described in this policy, primarily operating from South Africa with appropriate cross-border safeguards.</p>
        </>
      )
    },
    paia: {
      title: "PAIA Manual (Section 51)",
      content: (
        <>
          <h1>PAIA Manual</h1>
          <p>Prepared in terms of section 51 of the Promotion of Access to Information Act 2 of 2000 ("PAIA").</p>
          <p><strong>Private Body:</strong> JillAI (Pty) Ltd (trading as Jill.AI)</p>
          <p><strong>Website:</strong> jilldotai.co.za</p>
          <p><strong>Date of compilation:</strong> December 20, 2025</p>

          <h2>1. Purpose of this PAIA Manual</h2>
          <p>This PAIA Manual is intended to help requesters identify categories of records held by JillAI that are available without a formal PAIA request and understand how to request access to records.</p>

          <h2>2. Key contact details</h2>
          <p><strong>Information Officer:</strong> Estelle Coetzee<br/>
          <strong>Email:</strong> estelle.coetzee@jilldotai.co.za<br/>
          <strong>Telephone:</strong> +27 72 088 9940<br/>
          <strong>Physical address:</strong> Vaalpark, Freestate, South Africa, 1947</p>

          <h2>3. Categories of records available without a request</h2>
          <p>Company information, Public website information, product descriptions, and public policies are available on our website without a formal PAIA request.</p>

          <h2>4. Processing of personal information (POPIA)</h2>
          <p>JillAI processes personal information to provide child safety and security features, manage accounts, prevent fraud, and comply with legal obligations.</p>
        </>
      )
    },
    terms: {
      title: "Terms of Use",
      content: (
        <>
          <h1>Terms of Use</h1>
          <p>Effective date: December 27, 2025</p>
          <p>These Terms of Use ("Terms") govern access to and use of JillAI (Pty) Ltd’s websites, apps, and services. By accessing or using the Services, you agree to these Terms.</p>

          <h2>1. Eligibility and children</h2>
          <p>The Services are designed to protect minors. If you are a Child (a minor under 18), you may only use the Services with the involvement and consent of a parent or legal guardian ("Guardian").</p>

          <h2>2. Acceptable use</h2>
          <p>You may not use the Services to harm, exploit, or target Children; violate any law; attempt to bypass safety controls; or introduce malware.</p>

          <h2>3. Intellectual property</h2>
          <p>We (and our licensors) retain all rights, title, and interest in the Services, including trademarks, logos, software, and content.</p>

          <h2>4. Limitation of liability</h2>
          <p>To the maximum extent permitted by law, JillAI will not be liable for indirect, incidental, special, consequential, or punitive damages.</p>

          <h2>5. Contact</h2>
          <p>For privacy requests, contact the Information Officer using the contact details in the Privacy Policy.</p>
        </>
      )
    }
  };

  return (
    <footer className="relative w-full">
      <ScrollVideoSection
        videoSrc={footerVideo}
        introStart={0}
        introEnd={7}
        scrollEnd={7}
        isFooter={true}
        backgroundImage="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1920&auto=format&fit=crop"
      >
        <div className="absolute inset-0 z-30 flex flex-col justify-end pointer-events-none">
          <div className="w-full bg-black/40 backdrop-blur-2xl border-t border-white/10 p-8 md:p-12 pointer-events-auto">
            <div className="max-w-7xl mx-auto">
              
              {/* Brand Title */}
              <div className="w-full mb-6">
                <div className="text-5xl font-semibold tracking-tighter text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">JILL.AI</div>
              </div>

              {/* Information Grid: Company (Left) and Director (Right) */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-6">
                
                {/* Left Side: Restored Company Information */}
                <div className="space-y-1.5 text-[10px] uppercase tracking-[0.25em] text-white/40 font-light">
                  <p>ENTITY: <span className="text-white/70">JILLAI (PTY) LTD T/A JILL.AI</span></p>
                  <p>REGISTRATION NO: <span className="text-white/70">2025 / 631008 / 07</span></p>
                  <p>TAX NO: <span className="text-white/70">9976067190</span></p>
                  <p>REGULATOR REG NO: <span className="text-white/70">2025-068501</span></p>
                </div>

                {/* Right Side: Director Info (Right-Aligned, In-line with Company) */}
                <div className="text-right md:w-auto w-full">
                  <div className="space-y-3 text-[10px] uppercase tracking-[0.2em] text-white/40 font-light">
                    <p>
                      DIRECTOR / INFORMATION OFFICER<br />
                      <span className="text-white/80 text-sm font-normal block mt-1 tracking-tight normal-case">Estelle Coetzee</span>
                    </p>
                    <p className="leading-relaxed opacity-60">
                      VAALPARK, SASOLBURG,<br />
                      FREESTATE, SOUTH AFRICA, 1947
                    </p>
                  </div>
                </div>
              </div>

              {/* Legal Links (Center Aligned, Balanced Spacing) */}
              <div className="w-full flex justify-center py-4 my-2">
                <nav className="flex flex-row gap-12 text-[10px] uppercase tracking-[0.4em] font-bold">
                  <button 
                    onClick={() => setActiveDoc('privacy')}
                    className="group text-white/30 hover:text-white transition-all duration-500 relative py-2"
                  >
                    Privacy Policy
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full"></span>
                  </button>
                  <button 
                    onClick={() => setActiveDoc('paia')}
                    className="group text-white/30 hover:text-white transition-all duration-500 relative py-2"
                  >
                    PAIA Manual
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full"></span>
                  </button>
                  <button 
                    onClick={() => setActiveDoc('terms')}
                    className="group text-white/30 hover:text-white transition-all duration-500 relative py-2"
                  >
                    Terms of Use
                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-500 group-hover:w-full"></span>
                  </button>
                </nav>
              </div>

              {/* Signature Line (Minimal Spacing) */}
              <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 gap-4">
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium">
                  © 2025 JILL.AI. INTELLIGENCE WITH INTENT.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-green-500/60 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                    <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">SECURE INFRASTRUCTURE NODE: ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollVideoSection>

      {/* Overlay Rendering */}
      <LegalOverlay 
        isOpen={activeDoc !== null}
        onClose={() => setActiveDoc(null)}
        title={activeDoc ? docs[activeDoc].title : ''}
        content={activeDoc ? docs[activeDoc].content : null}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        a:hover, button:hover {
          text-shadow: 0 0 15px var(--glow-color);
        }
      `}} />
    </footer>
  );
};

export default Footer;