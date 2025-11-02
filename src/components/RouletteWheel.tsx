import React, { useEffect, useState } from "react";
import { Segment } from "../types";
import { polarToCartesian, describeArc } from "../utils/svgUtils";

interface RouletteWheelProps {
  segments: Segment[];
  rotation: number;
  isSpinning?: boolean;
  onFinished?: (winner: Segment) => void; // ✅ 追加！
  openSettings?: () => void;
}

/**
 * 🎯 RouletteWheel コンポーネント
 * SVGでルーレット盤面を描画
 */
const RouletteWheel: React.FC<RouletteWheelProps> = ({
  segments,
  rotation,
  isSpinning = false,
  onFinished,
  openSettings,
}) => {
  const size = 500;
  const center = size / 2;
  const radius = size / 2 - 10;
  const segmentAngle = 360 / segments.length;
  const [currentRotation, setCurrentRotation] = useState(0);

  // 🔁 回転アニメーション管理
  useEffect(() => {
    if (isSpinning) {
      const randomSpins = 5 + Math.random() * 3; // ランダムスピン数
      const finalRotation = 360 * randomSpins + Math.random() * 360;

      setCurrentRotation(finalRotation);

      // 結果を決定
      const timeout = setTimeout(() => {
        const winningAngle = finalRotation % 360;
        const winnerIndex = Math.floor(
          (segments.length - winningAngle / segmentAngle) % segments.length
        );
        const winner = segments[winnerIndex];
        onFinished?.(winner); // 🎯 親に結果を返す
      }, 6000);

      return () => clearTimeout(timeout);
    }
  }, [isSpinning, segments, segmentAngle, onFinished]);

  return (
    <div className="relative w-full max-w-[500px] aspect-square roulette-wheel">
      {/* ⚙ 設定ボタン */}
      {openSettings && (
        <button
          onClick={openSettings}
          className="absolute top-4 right-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-transform hover:scale-105 z-50"
        >
          ⚙ 設定
        </button>
      )}

      {/* 🎨 ルーレット本体 */}
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
        <g
          style={{
            transform: `rotate(${currentRotation}deg)`,
            transformOrigin: "center center",
            transition: `transform 6000ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
          }}
        >
          {segments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const path = describeArc(center, center, radius, startAngle, endAngle);
            const midAngle = startAngle + segmentAngle / 2;
            const textPos = polarToCartesian(center, center, radius * 0.7, midAngle);

            return (
              <g key={index}>
                <path
                  d={path}
                  fill={segment.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                <text
                  x={textPos.x}
                  y={textPos.y}
                  fill="#fff"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fontWeight="bold"
                  transform={`rotate(${midAngle + 90}, ${textPos.x}, ${textPos.y})`}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {segment.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* 🎯 中心円 */}
        <circle
          cx={center}
          cy={center}
          r="25"
          fill="#fff"
          stroke="#f9a8d4"
          strokeWidth="5"
        />
      </svg>

      {/* 🔺 ポインタ */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 
        border-l-[15px] border-l-transparent
        border-r-[15px] border-r-transparent
        border-t-[30px] border-t-pink-500
        drop-shadow-lg"
      />
    </div>
  );
};

export default RouletteWheel;
