import React from "react";
import { Segment } from "../types";
import { polarToCartesian, describeArc } from "../utils/svgUtils";

// 🎡 ルーレットに渡すデータの型定義
interface RouletteWheelProps {
  segments: Segment[]; // 各セグメント（質問や選択肢）の情報
  rotation: number;    // 現在の回転角度（deg）
}

/**
 * 🎯 RouletteWheel コンポーネント
 * ルーレットの盤面をSVGで描画します。
 */
const RouletteWheel: React.FC<RouletteWheelProps> = ({ segments, rotation }) => {
  const size = 500; // ルーレットの描画サイズ
  const center = size / 2;
  const radius = size / 2 - 10;
  const segmentAngle = 360 / segments.length; // 1セクションあたりの角度

  return (
    <div className="relative w-full max-w-[500px] aspect-square">
      {/* 🎨 ルーレット本体 */}
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
      >
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center center",
            transition: `transform 6000ms cubic-bezier(0.25, 0.1, 0.25, 1)`,
          }}
        >
          {/* 🎠 各セグメントを描画 */}
          {segments.map((segment, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const pathData = describeArc(center, center, radius, startAngle, endAngle);
            const midAngle = startAngle + segmentAngle / 2;
            const textPosition = polarToCartesian(center, center, radius * 0.7, midAngle);

            return (
              <g key={index}>
                {/* 扇形 */}
                <path
                  d={pathData}
                  fill={segment.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                {/* テキスト */}
                <text
                  x={textPosition.x}
                  y={textPosition.y}
                  fill="#ffffff"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="13"
                  fontWeight="bold"
                  transform={`rotate(${midAngle + 90}, ${textPosition.x}, ${textPosition.y})`}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {segment.label}
                </text>
              </g>
            );
          })}
        </g>

        {/* 🎯 中央の白い円 */}
        <circle
          cx={center}
          cy={center}
          r="25"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="5"
        />
      </svg>

      {/* 🔺 ポインタ */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 
        border-l-[15px] border-l-transparent
        border-r-[15px] border-r-transparent
        border-t-[30px] border-t-red-500
        drop-shadow-lg"
      />
    </div>
  );
};

export default RouletteWheel;
