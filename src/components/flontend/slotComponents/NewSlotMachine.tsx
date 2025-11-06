"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "../../../lib/supabaseClient";
import styles from "./NewSlotMachine.module.css";

// --- 型定義 ---
type ReelProps = {
  finalSymbol: string;
  isSpinning: boolean;
  reelIndex: number;
  symbolHeightRem: number;
  questions: string[];
};

type LeverProps = {
  onSpin: () => void;
  isSpinning: boolean;
};

type SymbolDisplayProps = {
  symbol: string;
  symbolHeightRem: number;
};

// 🆕 外部（page.tsx）から受け取るpropsの型を追加
type NewSlotMachineProps = {
  questions: string[];
  isSpinning: boolean;
  selectedQuestion: string;
  onStart: () => void;
  disabled: boolean;
};

// --- コンポーネント群 ---
const SymbolDisplay: React.FC<SymbolDisplayProps> = ({
  symbol,
  symbolHeightRem,
}) => {
  return (
    <div
      className={styles.symbolDisplay}
      style={{ height: `${symbolHeightRem}rem` }}
    >
      <span className={styles.symbol}>{symbol}</span>
    </div>
  );
};

// 🎡 質問がぐるぐる回るリール
const Reel: React.FC<ReelProps> = React.memo(
  ({ finalSymbol, isSpinning, symbolHeightRem, questions }) => {
    const [reelSymbols, setReelSymbols] = useState<string[]>([finalSymbol]);

    useEffect(() => {
      if (isSpinning) {
        const spinInterval = setInterval(() => {
          setReelSymbols((prev) => {
            const shuffled = [...questions].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, 5);
          });
        }, 100);

        return () => clearInterval(spinInterval);
      } else {
        setReelSymbols([finalSymbol]);
      }
    }, [isSpinning, finalSymbol, questions]);

    return (
      <div
        className={styles.reelContainer}
        style={{ height: `${symbolHeightRem}rem` }}
      >
        <div
          className={`${styles.reelInner} ${
            isSpinning ? styles.reelSpinning : ""
          }`}
        >
          {reelSymbols.map((s, i) => (
            <SymbolDisplay
              key={i}
              symbol={s}
              symbolHeightRem={symbolHeightRem}
            />
          ))}
        </div>
      </div>
    );
  }
);
Reel.displayName = "Reel";

// 🎯 レバー
const Lever: React.FC<LeverProps> = ({ onSpin, isSpinning }) => {
  const [pulled, setPulled] = useState(false);

  const handlePull = () => {
    if (isSpinning) return;
    onSpin();
    setPulled(true);
    setTimeout(() => setPulled(false), 500);
  };

  return (
    <div className={styles.leverContainer} onClick={handlePull}>
      <div
        className={`${styles.leverBall} ${
          pulled ? styles.leverPulled : ""
        } ${isSpinning ? styles.leverDisabled : ""}`}
      />
      <div
        className={`${styles.leverRod} ${pulled ? styles.leverRodPulled : ""}`}
      />
    </div>
  );
};

// --- メインコンポーネント ---
export default function NewSlotMachine({
  questions,
  isSpinning,
  selectedQuestion,
  onStart,
  disabled,
}: NewSlotMachineProps) {
  const [reels, setReels] = useState<string[]>([selectedQuestion]);
  const [spinningReels, setSpinningReels] = useState<boolean[]>([false]);
  const [message, setMessage] = useState("スロットを回してね！");
  const [symbolHeightRem, setSymbolHeightRem] = useState(8);

  // --- 画面サイズでリール高さを調整 ---
  useEffect(() => {
    const handleResize = () => {
      setSymbolHeightRem(window.innerWidth < 640 ? 8 : 10);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- スピン処理 ---
  const handleSpin = useCallback(() => {
    if (isSpinning || questions.length === 0) return;

    setMessage("スピン中... 🎰");
    setSpinningReels([true]);

    // ランダムに質問を選択
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];

    setTimeout(() => {
      setReels([selectedQuestion]);
      setSpinningReels([false]);
      setMessage("結果発表 🎉");
    }, 3000);

    onStart(); // 🆕 page.tsx 側に通知
  }, [isSpinning, questions, onStart]);

  return (
    <main className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.body}>
          <div className={styles.topSign}>
            <div className={styles.signText}>{message}</div>
          </div>

          {/* 🎯 質問（リール内容） */}
          <div className={styles.reelArea}>
            {reels.map((symbol, index) => (
              <Reel
                key={index}
                reelIndex={index}
                finalSymbol={symbol}
                isSpinning={spinningReels[index]}
                symbolHeightRem={symbolHeightRem}
                questions={questions}
              />
            ))}
          </div>

          <div className={styles.bottomPanel}>
            <button
              onClick={handleSpin}
              disabled={disabled}
              className={styles.spinButton}
            >
              SPIN
            </button>
          </div>
        </div>

        <Lever onSpin={handleSpin} isSpinning={isSpinning} />
      </div>
    </main>
  );
}
