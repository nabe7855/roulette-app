import React, { useState, useEffect, useRef, useCallback } from "react";
import Reel from "../slotComponents/Reel";
import type { Symbol } from "../types";
import { QUESTIONS, INITIAL_CREDITS, SPIN_COST } from "../constants";



const InfoPanel: React.FC<{ credits: number; message: string }> = ({ credits, message }) => (
  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 md:w-auto bg-black/50 text-white p-4 rounded-lg shadow-lg text-center backdrop-blur-sm">
    <div className="text-yellow-400 text-2xl font-bold mb-1">Credits: {credits}</div>
    <div className="text-lg h-6">{message}</div>
  </div>
);

const Coin: React.FC = () => (
  <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full shadow-md border-2 border-gray-500" />
);


const App: React.FC = () => {
  const [reels, setReels] = useState<Symbol[]>([QUESTIONS[0]]);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [credits, setCredits] = useState<number>(INITIAL_CREDITS);
  const [message, setMessage] = useState<string>('Pull the lever for a question!');
  const [leverPulled, setLeverPulled] = useState<boolean>(false);
  const initialRender = useRef(true);

  const checkWin = useCallback(() => {
      if (credits - SPIN_COST <= 0) {
         setMessage('Game Over! Refresh to play again.');
         setCredits(0);
      } else {
         setMessage('Here is your question!');
      }
  }, [credits]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (!spinning) {
      checkWin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spinning]);

  const handleSpin = () => {
    if (spinning || credits < SPIN_COST) {
        if(credits < SPIN_COST) setMessage('Not enough credits!');
        return;
    }

    setSpinning(true);
    setLeverPulled(true);
    setCredits(c => c - SPIN_COST);
    setMessage('Thinking of a question...');

    const newReels = reels.map(() => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]);

    setTimeout(() => setReels(newReels), 500);
    setTimeout(() => setSpinning(false), 2000);
    setTimeout(() => setLeverPulled(false), 500);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      <InfoPanel credits={credits} message={message} />
      <div className="relative mt-24 md:mt-0">
        <div className="relative w-[320px] h-[550px] md:w-[400px] md:h-[650px] bg-red-700 rounded-3xl border-4 border-red-900 shadow-2xl p-4 flex flex-col items-center justify-between z-10">
          
          {/* Top Panel */}
          <div className="w-full h-24 md:h-28 bg-yellow-400 rounded-xl border-4 border-yellow-600 shadow-inner flex items-center justify-center relative">
            <div className="absolute -top-6 w-[80%] h-12 bg-red-600 border-4 border-red-800 flex items-center justify-center transform rotate-[-2deg]">
                <span className="text-yellow-300 text-4xl font-extrabold tracking-widest text-shadow" style={{textShadow: '2px 2px 0px #9A3412'}}>SLOT</span>
            </div>
             <div className="absolute -top-4 w-[80%] h-12 bg-red-500 border-4 border-red-700 flex items-center justify-center">
                <span className="text-yellow-300 text-4xl font-extrabold tracking-widest text-shadow" style={{textShadow: '2px 2px 0px #9A3412'}}>SLOT</span>
            </div>
          </div>

          {/* Reels Window */}
          <div className="w-full bg-gray-600/50 rounded-lg p-2 md:p-4 border-4 border-gray-400 shadow-inner flex justify-around items-center gap-2">
            {reels.map((symbol, index) => (
              <Reel key={index} finalSymbol={symbol} isSpinning={spinning} delay={index * 400} />
            ))}
          </div>

          {/* Control Panel */}
          <div className="w-full h-16 bg-yellow-400 rounded-lg border-4 border-yellow-600 shadow-inner flex items-center justify-between px-6">
            <div className="w-10 h-10 bg-red-600 rounded-full border-4 border-red-800 shadow-md"></div>
            <div className="flex gap-4">
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
              <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
            <div className="w-12 h-6 bg-gray-400 rounded-sm border-2 border-gray-500 shadow-inner"></div>
          </div>
          
          {/* Separator */}
          <div className="w-full h-6 bg-gray-300 border-y-4 border-gray-400 shadow-md"></div>

          {/* Coin Tray */}
          <div className="w-full h-24 bg-gray-800 rounded-b-xl shadow-inner border-4 border-black/50 p-2 flex items-end justify-center">
             <div className="flex flex-wrap items-center justify-center gap-1 opacity-80">
                <Coin /><Coin /><Coin /><Coin />
                <div className="flex ml-4"><Coin /><Coin /><Coin /></div>
                <div className="flex ml-2"><Coin /><Coin /></div>
             </div>
          </div>

        </div>

        {/* Lever */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 right-[-60px] md:right-[-80px] w-10 md:w-12 h-48 md:h-56 flex flex-col items-center z-0 cursor-pointer group"
          onClick={handleSpin}
        >
          <div className={`w-14 h-14 md:w-16 md:h-16 bg-red-600 rounded-full border-4 border-red-800 shadow-lg absolute -top-1 transition-transform duration-300 ease-in-out ${leverPulled ? 'translate-y-20' : 'group-hover:scale-110'}`}></div>
          <div className={`w-full h-full bg-gray-400 border-4 border-gray-500 rounded-lg transition-transform duration-300 ease-in-out origin-top-left ${leverPulled ? 'rotate-45' : 'group-hover:rotate-12'}`}></div>
           <div className="absolute top-0 left-[-30px] md:left-[-40px] w-10 h-24 md:w-12 md:h-28 bg-yellow-500 rounded-lg border-4 border-yellow-600 -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
