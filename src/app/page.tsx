"use client";
import React, { useState } from "react";
import RouletteWheel from "../components/RouletteWheel";
import WinnerModal from "../components/WinnerModal";
import Header from "../components/Header";
import SegmentControl from "../components/SegmentControl";
import SpinButton from "../components/SpinButton";
import SlotMachine from "../slotComponents/SlotMachine";
import SettingsModal from "../components/SettingsModal";
import { useRoulette } from "../hooks/useRoulette";
import styles from "./page.module.css";

const Page: React.FC = () => {
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Header />

      {/* 🎛 モード切替 */}
      <div className={styles.modeToggle}>
        <span
          className={
            isRouletteMode ? styles.activeLabel : styles.inactiveLabel
          }
        >
          🎡 ルーレット
        </span>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={!isRouletteMode}
            onChange={() => setIsRouletteMode(!isRouletteMode)}
          />
          <span className={styles.slider}></span>
        </label>

        <span
          className={
            !isRouletteMode ? styles.activeLabel : styles.inactiveLabel
          }
        >
          🎰 スロット
        </span>
      </div>

      {/* 🎡 ルーレット or 🎰 スロット */}
      {isRouletteMode ? (
        <main className={styles.main}>
          <RouletteWheel
            segments={currentSegments}
            rotation={rotation}
            openSettings={() => setIsSettingsOpen(true)}
          />
          <div className={styles.controlArea}>
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
       <main className={styles.main}>
  <SlotMachine
    questions={["好きな食べ物は？",
    "最近ハマってることは？",
    "子どもの頃の夢は？"]}  // ← 仮のデータ（後で本物に差し替える）
    isSpinning={isSpinning}
    selectedQuestion={winner ? winner.label : ""}
    onStart={handleSpin}
    disabled={isSpinning}
  />
  <button
    onClick={() => setIsSettingsOpen(true)}
    className={styles.settingsButton}
  >
    ⚙ 設定
  </button>
</main>

      )}

      {isSettingsOpen && (
        <SettingsModal onClose={() => setIsSettingsOpen(false)} />
      )}
    </div>
  );
};

export default Page;
