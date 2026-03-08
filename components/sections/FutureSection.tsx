import React from 'react';
import JillMark from '../JillMark';

const FutureSection: React.FC = () => {
  return (
    <section className="py-32 md:py-44">
      <div className="max-w-5xl mx-auto px-6 md:px-20 text-center space-y-16">
        <p className="text-3xl md:text-6xl font-light tracking-tight">IOkT is only the beginning.</p>
        <p className="text-2xl md:text-5xl font-light tracking-tight text-foreground/80">More experiments are already underway.</p>
        <p className="text-2xl md:text-5xl font-light tracking-tight">
          The future of the internet<br />should belong to the next generation.
        </p>
        <div className="pt-10">
          <JillMark compact className="justify-center" />
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
