import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { gsap } from 'gsap';

/**
 * BEHAVIOR CONTRACT:
 * 1. AI Chat Mode: Uses Gemini 3 Pro with a strict 9-second timeout.
 * 2. Help Center Mode (Fallback): Triggered by timeout, invalid keys, or errors. 
 *    Displays a curated Q&A selector with expandable items.
 * 3. Grounding: Strictly limited to public documents (Whitepaper, Roadmap, Privacy, PAIA, Terms).
 */

const SYSTEM_INSTRUCTION = `
You are Jill, the AI support agent for Jill.ai. 
CONTEXT: Jill.ai is a privacy-first neural ecosystem focused on "Intelligence with Intent".
DOCUMENTS: Whitepaper, Roadmap, Privacy Policy, PAIA Manual, Terms of Use.
STRICT RULES:
1. Answer ONLY using the provided documents. 
2. If the answer is not in the context, say: "That information is restricted to internal nodes. Please contact our Information Officer (E. Coetzee) at hello@jill.ai."
3. Never guess, hallucinate, or promise features not in the Roadmap.
4. Keep responses professional, minimalist, and concise.
`;

const FAQ_DATA = [
  {
    id: "what-is-jill",
    question: "What is Jill.ai?",
    answerHtml: "<p>Jill.ai is a next-generation neural engine designed to restore human agency by providing a seamless interface between digital information and cognitive intent.</p><p><a href='#mission' class='text-accent underline'>View Mission</a></p>"
  },
  {
    id: "data-privacy",
    question: "How do you handle my data?",
    answerHtml: "<p>We prioritize 'Neural Sovereignty.' Data is encrypted at the edge and never sold. We adhere to strict POPIA and GDPR standards.</p><p><a href='/privacy' class='text-accent underline'>Read Privacy Policy</a></p>"
  },
  {
    id: "roadmap-q",
    question: "When is the next release?",
    answerHtml: "<p>Q1 2025 marks the 'Alpha Genesis' release for our first 500 pioneers. Q2 will see the integration of the Identity, Synthesis, and Flow modules.</p><p><a href='#roadmap' class='text-accent underline'>View Roadmap</a></p>"
  },
  {
    id: "paia-request",
    question: "How do I make a PAIA request?",
    answerHtml: "<p>Formal requests for access to records can be directed to our Information Officer, E. Coetzee, as outlined in our PAIA Manual.</p><p><a href='/paia' class='text-accent underline'>Open PAIA Manual</a></p>"
  },
  {
    id: "contact-officer",
    question: "Contact Information Officer",
    answerHtml: "<p>Email: <strong>hello@jill.ai</strong><br/>Address: Vaalpark, Sasolburg, South Africa.</p>"
  }
];

const SupportAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'ai' | 'fallback'>('ai');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text?: string, html?: string }[]>([
    { role: 'ai', text: "Welcome to the Jill.ai support node. How can I facilitate your understanding today?" }
  ]);

  // Refs for Live API (Voice) and animations
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const faqContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.agent-panel', 
        { opacity: 0, y: 30, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'expo.out' }
      );
    }
  }, [isOpen]);

  // Handle accordion expansion animation
  useEffect(() => {
    if (mode === 'fallback') {
      const items = document.querySelectorAll('.faq-content');
      items.forEach((item: any) => {
        const id = item.getAttribute('data-id');
        if (id === expandedFaqId) {
          gsap.to(item, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' });
        } else {
          gsap.to(item, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
        }
      });
    }
  }, [expandedFaqId, mode]);

  const handleSendMessage = async (customMsg?: string) => {
    const textToSend = customMsg || inputText;
    if (!textToSend.trim()) return;

    if (!customMsg) setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setIsLoading(true);

    const TIMEOUT_MS = 9000;

    try {
      if (!process.env.API_KEY) throw new Error("API_KEY_MISSING");

      const aiResponse = await Promise.race([
        (async () => {
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: textToSend,
            config: { systemInstruction: SYSTEM_INSTRUCTION }
          });
          return response.text;
        })(),
        new Promise<null>((_, reject) => setTimeout(() => reject(new Error("TIMEOUT")), TIMEOUT_MS))
      ]);

      if (aiResponse) {
        setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
        setMode('ai');
      }
    } catch (err) {
      console.error("Support Node Fallback Activated:", err);
      setMode('fallback');
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "The direct neural link is experiencing latency. Reverting to Standard Help Center." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (html: string, id: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.innerText;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  // --- Voice Integration (Gemini 2.5 Native Audio) ---
  const toggleVoice = async () => {
    if (isVoiceMode) {
      stopVoice();
      return;
    }
    try {
      setIsVoiceMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } }
        },
        callbacks: {
          onopen: () => {
            const inputCtx = new AudioContext({ sampleRate: 16000 });
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const b64 = btoa(String.fromCharCode(...new Uint8Array(int16.buffer)));
              sessionPromiseRef.current?.then(s => s.sendRealtimeInput({ media: { data: b64, mimeType: 'audio/pcm;rate=16000' } }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const b64 = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (b64 && audioContextRef.current) {
              const i16 = new Int16Array(Uint8Array.from(atob(b64), c => c.charCodeAt(0)).buffer);
              const buf = audioContextRef.current.createBuffer(1, i16.length, 24000);
              buf.getChannelData(0).set(Array.from(i16).map(v => v / 32768.0));
              const node = audioContextRef.current.createBufferSource();
              node.buffer = buf;
              node.connect(audioContextRef.current.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
              node.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buf.duration;
              sourcesRef.current.add(node);
            }
          },
          onerror: () => setMode('fallback'),
          onclose: () => stopVoice()
        }
      });
    } catch (e) {
      stopVoice();
      setMode('fallback');
    }
  };

  const stopVoice = () => {
    setIsVoiceMode(false);
    sessionPromiseRef.current?.then(s => s.close());
    audioContextRef.current?.close();
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {/* Agent Panel */}
      {isOpen && (
        <div className="agent-panel mb-4 w-[85vw] max-w-[360px] h-[580px] bg-[#0d0d0d]/95 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden ring-1 ring-white/5">
          {/* Header */}
          <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center shrink-0">
            <div className="flex flex-col">
              <h3 className="text-white text-lg font-light tracking-tighter">Jill Support</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <div className={`w-1 h-1 rounded-full ${mode === 'ai' ? 'bg-accent animate-pulse' : 'bg-white/20'}`} />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-medium">
                  {mode === 'ai' ? 'Neural Link' : 'Help Center'}
                </span>
              </div>
            </div>
            {mode === 'ai' && (
              <button 
                onClick={toggleVoice}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-500 ${isVoiceMode ? 'bg-accent text-white scale-105 shadow-[0_0_20px_rgba(212,141,93,0.4)]' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'}`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>
              </button>
            )}
          </div>

          {/* Chat/Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {isVoiceMode ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border border-accent/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 glow-pulse animate-pulse" />
                  </div>
                </div>
                <p className="text-white/80 font-light italic text-base tracking-tight">Listening...</p>
                <button onClick={stopVoice} className="text-[9px] text-accent uppercase tracking-[0.4em] font-bold border-b border-accent/20 pb-1.5 hover:text-white transition-colors">End Session</button>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                    <div className={`max-w-[85%] p-4 rounded-[1.5rem] text-xs font-light leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-accent text-white rounded-br-none shadow-md' 
                        : 'bg-white/5 text-white/80 border border-white/10 rounded-bl-none'
                    }`}>
                      {m.text && <p>{m.text}</p>}
                      {m.html && <div className="space-y-3 prose prose-invert prose-xs" dangerouslySetInnerHTML={{ __html: m.html }} />}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-[1.5rem] flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer UI: Input or Fallback Help Center */}
          <div className="p-6 bg-white/[0.01] border-t border-white/5 shrink-0">
            {mode === 'fallback' ? (
              <div className="space-y-3 overflow-y-auto max-h-[250px] scrollbar-hide" ref={faqContainerRef}>
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-4 font-bold">Help Center</span>
                <div className="grid grid-cols-1 gap-2">
                  {FAQ_DATA.map(faq => {
                    const isExpanded = expandedFaqId === faq.id;
                    return (
                      <div key={faq.id} className="rounded-xl bg-white/5 border border-white/5 overflow-hidden transition-all duration-300">
                        <button 
                          onClick={() => toggleFaq(faq.id)}
                          className={`w-full text-left p-4 text-[11px] text-white/70 font-light flex justify-between items-center group transition-colors ${isExpanded ? 'bg-white/5 text-white' : 'hover:bg-white/10'}`}
                        >
                          <span className="max-w-[85%]">{faq.question}</span>
                          <span className={`text-accent transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                          </span>
                        </button>
                        <div className="faq-content overflow-hidden opacity-0 h-0" data-id={faq.id}>
                          <div className="p-4 pt-0 text-white/50 text-[10px] font-light leading-relaxed">
                            <div className="prose prose-invert prose-xs mb-3" dangerouslySetInnerHTML={{ __html: faq.answerHtml }} />
                            <div className="flex justify-end pt-3 border-t border-white/5">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(faq.answerHtml, faq.id);
                                }}
                                className="flex items-center gap-2 text-[8px] uppercase tracking-widest text-accent hover:text-white transition-colors"
                              >
                                {copiedId === faq.id ? "Copied" : "Copy"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button 
                  onClick={() => { setMode('ai'); setMessages([{role:'ai', text:'Neural link refreshed.'}]); }}
                  className="w-full text-center mt-4 text-[8px] text-white/20 uppercase tracking-[0.4em] font-bold hover:text-white transition-colors"
                >
                  Reconnect
                </button>
              </div>
            ) : !isVoiceMode && (
              <div className="relative group">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Jill..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-500 font-light"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Persistent Support Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-110 transition-all duration-500 relative group z-[101]"
      >
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-10 group-hover:opacity-30" />
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
};

export default SupportAgent;