import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS, INITIAL_CREDITS, SPIN_COST } from "../constants";

/* 🎉 結果発表モーダル（フェードインつき） */
const WinnerModal: React.FC<{ question: string; onClose: () => void }> = ({
  question,
  onClose,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
    <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-[85%] max-w-md p-6 text-center border-4 border-pink-500 animate-fadeIn">
      <h2 className="text-3xl font-bold text-pink-600 mb-4 animate-bounce">
        🎉 結果発表 🎉
      </h2>
      <p className="text-2xl font-semibold mb-6 leading-snug">{question}</p>
      <button
        onClick={onClose}
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-bold transition-transform hover:scale-105 shadow-md"
      >
        OK 💫
      </button>
    </div>
  </div>
);

const SlotMachine: React.FC = () => {
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [message, setMessage] = useState("Pull the lever for a question!");
  const [leverPulled, setLeverPulled] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState("?");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const spinInterval = useRef<NodeJS.Timeout | null>(null);

  /* 🎯 スピン処理 */
  useEffect(() => {
    if (isSpinning) {
      // ランダムに質問を切り替える
      spinInterval.current = setInterval(() => {
        const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setDisplayQuestion(randomQ);
      }, 100);

      // 2秒後にストップ
      setTimeout(() => {
        if (spinInterval.current) clearInterval(spinInterval.current);
        const finalQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setDisplayQuestion(finalQ);
        setIsSpinning(false);
        setMessage(finalQ);
        setIsModalOpen(true);
      }, 2000);
    }

    // クリーンアップ
    return () => {
      if (spinInterval.current) clearInterval(spinInterval.current);
    };
  }, [isSpinning]);

  /* 🎰 レバーを引いた時 */
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
          <span className="text-red-800 text-3xl md:text-4xl font-extrabold">
            SLOT
          </span>
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
        <div className="absolute bottom-16 w-24 h-6 bg-gray-700 rounded-md border-2 border-gray-900 shadow-inner flex justify-center items-center">
          <div className="w-16 h-1.5 bg-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"></div>
        </div>

        {/* 💰 コイン排出口 */}
        <div className="absolute bottom-2 w-[140px] h-[28px] bg-gray-800 rounded-xl border-2 border-gray-950 shadow-inner flex flex-col justify-end items-center">
          <div className="w-20 h-2 bg-yellow-400 rounded-full shadow-[0_0_8px_rgba(255,255,0,0.6)]"></div>
          <div className="text-yellow-400 text-xs font-semibold mt-1">
            COIN
          </div>
        </div>

        {/* 🎯 レバー */}
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

      {/* ✅ 結果発表モーダル */}
      {isModalOpen && (
        <WinnerModal
          question={displayQuestion}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SlotMachine;
