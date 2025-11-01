"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Reel from "../slotComponents/Reel";
import { QUESTIONS, INITIAL_CREDITS, SPIN_COST } from "../constants";

/* 💬 上部インフォパネル */
const InfoPanel: React.FC<{ credits: number; message: string }> = ({ credits, message }) => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 md:w-auto bg-black/50 text-white p-4 rounded-lg shadow-lg text-center backdrop-blur-sm z-50">
    <div className="text-yellow-400 text-2xl font-bold mb-1">Credits: {credits}</div>
    <div className="text-lg h-6">{message}</div>
  </div>
);

/* 🪙 コインの描画 */
const Coin: React.FC = () => (
  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full shadow-md border-2 border-gray-500" />
);

/* 🎰 スロットマシン本体 */
const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[]>([QUESTIONS[0]]);
  const [spinning, setSpinning] = useState(false);
  const [credits, setCredits] = useState(INITIAL_CREDITS);
  const [message, setMessage] = useState("Pull the lever for a question!");
  const [leverPulled, setLeverPulled] = useState(false);
  const initialRender = useRef(true);

  /* 🧩 結果チェック */
  const checkWin = useCallback(() => {
    if (credits - SPIN_COST <= 0) {
      setMessage("Game Over! Refresh to play again.");
      setCredits(0);
    } else {
      setMessage("Here is your question!");
    }
  }, [credits]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!spinning) checkWin();
  }, [spinning, checkWin]);

  /* 🎯 スピン処理 */
  const handleSpin = () => {
    if (spinning || credits < SPIN_COST) {
      if (credits < SPIN_COST) setMessage("Not enough credits!");
      return;
    }

    setSpinning(true);
    setLeverPulled(true);
    setCredits((c) => c - SPIN_COST);
    setMessage("Thinking of a question...");

    const newReels = reels.map(
      () => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
    );

    setTimeout(() => setReels(newReels), 500);
    setTimeout(() => setSpinning(false), 2000);
    setTimeout(() => setLeverPulled(false), 500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden font-sans bg-[#0f172a]">
      <InfoPanel credits={credits} message={message} />

      {/* 🎰 スロット筐体 */}
      <div className="relative mt-24 md:mt-0">
        {/* ✅ justify-between → justify-center に修正 */}
        <div className="relative w-[320px] h-[550px] md:w-[400px] md:h-[650px] bg-red-700 rounded-3xl border-4 border-red-900 shadow-2xl p-4 flex flex-col items-center justify-center z-10">

          {/* 上部タイトルパネル */}
          <div className="absolute top-6 w-[80%] h-12 bg-red-500 border-4 border-red-700 flex items-center justify-center">
            <span className="text-yellow-300 text-4xl font-extrabold tracking-widest" style={{ textShadow: "2px 2px 0px #9A3412" }}>
              SLOT
            </span>
          </div>

          {/* 🎡 質問表示ウィンドウ（完全中央） */}
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[85%] bg-gray-600/50 rounded-lg p-2 md:p-4 border-4 border-gray-400 shadow-inner flex justify-center items-center">
              <p
                className={`text-white text-2xl md:text-3xl font-bold text-center transition-all duration-700 ${
                  spinning ? "opacity-0 scale-90" : "opacity-100 scale-100"
                }`}
              >
                {reels[0] || "?"}
              </p>
            </div>
          </div>

          {/* 下部操作パネル */}
          <div className="absolute bottom-0 w-full h-16 bg-yellow-400 rounded-b-3xl border-t-4 border-yellow-600 shadow-inner flex items-center justify-between px-6">
            <div className="w-10 h-10 bg-red-600 rounded-full border-4 border-red-800 shadow-md"></div>
            <div className="flex gap-4">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
            <div className="w-12 h-6 bg-gray-400 rounded-sm border-2 border-gray-500 shadow-inner"></div>
          </div>

          {/* コイントレイ */}
          <div className="absolute bottom-20 w-full h-24 bg-gray-800 rounded-xl shadow-inner border-4 border-black/50 p-2 flex items-end justify-center">
            <div className="flex flex-wrap items-center justify-center gap-1 opacity-80">
              {[...Array(10)].map((_, i) => (
                <Coin key={i} />
              ))}
            </div>
          </div>
        </div>

        {/* 🎯 レバー */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-60px] md:right-[-80px] w-10 md:w-12 h-48 md:h-56 flex flex-col items-center z-0 cursor-pointer group"
          onClick={handleSpin}
        >
          <div
            className={`w-14 h-14 md:w-16 md:h-16 bg-red-600 rounded-full border-4 border-red-800 shadow-lg absolute -top-1 transition-transform duration-300 ease-in-out ${
              leverPulled ? "translate-y-20" : "group-hover:scale-110"
            }`}
          ></div>
          <div
            className={`w-full h-full bg-gray-400 border-4 border-gray-500 rounded-lg transition-transform duration-300 ease-in-out origin-top-left ${
              leverPulled ? "rotate-45" : "group-hover:rotate-12"
            }`}
          ></div>
          <div className="absolute top-0 left-[-30px] md:left-[-40px] w-10 h-24 md:w-12 md:h-28 bg-yellow-500 rounded-lg border-4 border-yellow-600 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default SlotMachine;
