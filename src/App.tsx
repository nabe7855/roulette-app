import React, { useState } from "react";
import RouletteWheel from "./components/RouletteWheel";
import WinnerModal from "./components/WinnerModal";
import Header from "./components/Header";
import SegmentControl from "./components/SegmentControl";
import SpinButton from "./components/SpinButton";
import { useRoulette } from "./hooks/useRoulette";
import SlotMachine from "./slotComponents/SlotMachine"; // 🎰 追加！

// Appコンポーネント
const App: React.FC = () => {
  // ルーレット状態管理
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

  // 🔘 ルーレット or スロット モード管理
  const [isRouletteMode, setIsRouletteMode] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 font-sans">
      {/* ヘッダー */}
      <Header />

      {/* 🔘 トグルボタン */}
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
          <div className="w-14 h-8 bg-gray-400 peer-focus:outline-none rounded-full peer peer-checked:bg-pink-500 transition"></div>
          <span className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform peer-checked:translate-x-6"></span>
        </label>
        <span className={!isRouletteMode ? "text-pink-400" : "text-gray-500"}>
          🎰 スロット
        </span>
      </div>

      {/* メイン切り替え */}
      {isRouletteMode ? (
        // 🎡 ルーレットモード
        <main className="flex flex-col items-center space-y-6 sm:space-y-8 w-full">
          <RouletteWheel segments={currentSegments} rotation={rotation} />

          <div className="flex flex-col items-center space-y-6 w-full max-w-md">
            <SegmentControl
              numberOfSegments={numberOfSegments}
              onNumberOfSegmentsChange={handleNumberOfSegmentsChange}
              isSpinning={isSpinning}
            />
            <SpinButton onSpin={handleSpin} isSpinning={isSpinning} />
          </div>

          {winner && isModalOpen && (
            <WinnerModal winner={winner} onClose={handleCloseModal} />
          )}
        </main>
      ) : (
        // 🎰 スロットモード
        <main className="flex flex-col items-center space-y-6 sm:space-y-8 w-full">
          <SlotMachine />
        </main>
      )}
    </div>
  );
};

export default App;
