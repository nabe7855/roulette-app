import React, { useState, useEffect,  } from 'react';
import { POP_COLORS } from '../../../constants';

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
      // Reset rotation smoothly when history is cleared
      setRotation(0);
      return;
    }

    const targetIndex = questions.indexOf(targetQuestion);
    if (targetIndex === -1) {
      console.error("Target question not found in display list.");
      return;
    }
    
    // Calculate the angle to bring the target slice to the top pointer
    const stopAngle = -(targetIndex * sliceAngle);
    
    // Add extra rotations for effect.
    const spinRounds = 5;
    // Calculate the new rotation value to ensure it always spins forward
    let newRotation = (Math.floor(rotation / 360) + spinRounds) * 360 + stopAngle;
    
    if(newRotation < rotation) {
        newRotation += 360;
    }

    setRotation(newRotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetQuestion]);

  const gradient = `conic-gradient(from ${-sliceAngle / 2}deg, ${questions.map((_, index) => 
    `${POP_COLORS[index % POP_COLORS.length]} ${index * sliceAngle}deg, ${POP_COLORS[index % POP_COLORS.length]} ${(index + 1) * sliceAngle}deg`
  ).join(', ')})`;

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      {/* Pointer */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20" style={{
        width: 0,
        height: 0,
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderTop: '25px solid #ef4444' // red-500
      }} />

      <div 
        className="relative w-full h-full"
        style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
        }}
      >
        <div className="absolute inset-0 rounded-full" style={{ background: gradient, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
        
        {questions.map((question, index) => {
          const angle = (index * 360) / itemCount;
          const rotationAngle = angle + sliceAngle / 2;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 origin-[0_0] h-[95px] md:h-[120px] w-[40px] md:w-[50px] flex items-center justify-center"
              style={{
                transform: `rotate(${rotationAngle}deg) translate(65px) rotate(-90deg)`,
              }}
            >
              <span
                className="text-gray-800 text-xs md:text-sm font-semibold"
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  whiteSpace: 'normal',
                  lineHeight: '1.3',
                }}
              >
                {question}
              </span>
            </div>
          );
        })}
      </div>

      {/* Center Overlay */}
      <div className="absolute w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center text-center p-2 shadow-inner">
        <div className="absolute inset-0 rounded-full border-2 md:border-4 border-gray-200"></div>
        <div className="z-10 text-center">
              <span className="text-3xl" role="img" aria-label="roulette wheel">🎡</span>
              <p className="text-gray-500 font-semibold mt-1 text-xs md:text-sm">スタートしてね！</p>
        </div>
      </div>
    </div>
  );
};

export default Roulette;
