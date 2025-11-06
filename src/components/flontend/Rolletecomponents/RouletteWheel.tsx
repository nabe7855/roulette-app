import React, { useEffect, useState } from "react";
import { Segment } from "../../../types/types";
import { polarToCartesian, describeArc } from "../../../utils/svgUtils";
import styles from "./RouletteWheel.module.css";

interface RouletteWheelProps {
  segments: Segment[];
  rotation: number;
  isSpinning?: boolean;
  onFinished?: (winner: Segment) => void;
  openSettings?: () => void;
}

const RouletteWheel: React.FC<RouletteWheelProps> = ({
  segments,
  rotation,
  isSpinning = false,
  onFinished,
  openSettings,
}) => {

  const [size, setSize] = useState(400);

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
  const segmentAngle = 360 / segments.length;
  const [currentRotation, setCurrentRotation] = useState(0);

useEffect(() => {
  // rotation が変わった時にだけ発火
  if (rotation !== 0) {
    requestAnimationFrame(() => setCurrentRotation(rotation));
  }
}, [rotation]);




  return (
    <div className={styles.rouletteWrapper} style={{ width: `${size}px` }}>
      {openSettings && (
        <button onClick={openSettings} className={styles.settingsButton}>
          ⚙ 設定
        </button>
      )}

      <svg viewBox={`0 0 ${size} ${size}`} className={styles.svg}>
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
                  fontSize={size < 350 ? "11" : "13"}
                  fontWeight="bold"
                  transform={`rotate(${midAngle + 90}, ${textPos.x}, ${textPos.y})`}
                >
                  {segment.label}
                </text>
              </g>
            );
          })}
        </g>

        <circle cx={center} cy={center} r="25" fill="#fff" stroke="#f9a8d4" strokeWidth="5" />
      </svg>

      <div className={styles.pointer} />
    </div>
  );
};

export default RouletteWheel;
