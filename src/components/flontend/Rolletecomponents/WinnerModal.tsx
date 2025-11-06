"use client";
import React, { useEffect } from "react";
import { Segment } from "../../../types/types";

/** 🧩 Props定義 */
interface WinnerModalProps {
  isOpen?: boolean;
  winner?: Segment | null;
  question?: string;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({
  isOpen = true,
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

  if (!isOpen || (!winner && !question)) return null;

  const displayText = winner
    ? `${winner.label} が当たりました！`
    : `${question}`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[999999]"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 999999,
      }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-center relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #a5f3fc, #38bdf8)",
          boxShadow: "0 0 30px rgba(56,189,248,0.4)",
          color: "#0c4a6e",
          zIndex: 1000000,
        }}
      >
        <h2
          className="text-3xl font-bold mb-4"
          style={{ color: "#075985", textShadow: "0 1px 2px rgba(255,255,255,0.7)" }}
        >
          💎 結果発表 💎
        </h2>

        <p className="text-lg sm:text-xl mb-6 leading-relaxed break-words font-semibold">
          {displayText}
        </p>

        <button
          onClick={onClose}
          className="mt-2 w-full text-white font-bold py-3 rounded-lg text-lg shadow-lg focus:outline-none transition-all duration-300 transform hover:scale-105"
          style={{
            background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
            boxShadow: "0 4px 10px rgba(14,165,233,0.4)",
          }}
        >
          閉じる ✖
        </button>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default WinnerModal;
