"use client";
import React, { useEffect } from "react";
import { Segment } from "../types";

/** 🧩 Props定義
 * どちらの呼び出し方（ルーレット or スロット）でも使えるように統一！
 */
interface WinnerModalProps {
  isOpen?: boolean;        // モーダルを開くフラグ（スロット用など）
  winner?: Segment | null; // ルーレット結果（Segment型）
  question?: string;       // スロット結果（文字列）
  onClose: () => void;     // モーダルを閉じる処理
}

const WinnerModal: React.FC<WinnerModalProps> = ({
  isOpen = true, // デフォルトtrueにしておく
  winner,
  question,
  onClose,
}) => {
  // Escapeキーで閉じる機能
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // 表示条件チェック
  if (!isOpen || (!winner && !question)) return null;

  // 表示するテキストを動的に切り替え
  const displayText = winner
    ? `${winner.label} が当たりました！`
    : `${question}`;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center relative transform animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          🎯 結果発表 🎯
        </h2>

        <p className="text-lg sm:text-xl text-gray-700 mb-6 break-words leading-relaxed">
          <span className="font-semibold text-emerald-600">{displayText}</span>
        </p>

        <button
          onClick={onClose}
          className="mt-2 w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold py-3 rounded-lg text-lg shadow-lg hover:from-pink-600 hover:to-rose-700 focus:outline-none focus:ring-4 focus:ring-pink-300 transition-all duration-300 transform hover:scale-105"
        >
          閉じる ✖
        </button>

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
