import React, { useState, useEffect, useRef } from 'react';

interface SlotProps {
  questions: string[];
  isSpinning: boolean;
  selectedQuestion: string | null;
  onStart: () => void;
  disabled: boolean;
}

const Slot: React.FC<SlotProps> = ({ questions, isSpinning, selectedQuestion, onStart, disabled }) => {
  const itemHeight = 64; // Corresponds to h-16 in Tailwind
  const slotRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const animationListRef = useRef<string[]>([]);
  const [isPulled, setIsPulled] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      // STARTING THE SPIN
      const shuffled = [...questions].sort(() => Math.random() - 0.5);
      const extendedList = Array(5).fill(shuffled).flat();
      animationListRef.current = extendedList;
      setCurrentItems(extendedList);
      
      // Start the animation by setting the final position
      requestAnimationFrame(() => {
        setTranslateY(-((extendedList.length - 5) * itemHeight));
      });

    } else if (selectedQuestion) {
      // STOPPING THE SPIN
      const list = animationListRef.current;
      if (list.length > 0) {
        const baseLength = questions.length;
        // Look for the question in a middle section for a smoother stop
        const middleSectionStart = baseLength * 2;
        let stopIndex = list.indexOf(selectedQuestion, middleSectionStart);

        if (stopIndex === -1) { // Fallback if not found in the middle
          stopIndex = list.indexOf(selectedQuestion);
        }

        if (stopIndex === -1) {
            // This is a robust fallback. If the question is somehow not in our
            // animation list, we just show the result directly.
            console.error("Selected question not found in animation list. Displaying directly.");
            setCurrentItems([selectedQuestion]);
            setTranslateY(0);
        } else {
            // Found it, so calculate the correct final position.
            const finalPosition = -stopIndex * itemHeight;
            setTranslateY(finalPosition);
        }
      } else {
          // Fallback for when the animation list is empty for some reason
          setCurrentItems([selectedQuestion]);
          setTranslateY(0);
      }
    }
  }, [isSpinning, selectedQuestion, questions, itemHeight]);
  
  const handleLeverPull = () => {
    if (disabled) return;
    setIsPulled(true);
    onStart();
    setTimeout(() => {
        setIsPulled(false);
    }, 300); // Animation duration
  };

  const showInitialMessage = !isSpinning && !selectedQuestion;

  return (
    <div className="w-full max-w-lg flex items-center justify-center gap-4">
      {/* Slot Machine */}
      <div className="w-full max-w-md h-64 md:h-80 flex flex-col items-center justify-center">
        <div 
          ref={slotRef}
          className="relative w-full h-16 bg-white rounded-lg border-4 border-blue-400 overflow-hidden shadow-lg flex items-center justify-center"
        >
          {showInitialMessage ? (
            <div className="text-center animate-fade-in">
              <span className="text-3xl" role="img" aria-label="slot machine">🎰</span>
              <p className="text-gray-500 font-semibold mt-1 text-xs md:text-sm">スタートしてね！</p>
            </div>
          ) : (
            <div 
              className="absolute w-full"
              style={{
                transform: `translateY(${translateY}px)`,
                transition: isSpinning 
                    ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' 
                    : 'transform 0.5s ease-out',
              }}
            >
              {currentItems.map((question, index) => (
                <div key={index} className="h-16 flex items-center justify-center text-center p-2 text-md md:text-lg font-semibold text-gray-700">
                  {question}
                </div>
              ))}
            </div>
          )}
          <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 1) 100%)'
          }}></div>
        </div>
      </div>
      {/* Lever */}
       <div className="flex-shrink-0 h-48 flex flex-col items-center">
        <div className="w-8 h-full bg-gray-300 rounded-t-lg relative">
           <div 
             onClick={handleLeverPull}
             className={`absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-36 bg-gray-500 border-2 border-gray-600 rounded-full cursor-pointer transition-transform duration-200 ease-out ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'} ${isPulled ? 'translate-y-8' : ''}`}
             style={{transformOrigin: 'top center'}}
           >
             <div className="absolute -top-4 -left-2.5 w-8 h-8 bg-red-500 rounded-full border-2 border-red-700 shadow-md"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Slot;
