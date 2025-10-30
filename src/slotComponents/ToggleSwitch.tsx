import React from "react";
import { AppMode } from "../app/types";

type Props = {
  mode: AppMode;
  onToggle: () => void;
};

export default function ToggleSwitch({ mode, onToggle }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`font-bold ${
          mode === AppMode.Roulette ? "text-pink-500" : "text-gray-400"
        }`}
      >
        🎡 ルーレット
      </span>
      <button
        onClick={onToggle}
        className="relative w-14 h-7 bg-gray-300 rounded-full transition-all"
      >
        <span
          className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-all duration-300 ${
            mode === AppMode.Slot ? "translate-x-7 bg-pink-500" : ""
          }`}
        />
      </button>
      <span
        className={`font-bold ${
          mode === AppMode.Slot ? "text-pink-500" : "text-gray-400"
        }`}
      >
        🎰 スロット
      </span>
    </div>
  );
}
