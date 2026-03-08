import React from 'react';

const roles = ['parents', 'developers', 'partners', 'supporters'];

const MovementSection: React.FC = () => {
  return (
    <section className="py-32 md:py-40 border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-5xl mx-auto px-6 md:px-20 text-center">
        <p className="text-3xl md:text-6xl font-light tracking-tight leading-tight">
          Protecting children online<br />is not a solo mission.
        </p>
        <p className="mt-10 text-foreground/65 text-lg md:text-2xl leading-relaxed">
          It takes parents. Developers. Researchers. Companies. Communities.
        </p>
        <p className="mt-6 text-2xl md:text-4xl text-[#90f2ff] italic font-light">It takes a village.</p>

        <h3 className="mt-16 text-xs uppercase tracking-[0.45em] text-foreground/60">Join the mission</h3>
        <div className="mt-6 flex flex-wrap justify-center gap-3 md:gap-4">
          {roles.map((role) => (
            <a
              key={role}
              href="#contact"
              className="px-5 py-3 rounded-full border border-white/20 text-xs uppercase tracking-[0.2em] hover:border-[#8ee7ff] hover:text-[#8ee7ff] transition-all duration-500"
            >
              {role}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MovementSection;
