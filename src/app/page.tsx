"use client";
import React, { useState } from "react";
import RouletteWheel from "../components/flontend/Rolletecomponents/RouletteWheel";
import Header from "../components/flontend/Rolletecomponents/Header";
import SegmentControl from "../components/flontend/Rolletecomponents/SegmentControl";
import WinnerModal from "../components/flontend/Rolletecomponents/WinnerModal";
import SpinButton from "../components/flontend/Rolletecomponents/SpinButton";
import SlotMachine from "../components/flontend/slotComponents/NewSlotMachine";
import { useRouter } from "next/navigation";
import { Segment } from "../types/types"; // ✅ 型をimport
import styles from "./page.module.css";

const Page: React.FC = () => {
  const [isRouletteMode, setIsRouletteMode] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<Segment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberOfSegments, setNumberOfSegments] = useState(8);

  const router = useRouter();

  // 🎡 スピン処理
  const handleSpin = (): void => {
    if (isSpinning) return;
    setIsSpinning(true);
    setIsModalOpen(false);

    const randomRotation = 360 * 5 + Math.floor(Math.random() * 360);
    setRotation(randomRotation);

    setTimeout(() => {
      setIsSpinning(false);
    }, 6000);
  };

  // 🎯 回転完了時（RouletteWheelから結果を受け取る）
  const handleFinished = (winnerSegment: Segment): void => {
    setWinner(winnerSegment);
    setIsModalOpen(true);
  };

  // ⚙️ セグメント数変更
  const handleNumberOfSegmentsChange = (value: number): void => {
    setNumberOfSegments(value);
  };

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

      {/* 🎡 ルーレットモード */}
      {isRouletteMode ? (
        <main className={styles.main}>
          <RouletteWheel
            rotation={rotation}
            isSpinning={isSpinning}
            onFinished={handleFinished} // ✅ ここで結果を親へ通知
            openSettings={() => router.push("/admin")}
          />

          <div className={styles.controlArea}>
            <SegmentControl
              numberOfSegments={numberOfSegments}
              onNumberOfSegmentsChange={handleNumberOfSegmentsChange}
              isSpinning={isSpinning}
            />
            <SpinButton onSpin={handleSpin} isSpinning={isSpinning} />
          </div>

         {/* 🎯 結果モーダル */}
{isModalOpen && winner && (
  <WinnerModal
    isOpen={true} // ✅ 明示的に true を渡す（型エラー防止）
    winner={winner}
    onClose={() => setIsModalOpen(false)}
  />
)}

        </main>
      ) : (
        // 🎰 スロットモード
        <main className={styles.main}>
          <SlotMachine
            questions={[
              "好きな食べ物は？",
              "最近ハマってることは？",
              "子どもの頃の夢は？",
            ]}
            isSpinning={isSpinning}
            selectedQuestion={winner ? winner.label : ""}
            onStart={handleSpin}
            disabled={isSpinning}
          />
          <button
            onClick={() => router.push("/admin")}
            className={styles.settingsButton}
          >
            ⚙ 設定
          </button>
        </main>
      )}
    </div>
  );
};

export default Page;
