"use client";
import React, { useState } from "react";
import RouletteWheel from "./components/RouletteWheel";
import WinnerModal from "./components/WinnerModal";
import Header from "./components/Header";
import SegmentControl from "./components/SegmentControl";
import SpinButton from "./components/SpinButton";
import SlotMachine from "./slotComponents/SlotMachine";
import { useRoulette } from "./hooks/useRoulette";

const App: React.FC = () => {
  const {
    rotation,
    isSpinning,
    winner,
    isModalOpen,
    numberOfSegments,
    currentSegments,
    handleSpin,
    handleCloseModal,
    handleNumberOfSegmentsChange,
  } = useRoulette();

  const [isRouletteMode, setIsRouletteMode] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 space-y-8 font-sans">
      <Header />

      {/* 🎛 モード切替トグル */}
      <div className="flex items-center gap-3 mb-4">
        <span className={isRouletteMode ? "text-pink-400" : "text-gray-500"}>
          🎡 ルーレット
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!isRouletteMode}
            onChange={() => setIsRouletteMode(!isRouletteMode)}
            className="sr-only peer"
          />
          <div className="w-14 h-8 bg-gray-400 rounded-full peer-checked:bg-pink-500 transition"></div>
          <span className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6"></span>
        </label>
        <span className={!isRouletteMode ? "text-pink-400" : "text-gray-500"}>
          🎰 スロット
        </span>
      </div>

      {/* 🎡 ルーレットモード or 🎰 スロットモード */}
      {isRouletteMode ? (
        <main className="flex flex-col items-center space-y-8 w-full">
          <RouletteWheel segments={currentSegments} rotation={rotation} />

          <div className="flex flex-col items-center space-y-6 w-full max-w-md">
            <SegmentControl
              numberOfSegments={numberOfSegments}
              onNumberOfSegmentsChange={handleNumberOfSegmentsChange}
              isSpinning={isSpinning}
            />
            <SpinButton onSpin={handleSpin} isSpinning={isSpinning} />
          </div>

          {/* ✅ モーダル表示 */}
          {winner && isModalOpen && (
            <WinnerModal winner={winner} onClose={handleCloseModal} />
          )}
        </main>
      ) : (
        <main className="flex flex-col items-center justify-center">
          <SlotMachine />
        </main>
      )}
    </div>
  );
};

export default App;
