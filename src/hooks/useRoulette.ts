import { useState, useCallback, useLayoutEffect } from "react";
import { Segment } from "../types/types";
import { SEGMENTS } from "../constants";

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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [_unused, setPendingWinnerIndex] = useState<number | null>(null);

const currentSegments: Segment[] = SEGMENTS.slice(0, numberOfSegments).map((s, i) => ({
  id: i,
  label: s.label,
  color: s.color,
}));


  /** 🎯 スピン開始処理 */
  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);
    setIsModalOpen(false);

    // 🎯 当選インデックスを決定
    const winningSegmentIndex = Math.floor(Math.random() * currentSegments.length);
    setPendingWinnerIndex(winningSegmentIndex);

    // 🌀 常に右回転（時計回り）
    const sliceAngle = 360 / currentSegments.length;
    const targetAngle = winningSegmentIndex * sliceAngle + sliceAngle / 2;
    const randomSpins = 4 + Math.floor(Math.random() * 2); // 4～5回転
    const newRotation = rotation + randomSpins * 360 + (360 - targetAngle);

    setRotation(newRotation);

    // 💫 モーダルを「回転中に予約」
    setTimeout(() => {
      const winningSegment = {
  ...currentSegments[winningSegmentIndex],
  id: currentSegments[winningSegmentIndex].id ?? winningSegmentIndex, // ← ここ！
};
setWinner(winningSegment);
      setIsModalOpen(true);
    }, 2200); // transition時間とほぼ同時に表示
  }, [isSpinning, rotation, currentSegments]);

  /** 🕒 回転終了後の内部状態リセット */
  useLayoutEffect(() => {
    if (!isSpinning) return;

    const spinDuration = 2500; // transitionに合わせる
    const timer = setTimeout(() => {
      setIsSpinning(false);
      setPendingWinnerIndex(null);
    }, spinDuration);

    return () => clearTimeout(timer);
  }, [isSpinning]);

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
