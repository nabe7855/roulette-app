"use client";

import React, { useState, useEffect } from "react";
// SlotMachine.tsx の4行目を変更
import styles from "./SlotMachine.module.css";


/** 🎯 Props定義 */
interface SlotMachineProps {
  questions: string[];
  isSpinning: boolean;
  selectedQuestion: string;
  onStart: () => void;
  disabled: boolean;
}

/** 🎰 結果モーダル */
interface WinnerModalProps {
  isOpen: boolean;
  question: string;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, question, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>🎰 結果発表 🎰</h2>
        <p className={styles.modalText}>{question}</p>
        <button onClick={onClose} className={styles.closeButton}>
          OK 💫
        </button>
      </div>
    </div>
  );
};

/** 🎰 スロットマシン本体 */
const SlotMachine: React.FC<SlotMachineProps> = ({
  questions,
  isSpinning,
  selectedQuestion,
  onStart,
  disabled,
}) => {
  const [mounted, setMounted] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState(selectedQuestion);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /** ✅ マウント時処理（SSR対策） */
  useEffect(() => {
    setMounted(true);
  }, []);

  /** 🎰 スロットスピン処理 */
  const handleSlotSpin = () => {
    if (isSpinning || disabled) return;

    onStart(); // ← 外から渡されたスピン処理呼び出し
    setIsModalOpen(false);

    let count = 0;
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setDisplayQuestion(questions[randomIndex]);
      count++;

      if (count > 25) {
        clearInterval(spinInterval);
        const winnerIndex = Math.floor(Math.random() * questions.length);
        setDisplayQuestion(questions[winnerIndex]);
        setTimeout(() => {
          setIsModalOpen(true);
        }, 500);
      }
    }, 80);
  };

  /** 🎨 JSX描画 */
  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.machine}>
        <div className={styles.title}>SLOT</div>

        <div className={styles.display}>
          <p
            className={`${styles.question} ${
              isSpinning ? styles.spinning : ""
            }`}
          >
            {displayQuestion || "？"}
          </p>
        </div>

        <div
          className={`${styles.lever} ${
            isSpinning ? styles.disabled : ""
          }`}
          onClick={!isSpinning ? handleSlotSpin : undefined}
        >
          <div className={styles.leverStick}></div>
          <div className={styles.leverBall}></div>
        </div>
      </div>

      {/* 🎀 結果モーダル */}
      <WinnerModal
        isOpen={isModalOpen}
        question={displayQuestion}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default SlotMachine;
