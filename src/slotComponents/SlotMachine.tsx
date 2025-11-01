import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS, INITIAL_CREDITS, SPIN_COST } from "../constants";
import AdminPanel from "../admin/components/AdminDashboard";

/* 🎉 結果発表モーダル */
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

/* ⚙️ 設定モーダル */
const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
    <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-[95%] max-w-3xl p-6 border-4 border-blue-500 overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        ⚙️ 管理画面設定
      </h2>
      <AdminPanel onLogout={() => console.log("ログアウトしました")} />
      <div className="text-center mt-6">
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-transform hover:scale-105 shadow-md"
        >
          閉じる ✖
        </button>
      </div>
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const spinInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isSpinning) {
      spinInterval.current = setInterval(() => {
        const randomQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setDisplayQuestion(randomQ);
      }, 100);

      setTimeout(() => {
        if (spinInterval.current) clearInterval(spinInterval.current);
        const finalQ = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
        setDisplayQuestion(finalQ);
        setIsSpinning(false);
        setMessage(finalQ);
        setIsModalOpen(true);
      }, 2000);
    }

    return () => {
      if (spinInterval.current) clearInterval(spinInterval.current);
    };
  }, [isSpinning]);

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
      {/* ⚙️ 設定ボタン */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="absolute top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105 z-50"
      >
        ⚙ 設定
      </button>

      {/* 🎰 スロット筐体 */}
      <div className="relative mt-24 w-[320px] h-[550px] bg-red-700 rounded-3xl border-4 border-red-900 shadow-2xl p-4 flex flex-col items-center justify-center">
        {/* 上部タイトル */}
        <div className="absolute top-6 w-[80%] h-12 bg-yellow-400 border-4 border-yellow-600 flex items-center justify-center rounded-lg shadow-inner">
          <span className="text-red-800 text-3xl font-extrabold">SLOT</span>
        </div>

        {/* 質問ウィンドウ */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[92%] h-[130px] bg-white/80 rounded-xl p-4 border-4 border-gray-400 shadow-inner flex justify-center items-center overflow-hidden">
            <p
              className={`text-gray-900 text-2xl font-bold text-center leading-snug transition-transform duration-100 ${
                isSpinning ? "animate-slotSpin" : ""
              }`}
            >
              {displayQuestion}
            </p>
          </div>
        </div>

        {/* コイン投入口 */}
        <div className="absolute bottom-20 w-24 h-6 bg-gray-700 rounded-md border-2 border-gray-900 shadow-inner flex justify-center items-center">
          <div className="w-16 h-1.5 bg-gray-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]"></div>
        </div>

        {/* コイン山盛り部分 */}
        <div className="absolute bottom-4 w-[220px] h-[80px] bg-gray-800 rounded-xl border-2 border-gray-950 shadow-inner flex flex-wrap justify-center items-end p-2 overflow-hidden">
          {[...Array(70)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gradient-to-t from-gray-400 to-gray-200 rounded-full m-[1px] shadow-[0_0_4px_rgba(255,255,255,0.5)]"
              style={{ transform: `translateY(${Math.random() * 8}px)` }}
            />
          ))}
        </div>

        {/* レバー */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-60px] w-10 h-48 flex flex-col items-center cursor-pointer group"
          onClick={handleSpin}
        >
          <div
            className={`w-14 h-14 bg-red-600 rounded-full border-4 border-red-800 shadow-lg absolute -top-1 transition-transform duration-300 ${
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

      {/* ⚙️ 設定モーダル */}
      {isSettingsOpen && <SettingsModal onClose={() => setIsSettingsOpen(false)} />}
    </div>
  );
};

export default SlotMachine;
