import React from "react";

interface WinnerModalProps {
  question: string;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ question, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
      <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-[85%] max-w-md p-6 text-center border-4 border-pink-500">
        <h2 className="text-3xl font-bold text-pink-600 mb-4 animate-bounce">
          🎉 結果発表 🎉
        </h2>
        <p className="text-2xl font-semibold mb-6 leading-snug">
          {question}
        </p>
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

export default WinnerModal;
