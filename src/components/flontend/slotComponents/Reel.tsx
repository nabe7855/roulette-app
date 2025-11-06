import React, { useState, useEffect } from 'react';
import type { Symbol } from '../../../types/types';
import { QUESTIONS } from '../../../constants';

interface ReelProps {
  finalSymbol: Symbol;
  isSpinning: boolean;
  delay: number;
}

const Reel: React.FC<ReelProps> = ({ finalSymbol, isSpinning, delay }) => {
  const [displaySymbol, setDisplaySymbol] = useState<Symbol>(QUESTIONS[0]);

  useEffect(() => {
    if (isSpinning) {
      const spinInterval = setInterval(() => {
        setDisplaySymbol(QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);
      }, 75);

      const stopTimeout = setTimeout(() => {
        clearInterval(spinInterval);
        setDisplaySymbol(finalSymbol);
      }, 1000 + delay);

      return () => {
        clearInterval(spinInterval);
        clearTimeout(stopTimeout);
      };
    }
  }, [isSpinning, finalSymbol, delay]);

  return (
    <div className="bg-white/90 w-full h-32 md:h-40 flex items-center justify-center shadow-inner border-2 border-gray-400 rounded-lg p-4">
      <span
        className={`text-2xl md:text-3xl text-center font-semibold transition-all duration-300 ease-in-out ${
          isSpinning ? 'opacity-75 blur-sm' : 'opacity-100 blur-0'
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {displaySymbol}
      </span>
    </div>
  );
};

export default Reel;
