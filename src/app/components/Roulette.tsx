import React, { useState, useEffect } from "react";
import { POP_COLORS } from "../../../constants";

interface RouletteProps {
  questions: string[];
  isSpinning: boolean;
  targetQuestion: string | null;
}

const Roulette: React.FC<RouletteProps> = ({ questions, isSpinning, targetQuestion }) => {
  const [rotation, setRotation] = useState(0);
  const itemCount = questions.length || 1;
  const sliceAngle = 360 / itemCount;

  useEffect(() => {
    if (targetQuestion === null) {
      setRotation(0);
      return;
    }

    const targetIndex = questions.indexOf(targetQuestion);
    if (targetIndex === -1) {
      console.error("Target question not found in display list.");
      return;
    }

    // 🎯 「針の真下」を基準に完全補正
    // conic-gradient の起点 (from) と一致させる
    const baseOffset = 90; // ← これが針の位置（上）を中心にするための補正
    const stopAngle = baseOffset - (targetIndex * sliceAngle + sliceAngle / 2);

    const spinRounds = 5;
    let newRotation = (Math.floor(rotation / 360) + spinRounds) * 360 + stopAngle;
    if (newRotation < rotation) newRotation += 360;
    setRotation(newRotation);
  }, [targetQuestion]);

  // 🎨 背景の色分けを針と完全同期させる
  const gradient = `conic-gradient(from 90deg, ${questions
    .map(
      (_, index) =>
        `${POP_COLORS[index % POP_COLORS.length]} ${index * sliceAngle}deg, ${
          POP_COLORS[index % POP_COLORS.length]
        } ${(index + 1) * sliceAngle}deg`
    )
    .join(", ")})`;

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      {/* 🔺 ポインタ */}
      <div
        className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
        style={{
          width: 0,
          height: 0,
          borderLeft: "15px solid transparent",
          borderRight: "15px solid transparent",
          borderTop: "25px solid #ef4444",
        }}
      />

      {/* 🎡 ルーレット */}
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isSpinning ? "transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)" : "none",
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: gradient,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        {/* 📝 質問ラベル */}
        {questions.map((question, index) => {
          const angle = index * sliceAngle + sliceAngle / 2 + 90; // ← 背景と針の基準に合わせた
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 origin-[0_0] h-[95px] md:h-[120px] w-[40px] md:w-[50px] flex items-center justify-center"
              style={{
                transform: `rotate(${angle}deg) translate(65px) rotate(-90deg)`,
              }}
            >
              <span
                className="text-gray-800 text-xs md:text-sm font-semibold text-center"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  whiteSpace: "normal",
                  lineHeight: "1.3",
                }}
              >
                {question}
              </span>
            </div>
          );
        })}
      </div>

      {/* 🎯 中央の円 */}
      <div className="absolute w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center text-center p-2 shadow-inner">
        <div className="absolute inset-0 rounded-full border-2 md:border-4 border-gray-200"></div>
        <div className="z-10 text-center">
          <span className="text-3xl" role="img" aria-label="roulette wheel">
            🎡
          </span>
          <p className="text-gray-500 font-semibold mt-1 text-xs md:text-sm">スタートしてね！</p>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
