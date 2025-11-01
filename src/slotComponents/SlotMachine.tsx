import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS, INITIAL_CREDITS, SPIN_COST } from "../constants";

const SlotMachine: React.FC = () => {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [message, setMessage] = useState("Pull the lever for a question!");
  const [leverPulled, setLeverPulled] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState("?");
  const spinInterval = useRef<NodeJS.Timeout | null>(null);

  // 🎯 スピン終了後のチェック
  useEffect(() => {
    if (isSpinning) {
      // ランダムで質問を高速切り替え
      spinInterval.current = setInterval(() => {
        const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setDisplayQuestion(randomQ);
      }, 100);

      // 2秒後に停止
      setTimeout(() => {
        if (spinInterval.current) clearInterval(spinInterval.current);
        const finalQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setDisplayQuestion(finalQ);
        setIsSpinning(false);
        setMessage(finalQ);
      }, 2000);
    }

    return () => {
      if (spinInterval.current) clearInterval(spinInterval.current);
    };
  }, [isSpinning]);

  // 🎰 スピン開始
  const handleSpin = () => {
    if (isSpinning || credits <= 0) return;

    setLeverPulled(true);
    setIsSpinning(true);
    setCredits((prev) => prev - SPIN_COST);
    setMessage("Spinning...");
    setTimeout(() => setLeverPulled(false), 500);
  };

  return (
    <div className="relative min-h-[600px] flex flex-col items-center justify-center p-4 font-sans bg-[#0f172a]">
    

      {/* 🎰 スロット筐体 */}
      <div className="relative mt-24 w-[320px] h-[550px] md:w-[400px] md:h-[650px] bg-red-700 rounded-3xl border-4 border-red-900 shadow-2xl p-4 flex flex-col items-center justify-center">
        {/* 上部パネル */}
        <div className="absolute top-6 w-[80%] h-12 bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center rounded-lg shadow-inner">
          <span className="text-red-800 text-3xl md:text-4xl font-extrabold">SLOT</span>
        </div>

        {/* 🎡 質問表示ウィンドウ */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[92%] h-[130px] md:h-[160px] bg-white/80 rounded-xl p-4 md:p-6 border-4 border-gray-400 shadow-inner flex justify-center items-center overflow-hidden">
            <p
              className={`text-gray-900 text-2xl md:text-3xl font-bold text-center leading-snug transition-transform duration-100 ${
                isSpinning ? "animate-slotSpin" : ""
              }`}
            >
              {displayQuestion}
            </p>
          </div>
        </div>

        {/* 🪙 コイン投入口 */}
        <div className="absolute bottom-6 w-24 h-6 bg-gray-700 rounded-md border-2 border-gray-900 shadow-inner flex justify-center items-center">
          <div className="w-16 h-1.5 bg-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"></div>
        </div>

        {/* 🎯 スタートレバー */}
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
