"use client";
import React, { useEffect, useState, useCallback } from "react"; // ← 🆕 useCallback追加
import { Segment } from "../../../types/types";
import { polarToCartesian, describeArc } from "../../../utils/svgUtils";
import styles from "./RouletteWheel.module.css";
import { supabase } from "@/src/lib/supabaseClient";
import WinnerModal from "../Rolletecomponents/WinnerModal";
import ResetUsedQuestionsButton from "../Rolletecomponents/ResetUsedQuestionsButton"; // ← 🆕 追加

interface RouletteWheelProps {
  rotation: number;
  isSpinning?: boolean;
  openSettings?: () => void;
  onFinished?: (winner: Segment) => void;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({
  rotation,
  openSettings,
}) => {
  const [size, setSize] = useState(400);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [winner, setWinner] = useState<Segment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0);

  const numSegments = 8;

  // 🎯 質問取得関数をuseCallback化して、他でも呼べるようにする
  const fetchQuestions = useCallback(async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("id, question_text, used")
      .eq("type", "roulette")
      .eq("used", false);

    if (error) {
      console.error("❌ 質問取得エラー:", error);
      return;
    }

    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numSegments);

    const generatedSegments: Segment[] = selected.map((q, i) => ({
      id: q.id,
      label: q.question_text,
      color: i % 2 === 0 ? "#f472b6" : "#ec4899",
    }));

    setSegments(generatedSegments);
  }, [numSegments]); // ← 依存配列に numSegments だけ

  // 初回読み込み
  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // 📱 サイズ調整
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 500) setSize(280);
      else if (window.innerWidth < 900) setSize(350);
      else setSize(420);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const center = size / 2;
  const radius = size / 2 - 10;
  const segmentAngle = 360 / (segments.length || 1);

  // 🎯 回転アニメーション
  useEffect(() => {
    if (rotation !== 0) {
      const newRotation = currentRotation + rotation;
      requestAnimationFrame(() => setCurrentRotation(newRotation));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rotation]);

  // 🎯 回転完了時に選ばれた質問をused:trueに更新
  useEffect(() => {
    if (segments.length === 0 || rotation === 0) return;

    const spinDuration = 2500;
    const showModalDelay = spinDuration - 200;

    const timer = setTimeout(async () => {
      const normalizedRotation = ((currentRotation % 360) + 360) % 360;
      const index =
        Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length;
      const selected = segments[index];

      console.log("🎯 選ばれたセグメント:", selected);
      setWinner(selected);
      setIsModalOpen(true);

      const { error } = await supabase
        .from("questions")
        .update({ used: true })
        .eq("id", selected.id);

      if (error) {
        console.error("❌ used 更新エラー:", error);
      } else {
        console.log(`🎯 「${selected.label}」を使用済みにしました！`);
      }
    }, showModalDelay);

    return () => clearTimeout(timer);
  }, [rotation, segments, segmentAngle, currentRotation]);

  const handleCloseModal = () => setIsModalOpen(false);

  // 🆕 リセット完了後にfetchQuestionsを再実行するコールバック
  const handleResetDone = () => {
    fetchQuestions();
  };

  return (
    <div className={styles.rouletteWrapper} style={{ width: `${size}px` }}>
      {openSettings && (
        <button onClick={openSettings} className={styles.settingsButton}>
          ⚙ 設定
        </button>
      )}

      {/* 🎡 ルーレット本体 */}
      <svg viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
        {/* ... ここは一切変更なし ... */}
        <g
          style={{
            transform: `rotate(${currentRotation}deg)`,
            transformOrigin: "center center",
            transition: `transform 2500ms cubic-bezier(0.45, 0.05, 0.55, 0.95)`,
          }}
        >
          {segments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const path = describeArc(center, center, radius, startAngle, endAngle);
            const midAngle = startAngle + segmentAngle / 2;
            const textPos = polarToCartesian(center, center, radius * 0.55, midAngle);

            return (
              <g key={index}>
                <path d={path} fill={segment.color} stroke="#fff" strokeWidth="2" />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="#fff"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize={size < 350 ? "10" : "12"}
                  fontWeight="bold"
                  transform={`rotate(${midAngle + 90}, ${textPos.x}, ${textPos.y})`}
                >
                  {segment.label
                    .split(/(.{10})/)
                    .filter(Boolean)
                    .map((line, i) => (
                      <tspan
                        key={i}
                        x={textPos.x}
                        dy={i === 0 ? 0 : "1.1em"}
                        textAnchor="middle"
                      >
                        {line}
                      </tspan>
                    ))}
                </text>
              </g>
            );
          })}
        </g>

        <circle
          cx={center}
          cy={center}
          r="25"
          fill="#fff"
          stroke="#f9a8d4"
          strokeWidth="5"
        />
      </svg>

      {/* 🔺 針 */}
      <div className={styles.pointer} />

      {/* 🎉 結果モーダル */}
      <WinnerModal isOpen={isModalOpen} winner={winner} onClose={handleCloseModal} />

      {/* ♻️ リセットボタン */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <ResetUsedQuestionsButton onResetDone={handleResetDone} /> {/* 🆕ここ */}
      </div>
    </div>
  );
};

export default RouletteWheel;
