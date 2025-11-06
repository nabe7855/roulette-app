"use client";
import React from "react";
import { Segment } from "../../../types/types";
import styles from "./WinnerModal.module.css";

interface WinnerModalProps {
  isOpen: boolean;
  winner: Segment | null;
  onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ isOpen, winner, onClose }) => {
  if (!isOpen) return null;

  console.log("🧩 モーダルに渡されたwinner:", winner);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>🎉 結果発表 🎉</h2>
        <p>{winner?.label ?? "（質問データがありません）"}</p>
        <button onClick={onClose} className={styles.closeButton}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;
