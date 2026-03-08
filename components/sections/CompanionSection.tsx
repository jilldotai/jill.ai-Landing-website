import React from 'react';
import JillMark from '../JillMark';

const CompanionSection: React.FC = () => {
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-5xl mx-auto px-6 md:px-20 space-y-14 md:space-y-20 text-3xl md:text-6xl font-light tracking-tight">
        <p className="fade-step">Artificial intelligence can amplify the worst of humanity.</p>
        <p className="fade-step text-foreground/75">Or the best of it.</p>
        <p className="fade-step">In the wrong hands, AI becomes a weapon.</p>
        <p className="fade-step text-[#90f2ff]">In the right hands, it becomes a guardian.</p>
      </div>
      <div className="mt-20 text-center px-6">
        <JillMark className="justify-center" compact />
        <p className="mt-5 text-foreground/65 text-sm md:text-lg tracking-wide">
          Intelligence empowered by Integrity and Empathy
        </p>
      </div>
    </section>
  );
};

export default CompanionSection;
