import { useState, useCallback, useEffect } from "react";
import { Segment } from "../types";
import { SEGMENTS, SPIN_DURATION } from "../constants";

/**
 * 🎡 useRouletteフック
 * ルーレットの状態・動作をすべて管理
 */
export const useRoulette = () => {
  const [rotation, setRotation] = useState<number>(0); // 現在の角度
  const [isSpinning, setIsSpinning] = useState<boolean>(false); // 回転中
  const [winner, setWinner] = useState<Segment | null>(null); // 当選セグメント
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // モーダル開閉
  const [numberOfSegments, setNumberOfSegments] = useState<number>(SEGMENTS.length); // セグメント数
  const [pendingWinnerIndex, setPendingWinnerIndex] = useState<number | null>(null); // 一時保存用

  // 現在表示するセグメントリスト
  const currentSegments = SEGMENTS.slice(0, numberOfSegments);

  /** 🎯 スピン開始処理 */
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    setIsModalOpen(false);

    // ランダム当選位置
    const winningSegmentIndex = Math.floor(Math.random() * currentSegments.length);
    setPendingWinnerIndex(winningSegmentIndex);

    const sliceAngle = 360 / currentSegments.length;
    const targetAngle = winningSegmentIndex * sliceAngle + sliceAngle / 2;
    const randomSpins = 5 + Math.floor(Math.random() * 4);
    const finalRotation = rotation - (rotation % 360) + randomSpins * 360 + (360 - targetAngle);

    // 回転開始
    setRotation(finalRotation);
  }, [isSpinning, rotation, currentSegments]);

  /** 🌀 回転終了時のモーダル表示 */
  useEffect(() => {
    if (!isSpinning) return;

    const wheel = document.querySelector(".roulette-wheel");
    if (!wheel) return;

    const handleTransitionEnd = () => {
      if (pendingWinnerIndex !== null) {
        const winningSegment = currentSegments[pendingWinnerIndex];
        setWinner(winningSegment);
        setIsModalOpen(true);
      }
      setIsSpinning(false);
      setPendingWinnerIndex(null);
      wheel.removeEventListener("transitionend", handleTransitionEnd);
    };

    wheel.addEventListener("transitionend", handleTransitionEnd);
    return () => {
      wheel.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [isSpinning, currentSegments, pendingWinnerIndex]);

  /** ❌ モーダルを閉じる */
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  /** 🔢 セグメント数変更 */
  const handleNumberOfSegmentsChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      if (!isNaN(value)) {
        const clamped = Math.max(2, Math.min(SEGMENTS.length, value));
        setNumberOfSegments(clamped);
      }
    },
    []
  );

  return {
    rotation,
    isSpinning,
    winner,
    isModalOpen,
    numberOfSegments,
    currentSegments,
    handleSpin,
    handleCloseModal,
    handleNumberOfSegmentsChange,
  };
};
