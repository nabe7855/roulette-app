import { useState, useCallback, useEffect } from "react";
import { Segment } from "../types/types";
import { SEGMENTS} from "../constants";

/**
 * 🎡 useRouletteフック
 * ルーレットの状態・動作をすべて管理
 */
export const useRoulette = () => {
  const [rotation, setRotation] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [winner, setWinner] = useState<Segment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [numberOfSegments, setNumberOfSegments] = useState<number>(SEGMENTS.length);
  const [pendingWinnerIndex, setPendingWinnerIndex] = useState<number | null>(null);

  const currentSegments = SEGMENTS.slice(0, numberOfSegments);

  /** 🎯 スピン開始処理 */
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    setIsModalOpen(false);

    const winningSegmentIndex = Math.floor(Math.random() * currentSegments.length);
    setPendingWinnerIndex(winningSegmentIndex);

    const sliceAngle = 360 / currentSegments.length;
    const targetAngle = winningSegmentIndex * sliceAngle + sliceAngle / 2;
    const randomSpins = 5 + Math.floor(Math.random() * 4);
    const finalRotation =
      rotation - (rotation % 360) + randomSpins * 360 + (360 - targetAngle);

    setRotation(finalRotation);
  }, [isSpinning, rotation, currentSegments]);

  /** 🌀 回転終了時のモーダル表示（タイマーで制御） */
  useEffect(() => {
    if (!isSpinning) return;

    const timer = setTimeout(() => {
      if (pendingWinnerIndex !== null) {
        const winningSegment = currentSegments[pendingWinnerIndex];
        setWinner(winningSegment);
        setIsModalOpen(true);
      }
      setIsSpinning(false);
      setPendingWinnerIndex(null);
    }, 6000); // ← ルーレットのアニメーション時間

    return () => clearTimeout(timer);
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
