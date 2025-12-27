import React, { useState } from 'react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thank you for reaching out. We will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
      {/* Decorative blurred background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <div className="group relative overflow-hidden bg-foreground/5 backdrop-blur-xl rounded-[2.5rem] border border-foreground/10 p-8 md:p-20 transition-all duration-700 hover:border-accent/40 hover:shadow-[0_0_80px_-20px_rgba(212,141,93,0.3)]">
          
          <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative z-10">
            
            {/* Left Side: Copy */}
            <div className="md:w-1/3">
              <span className="text-[10px] uppercase tracking-[0.5em] text-accent font-bold mb-6 block">Communication</span>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-foreground mb-8">Get in Touch.</h2>
              <p className="text-foreground/60 font-light leading-relaxed mb-10">
                Interested in partnering or learning more about our roadmap? Our team is ready to facilitate your integration into the future of intelligence.
              </p>
              
              <div className="space-y-4 pt-8 border-t border-foreground/5">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-medium">Inquiry Response: &lt; 24h</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/40"></div>
                  <span className="text-[10px] uppercase tracking-widest text-foreground/40 font-medium">Direct: hello@jill.ai</span>
                </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Name */}
                  <div className="group/field relative">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-foreground/10 py-3 px-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:bg-accent/5 focus:shadow-[0_10px_20px_-10px_rgba(212,141,93,0.15)] hover:bg-foreground/[0.02] transition-all duration-500 font-light text-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700 group-focus-within/field:w-full" />
                  </div>

                  {/* Email */}
                  <div className="group/field relative">
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-foreground/10 py-3 px-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:bg-accent/5 focus:shadow-[0_10px_20px_-10px_rgba(212,141,93,0.15)] hover:bg-foreground/[0.02] transition-all duration-500 font-light text-lg"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700 group-focus-within/field:w-full" />
                  </div>
                </div>

                {/* Subject */}
                <div className="group/field relative">
                  <label className="text-[10px] uppercase tracking-widest text-foreground/30 mb-2 block font-bold">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-foreground/10 py-3 px-2 text-foreground focus:outline-none focus:border-accent hover:bg-foreground/[0.02] focus:bg-accent/5 transition-all duration-500 font-light text-lg appearance-none cursor-pointer"
                  >
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Investor Relations">Investor Relations</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="absolute bottom-4 right-2 pointer-events-none text-foreground/20">↓</div>
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700 group-focus-within/field:w-full" />
                </div>

                {/* Message */}
                <div className="group/field relative">
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-foreground/10 py-3 px-2 text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent focus:bg-accent/5 focus:shadow-[0_10px_20px_-10px_rgba(212,141,93,0.15)] hover:bg-foreground/[0.02] transition-all duration-500 font-light text-lg resize-none"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700 group-focus-within/field:w-full" />
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="group relative px-12 py-5 bg-foreground text-background rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:-translate-y-1 hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 text-[10px] font-bold uppercase tracking-[0.4em]">Initialize Transmission</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;