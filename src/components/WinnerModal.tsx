"use client";
import React, { useEffect } from "react";
import { Segment } from "../types"; // ← ルーレットの型を読み込む

// 💬 Props型定義：App.tsxで渡してる内容に合わせて修正
interface WinnerModalProps {
  winner: Segment;      // 当選したセグメント（例：ラベルや色など）
  onClose: () => void;  // モーダルを閉じる関数
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  // 🔄 Escapeキーで閉じられるようにする
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // winnerが存在しない時は何も表示しない
  if (!winner) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      {/* モーダル本体 */}
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center relative transform animate-scale-in"
        onClick={(e) => e.stopPropagation()} // モーダル外クリックで閉じる
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">🎯 結果発表 🎯</h2>

        {/* 🎡 当選セグメント名を表示 */}
        <p className="text-lg sm:text-xl text-gray-700 mb-6 break-words leading-relaxed">
          <span className="font-semibold text-emerald-600">{winner.label}</span> が当たりました！
        </p>

        <button
          onClick={onClose}
          className="mt-2 w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105"
        >
          閉じる
        </button>

        {/* ✨アニメーション効果 */}
        <style>{`
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in {
            animation: scale-in 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default WinnerModal;
