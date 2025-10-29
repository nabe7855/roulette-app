import React from 'react';
import { AppMode } from '../types';

interface ToggleSwitchProps {
  mode: AppMode;
  onToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ mode, onToggle }) => {
  const isRoulette = mode === AppMode.Roulette;

  return (
    <div className="flex items-center space-x-3">
      <span className={`font-bold transition-colors ${!isRoulette ? 'text-blue-600' : 'text-gray-400'}`}>スロット</span>
      <button
        onClick={onToggle}
        className={`relative inline-flex items-center h-7 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 ${isRoulette ? 'bg-pink-400' : 'bg-blue-400'}`}
        aria-label="Toggle mode"
        onKeyDown={(e) => { if(e.key === 'Tab') { e.preventDefault(); onToggle(); }}}
      >
        <span
          className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform ease-in-out duration-200 ${isRoulette ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
      <span className={`font-bold transition-colors ${isRoulette ? 'text-pink-600' : 'text-gray-400'}`}>ルーレット</span>
    </div>
  );
};

export default ToggleSwitch;