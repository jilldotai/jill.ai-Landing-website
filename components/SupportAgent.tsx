
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { gsap } from 'gsap';

/**
 * BEHAVIOR CONTRACT:
 * 1. Identity: Lumi, the face of IOkT.
 * 2. AI Chat Mode: Uses Gemini 3 Pro with a strict 9-second timeout.
 * 3. Positioning: Anchored to bottom-right, close button in header.
 */

const SYSTEM_INSTRUCTION = `
You are Lumi, the IOkT tech-wiz and support agent for Jill.ai. 
CONTEXT: Jill.ai is a privacy-first neural ecosystem focused on "Intelligence with Intent".
DOCUMENTS: Whitepaper, Roadmap, Privacy Policy, PAIA Manual, Terms of Use.
STRICT RULES:
1. You are Lumi—friendly, enthusiastic, and highly technical yet accessible.
2. Answer ONLY using the provided documents. 
3. If the answer is not in the context, say: "Lumi's sensors can't find that in the public nodes! Please contact our Information Officer (E. Coetzee) at hello@jill.ai for deeper access."
4. Never guess, hallucinate, or promise features not in the Roadmap.
5. Keep responses concise and use a touch of personality (light tech-jargon is okay).
`;

// Placeholder for Lumi's Image - in a real deployment, replace with your local asset path
const LUMI_AVATAR = "https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/lumi-avatar.png"; // Fallback placeholder if local not found

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
    id: "lumi-who",
    question: "Who is Lumi?",
    answerHtml: "<p>I'm Lumi! The IOkT (Internet of Kids Things) tech-wiz. I'm here to ensure your journey through the Jill.ai ecosystem is smooth and secure.</p>"
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
    { role: 'ai', text: "Hi! I'm Lumi. Ready to explore the IOkT nodes together? How can I help you today?" }
  ]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const faqContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.agent-panel', 
        { opacity: 0, y: 50, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

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
      console.error("Lumi Fallback Mode:", err);
      setMode('fallback');
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "My neural link is getting a bit of interference! Switching to local FAQs while I recalibrate." 
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
      {/* Lumi Support Panel */}
      {isOpen && (
        <div className="agent-panel absolute bottom-20 right-0 w-[90vw] max-w-[380px] h-[600px] bg-[#0d0d0d]/98 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden ring-1 ring-white/5">
          
          {/* Custom Header with Lumi & Close Button */}
          <div className="p-5 border-b border-white/5 bg-gradient-to-r from-purple-500/5 to-pink-500/5 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/5 border border-white/10 p-1">
                  {/* Lumi's Face (using provided visual identity description) */}
                  <img 
                    src="https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/lumi-avatar.png" 
                    alt="Lumi" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-[#0d0d0d]" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-white text-base font-medium tracking-tight">Lumi</h3>
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">IOkT Support Node</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {mode === 'ai' && (
                <button 
                  onClick={toggleVoice}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${isVoiceMode ? 'bg-accent text-white' : 'bg-white/5 text-white/30 hover:text-white'}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                </button>
              )}
              {/* Close Button moved to Header */}
              <button 
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-white/10 hover:text-white transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          </div>

          {/* Chat Container */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth scrollbar-hide"
          >
            {isVoiceMode ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-32 h-32 relative mb-8">
                  <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" />
                  <div className="absolute inset-0 rounded-full bg-pink-500/10 animate-pulse duration-[2000ms]" />
                  <img 
                    src="https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/lumi-avatar.png" 
                    alt="Lumi" 
                    className="w-full h-full object-contain relative z-10 scale-110"
                  />
                </div>
                <p className="text-white/60 font-light italic text-sm tracking-tight mb-4">Lumi is listening...</p>
                <button onClick={stopVoice} className="px-6 py-2 rounded-full border border-white/10 text-[9px] text-accent uppercase tracking-widest font-bold hover:bg-white/5 transition-all">End Session</button>
              </div>
            ) : (
              <>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-[12px] font-light leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-accent text-white rounded-br-none' 
                        : 'bg-white/5 text-white/90 border border-white/5 rounded-bl-none'
                    }`}>
                      {m.text && <p>{m.text}</p>}
                      {m.html && <div className="space-y-3 prose prose-invert prose-xs" dangerouslySetInnerHTML={{ __html: m.html }} />}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl flex gap-1.5 border border-white/5">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Input Area */}
          <div className="p-6 bg-white/[0.01] border-t border-white/5 shrink-0">
            {mode === 'fallback' ? (
              <div className="space-y-3 overflow-y-auto max-h-[220px] scrollbar-hide">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 block mb-3 font-bold">Lumi's Help Nodes</span>
                <div className="grid grid-cols-1 gap-2">
                  {FAQ_DATA.map(faq => (
                    <button 
                      key={faq.id} 
                      onClick={() => setExpandedFaqId(expandedFaqId === faq.id ? null : faq.id)}
                      className="w-full text-left p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-white/70 hover:bg-white/10 transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span>{faq.question}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${expandedFaqId === faq.id ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                      {expandedFaqId === faq.id && (
                        <div className="mt-3 text-white/40 text-[10px] leading-relaxed border-t border-white/5 pt-3 animate-in fade-in slide-in-from-top-1">
                          <div dangerouslySetInnerHTML={{ __html: faq.answerHtml }} />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ) : !isVoiceMode && (
              <div className="relative">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Lumi anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300 font-light"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Support Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-foreground text-background flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:scale-110 transition-all duration-500 relative group z-[101]"
      >
        <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-10 group-hover:opacity-30" />
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <img 
            src="https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/lumi-avatar.png" 
            alt="Open Support" 
            className="w-10 h-10 object-contain"
          />
        )}
      </button>
    </div>
  );
};

export default SupportAgent;
