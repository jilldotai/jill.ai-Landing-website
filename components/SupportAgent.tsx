
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { gsap } from 'gsap';

const SYSTEM_INSTRUCTION = `
You are Lumi, the IOkT tech-wiz and support agent for Jill.ai. 
CONTEXT: Jill.ai is a privacy-first neural ecosystem focused on "Intelligence with Intent".
DOCUMENTS: Whitepaper, Roadmap, Privacy Policy, PAIA Manual, Terms of Use.
STRICT RULES:
1. You are Lumi—friendly, enthusiastic, and highly technical yet accessible.
2. Answer ONLY using the provided documents. 
3. If the answer is not in the context, say: "Lumi's sensors can't find that in the public nodes! Contact E. Coetzee at hello@jill.ai for deeper access."
4. Never guess or hallucinate.
`;

const SupportAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Lumi online. How can I facilitate your understanding of the Jill ecosystem today?" }
  ]);

  const LUMI_IMG = "./assets/images/lumi.webp.png";

  useEffect(() => {
    if (isOpen) gsap.fromTo('.agent-panel', { opacity: 0, y: 30, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' });
  }, [isOpen]);

  const PREDEFINED_FAQ: Record<string, string> = {
    "parents": "Jill.ai is built with structural safety for children. We utilize a 'Privacy Air Gap' so no data leaves the device. Parents have master control via Sentinel Node.",
    "privacy": "We use Zero-Knowledge Proofs. This means we can verify age or identity without actually 'seeing' or storing PII. No data harvesting, ever.",
    "technical": "Our architecture is local-first Edge AI. We use the Jill-13B model optimized for on-device sentiment analysis and intervention.",
    "roadmap": "We are currently in Phase 1 (Alpha Transmission). IOkT Suite deployment is scheduled for Q3 2025.",
    "identity": "IOkTID uses self-sovereign identity protocols. Your child's digital footprint remains their own, verifiable but encrypted."
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    const msg = inputText.toLowerCase();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);

    // Local FAQ Check first
    for (const key in PREDEFINED_FAQ) {
      if (msg.includes(key)) {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'ai', text: PREDEFINED_FAQ[key] }]);
        }, 600);
        return;
      }
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' } as any);
      const response = await (ai as any).models.generateContent({
        model: 'gemini-1.5-flash',
        contents: msg,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      if (response.text) setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Lumi detected a signal interruption. But don't worry—my core nodes say: Jill.ai is the future of digital safety. Contact E. Coetzee for more!" }]);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[1100] flex flex-col items-end">
      {isOpen && (
        <div className="agent-panel absolute bottom-0 right-0 w-[85vw] max-w-[360px] h-[480px] bg-[#080808]/95 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden">
          <div className="p-6 border-b border-white/10 bg-[#0c0c0c] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img src={LUMI_IMG} alt="Lumi" className="w-12 h-12 object-contain bg-white/5 rounded-full p-1" />
              <div className="flex flex-col">
                <span className="text-white font-medium">Lumi</span>
                <span className="text-[9px] uppercase tracking-widest text-white/40">IOkT Node</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} title="Close Chat" className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-all">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080808]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-white/10 text-white rounded-bl-none'}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-[#0c0c0c] border-t border-white/10">
            <div className="relative">
              <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} placeholder="Query Lumi..." className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm text-white focus:outline-none focus:border-accent/50" />
              <button onClick={handleSendMessage} title="Send Message" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 rounded-full bg-foreground shadow-2xl flex items-center justify-center hover:scale-110 transition-all border border-white/10 relative z-[201]">
        <img src={LUMI_IMG} alt="Lumi" className="w-10 h-10 object-contain" />
      </button>
    </div>
  );
};

export default SupportAgent;
