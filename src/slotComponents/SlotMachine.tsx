"use client";

import React, { useState, useEffect, useRef } from "react";
import { QUESTIONS } from "../constants";
import AdminPanel from "../admin/components/AdminDashboard";

/* ================================
 🎀 WinnerModal（結果発表モーダル）
================================ */
type WinnerModalProps = {
  isOpen: boolean;
  question: string;
  onClose: () => void;
};

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, question, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-[85%] max-w-md p-6 text-center border-4 border-pink-400 animate-fadeIn">
        <h2 className="text-3xl font-bold text-pink-500 mb-4 animate-bounce">
          🎀 結果発表 🎀
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
};

/* ================================
 ⚙️ SettingsModal（設定モーダル）
================================ */
type SettingsModalProps = {
  onClose: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
    <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-[95%] max-w-3xl p-6 border-4 border-pink-400 overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold text-pink-600 mb-4 text-center">
        ⚙️ 管理画面設定
      </h2>
      <AdminPanel onLogout={() => console.log("ログアウトしました")} />
      <div className="text-center mt-6">
        <button
          onClick={onClose}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-bold transition-transform hover:scale-105 shadow-md"
        >
          閉じる ✖
        </button>
      </div>
    </div>
  </div>
);

/* ================================
 🎰 SlotMachine本体
================================ */
type SlotMachineProps = {
  questions: string[];
  isSpinning: boolean;
  selectedQuestion: string;
  onStart: () => void;
  disabled: boolean;
};

const SlotMachine: React.FC<SlotMachineProps> = ({
  questions,
  isSpinning,
  selectedQuestion,
  onStart,
  disabled,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState(selectedQuestion);

  useEffect(() => {
    setDisplayQuestion(selectedQuestion);
  }, [selectedQuestion]);

  return (
    <div className="relative min-h-[600px] flex flex-col items-center justify-center p-4 font-sans bg-[#1a1c2b]">
      {/* ⚙️ 設定ボタン */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="absolute top-6 right-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105 z-50"
      >
        ⚙ 設定
      </button>

      {/* 🎰 スロット筐体 */}
      <div
        className="relative mt-24 w-[320px] h-[550px] md:w-[400px] md:h-[650px]
        rounded-3xl border-4 border-[#b40000] shadow-[0_8px_0_#5c0000]
        flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #ff6b6b 0%, #d93a3a 40%, #9c1c1c 100%)",
        }}
      >
        {/* タイトル */}
        <div className="absolute top-6 w-[80%] h-14 bg-gradient-to-b from-yellow-200 to-yellow-500 border-[3px] border-yellow-700 flex items-center justify-center rounded-lg shadow-[inset_0_2px_4px_rgba(255,255,255,0.6)]">
          <span className="text-red-700 text-3xl md:text-4xl font-extrabold drop-shadow-[1px_2px_0_rgba(255,255,255,0.7)] tracking-widest">
            SLOT
          </span>
        </div>

        {/* 質問ウィンドウ */}
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-[92%] h-[130px] md:h-[160px] bg-white/85 rounded-xl p-4 border-4 border-pink-200 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)] flex justify-center items-center overflow-hidden">
            <p
              className={`text-gray-800 text-2xl md:text-3xl font-bold text-center leading-snug transition-transform duration-100 ${
                isSpinning ? "animate-slotSpin" : ""
              }`}
            >
              {displayQuestion}
            </p>
          </div>
        </div>

        {/* レバー */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 right-[-70px] w-12 h-48 flex flex-col items-center cursor-pointer ${
            disabled ? "opacity-50 cursor-not-allowed" : "group"
          }`}
          onClick={!disabled ? onStart : undefined}
        >
          <div className="w-3 h-24 bg-gray-700 rounded-full shadow-inner"></div>
          <div className="w-14 h-14 bg-gradient-to-b from-red-400 to-red-700 rounded-full border-4 border-red-800 shadow-lg absolute -top-1 transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>

      {/* ✅ 結果モーダル */}
      <WinnerModal
        isOpen={isModalOpen}
        question={displayQuestion}
        onClose={() => setIsModalOpen(false)}
      />

      {/* ⚙️ 設定モーダル */}
      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

export default SlotMachine;
