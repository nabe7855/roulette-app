import React from "react";

interface ResultModalProps {
  isOpen: boolean;
  question: string | null;
  onClose: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ isOpen, question, onClose }) => {
  if (!isOpen || !question) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center transform transition-all duration-500 scale-100 animate-rise">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🎯 結果！</h2>
        <p className="text-lg font-medium text-gray-700 mb-6">{question}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all shadow-md hover:shadow-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default ResultModal;
