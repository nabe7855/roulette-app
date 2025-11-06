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
  questions: string[]; // ← 追加
};

type LeverProps = {
  onSpin: () => void;
  isSpinning: boolean;
};

type SymbolDisplayProps = {
  symbol: string;
  symbolHeightRem: number;
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
        // スピン中は質問をぐるぐる表示
        const spinInterval = setInterval(() => {
          setReelSymbols((prev) => {
            const shuffled = [...questions].sort(() => Math.random() - 0.5);
            return shuffled.slice(0, 5); // ← 表示する数（5個程度）
          });
        }, 100); // ← 0.1秒ごとに切り替え（スピード調整可）

        return () => clearInterval(spinInterval);
      } else {
        // 停止後は最終結果だけ表示
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
export default function NewSlotMachine() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [reels, setReels] = useState<string[]>([""]);
  const [spinningReels, setSpinningReels] = useState<boolean[]>([false]);
  const [message, setMessage] = useState("スロットを回してね！");
  const [isSpinning, setIsSpinning] = useState(false);
  const [symbolHeightRem, setSymbolHeightRem] = useState(8);

  // --- Supabaseから質問を取得 ---
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("question_text")
        .eq("type", "slot");

      if (error) {
        console.error("質問データの取得に失敗:", error);
        return;
      }

      if (data && data.length > 0) {
        const slotQuestions = data.map(
          (item: { question_text: string }) => item.question_text
        );
        setQuestions(slotQuestions);
        setReels([slotQuestions[0]]);
      }
    };
    fetchQuestions();
  }, []);

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

    setIsSpinning(true);
    setMessage("スピン中... 🎰");
    setSpinningReels([true]);

    // ランダムに質問を選択
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestion = questions[randomIndex];

    setTimeout(() => {
      setReels([selectedQuestion]);
      setSpinningReels([false]);
      setIsSpinning(false);
      setMessage("結果発表 🎉");
    }, 3000);
  }, [isSpinning, questions]);

  return (
    <main className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.body}>
          {/* 上部メッセージ */}
          <div className={styles.topSign}>
            <div className={styles.signText}>{message}</div>
          </div>

          {/* 🎯 質問（＝リール内容）表示 */}
          <div className={styles.reelArea}>
            {reels.map((symbol, index) => (
              <Reel
                key={index}
                reelIndex={index}
                finalSymbol={symbol}
                isSpinning={spinningReels[index]}
                symbolHeightRem={symbolHeightRem}
                questions={questions} // ← 追加！
              />
            ))}
          </div>

          {/* スピンボタン */}
          <div className={styles.bottomPanel}>
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={styles.spinButton}
            >
              SPIN
            </button>
          </div>
        </div>

        {/* レバー */}
        <Lever onSpin={handleSpin} isSpinning={isSpinning} />
      </div>
    </main>
  );
}