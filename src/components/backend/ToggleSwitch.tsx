
import React from 'react';
import { AppMode } from '../../types/types';

interface ToggleSwitchProps {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ mode, setMode }) => {
  const isRoulette = mode === AppMode.Roulette;

  return (
    <div className="relative flex w-full max-w-xs mx-auto bg-gray-800 rounded-full p-1 cursor-pointer select-none">
      <span
        className={`absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-indigo-600 rounded-full transition-transform duration-300 ease-in-out transform ${
          isRoulette ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden="true"
      ></span>
      <button
        onClick={() => setMode(AppMode.Roulette)}
        className={`relative z-10 w-1/2 py-2 text-center rounded-full transition-colors duration-300 ${
          isRoulette ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        ルーレット
      </button>
      <button
        onClick={() => setMode(AppMode.Slot)}
        className={`relative z-10 w-1/2 py-2 text-center rounded-full transition-colors duration-300 ${
          !isRoulette ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
      >
        スロット
      </button>
    </div>
  );
};

export default ToggleSwitch;
