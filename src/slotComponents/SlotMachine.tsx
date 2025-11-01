import React, { useState, useEffect, useRef, useCallback } from "react";
import Reel from "./Reel";
import type { Symbol } from "../types";
import { QUESTIONS, INITIAL_CREDITS, SPIN_COST } from "../constants";

interface SlotMachineProps {
  questions: string[];
  isSpinning: boolean;
  selectedQuestion: string | null;
  onStart: () => void;
  disabled: boolean;
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  questions,
  isSpinning,
  selectedQuestion,
  onStart,
  disabled,
}) => {
  const [reels, setReels] = useState<Symbol[]>([QUESTIONS[0]]);
  const [credits, setCredits] = useState<number>(INITIAL_CREDITS);
  const [message, setMessage] = useState<string>("Pull the lever for a question!");
  const [leverPulled, setLeverPulled] = useState<boolean>(false);
  const initialRender = useRef(true);

  const checkWin = useCallback(() => {
    if (credits - SPIN_COST <= 0) {
      setMessage("Game Over! Refresh to play again.");
      setCredits(0);
    } else {
      setMessage(selectedQuestion ? selectedQuestion : "Here is your question!");
    }
  }, [credits, selectedQuestion]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!isSpinning) {
      checkWin();
    }
  }, [isSpinning, checkWin]);

  const handleSpin = () => {
    if (isSpinning || disabled) return;
    setLeverPulled(true);
    onStart();
    setTimeout(() => setLeverPulled(false), 500);
  };

  return (
    <div className="relative min-h-[600px] flex flex-col items-center justify-center p-4 font-sans">
      {/* 💰 残高・メッセージ */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white p-4 rounded-lg text-center z-50">
        <div className="text-yellow-400 text-2xl font-bold mb-1">Credits: {credits}</div>
        <div className="text-lg h-6">{message}</div>
      </div>

      {/* 🎰 スロット筐体 */}
      <div className="relative mt-24 w-[320px] h-[550px] md:w-[400px] md:h-[650px] bg-red-700 rounded-3xl border-4 border-red-900 shadow-2xl p-4 flex flex-col items-center justify-center">
        {/* 上部パネル */}
        <div className="absolute top-6 w-[80%] h-12 bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center rounded-lg shadow-inner">
          <span className="text-red-800 text-3xl md:text-4xl font-extrabold">SLOT</span>
        </div>

       {/* 🎡 質問表示ウィンドウ（パターン③・拡張版） */}
<div className="absolute inset-0 flex justify-center items-center">
  <div className="w-[92%] h-[130px] md:h-[160px] bg-white/80 rounded-xl p-4 md:p-6 border-4 border-gray-400 shadow-inner flex justify-center items-center">
    <p
      className={`text-gray-900 text-2xl md:text-3xl font-bold text-center leading-snug transition-all duration-700 ${
        isSpinning ? "opacity-0 scale-90" : "opacity-100 scale-100"
      }`}
    >
      {selectedQuestion || "?"}
    </p>
  </div>
</div>

        {/* スタートレバー */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-60px] md:right-[-80px] w-10 md:w-12 h-48 md:h-56 flex flex-col items-center cursor-pointer group"
          onClick={handleSpin}
        >
          <div
            className={`w-14 h-14 md:w-16 md:h-16 bg-red-600 rounded-full border-4 border-red-800 shadow-lg absolute -top-1 transition-transform duration-300 ${
              leverPulled ? "translate-y-20" : "group-hover:scale-110"
            }`}
          />
          <div
            className={`w-full h-full bg-gray-400 border-4 border-gray-500 rounded-lg transition-transform duration-300 origin-top-left ${
              leverPulled ? "rotate-45" : "group-hover:rotate-12"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
