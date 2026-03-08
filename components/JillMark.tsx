import React from 'react';

interface JillMarkProps {
  className?: string;
  compact?: boolean;
}

const JillMark: React.FC<JillMarkProps> = ({ className = '', compact = false }) => {
  return (
    <span className={`inline-flex items-start leading-none ${className}`}>
      <span className={`jill-mark ${compact ? 'text-2xl md:text-3xl' : 'text-[clamp(3.4rem,10vw,9rem)]'}`}>
        Jill
      </span>
      <sup className={`jill-mark-ai ${compact ? 'text-[0.55em] mt-1.5' : 'text-[0.3em] mt-4 md:mt-6'}`}>
        AI
      </sup>
    </span>
  );
};

export default JillMark;
