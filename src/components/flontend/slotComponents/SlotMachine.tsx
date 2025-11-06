"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // ✅ Supabase追加
import styles from "./SlotMachine.module.css";

/** 🎯 Props定義 */
interface SlotMachineProps {
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
  isSpinning,
  selectedQuestion,
  onStart,
  disabled,
}) => {
  const [questions, setQuestions] = useState<string[]>([]);
  const [displayQuestion, setDisplayQuestion] = useState(selectedQuestion);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  /** ✅ SSR対策 */
  useEffect(() => {
    setMounted(true);
  }, []);

  /** 🧩 Supabaseから「slot」タイプの質問を取得 */
  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from("questions")
        .select("question_text")
        .eq("type", "slot"); // ✅ スロット専用だけ取得

      if (error) {
        console.error("質問データの取得に失敗:", error);
        return;
      }

      if (data && data.length > 0) {
        setQuestions(data.map((item) => item.question_text));
      }
    };

    fetchQuestions();
  }, []);

  /** 🎰 スロットスピン処理 */
  const handleSlotSpin = () => {
    if (isSpinning || disabled || questions.length === 0) return;

    onStart();
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

  if (!mounted) return null;

  /** 🎨 JSX */
  return (
    <div className={styles.wrapper}>
      <div className={styles.machine}>
        <div className={styles.title}>SLOT</div>

        <div className={styles.display}>
          <p className={`${styles.question} ${isSpinning ? styles.spinning : ""}`}>
            {displayQuestion || "？"}
          </p>
        </div>

        <div
          className={`${styles.lever} ${isSpinning ? styles.disabled : ""}`}
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
