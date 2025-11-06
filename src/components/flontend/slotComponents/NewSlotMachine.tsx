import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './NewSlotMachine.module.css';

// --- 定数定義 ---
const SYMBOLS = ['7', '🍒', '🔔', '🍋', '🍉'];
const REEL_COUNT = 1;

// --- 型定義 ---
type ReelProps = {
  finalSymbol: string;
  isSpinning: boolean;
  reelIndex: number;
  symbolHeightRem: number;
};

type LeverProps = {
  onSpin: () => void;
  isSpinning: boolean;
};

type SymbolDisplayProps = {
  symbol: string;
  symbolHeightRem: number;
};

// 💡 NewSlotMachine の Props型
type NewSlotMachineProps = {
  questions?: string[];
  isSpinning?: boolean;
  selectedQuestion?: string;
  onStart?: () => void;
  disabled?: boolean;
};

// --- コンポーネント群 ---

const SymbolDisplay: React.FC<SymbolDisplayProps> = ({ symbol, symbolHeightRem }) => {
  const isSeven = symbol === '7';
  return (
    <div className={styles.symbolDisplay} style={{ height: `${symbolHeightRem}rem` }}>
      <span className={isSeven ? styles.seven : styles.symbol}>{symbol}</span>
    </div>
  );
};

const Reel: React.FC<ReelProps> = React.memo(({ finalSymbol, isSpinning, symbolHeightRem }) => {
  const reelSymbols = useMemo(() => [...SYMBOLS, ...SYMBOLS], []);
  const finalPositionIndex = SYMBOLS.length + SYMBOLS.indexOf(finalSymbol);
  const finalTranslateY = `-${finalPositionIndex * symbolHeightRem}rem`;

  return (
    <div className={styles.reelContainer} style={{ height: `${symbolHeightRem}rem` }}>
      <div
        className={`${styles.reelInner} ${isSpinning ? styles.reelSpinning : ''}`}
        style={{
          transform: isSpinning ? undefined : `translateY(${finalTranslateY})`,
          transition: isSpinning ? 'none' : 'transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {reelSymbols.map((s, i) => (
          <SymbolDisplay key={i} symbol={s} symbolHeightRem={symbolHeightRem} />
        ))}
      </div>
    </div>
  );
});
Reel.displayName = 'Reel';

const Lever: React.FC<LeverProps> = ({ onSpin, isSpinning }) => {
  const [pulled, setPulled] = useState(false);

  const handlePull = () => {
    if (isSpinning) return;
    onSpin();
    setPulled(true);
    setTimeout(() => setPulled(false), 500);
  };

  return (
    <div className={styles.leverContainer} onClick={handlePull}>
      <div
        className={`${styles.leverBall} ${pulled ? styles.leverPulled : ''} ${
          isSpinning ? styles.leverDisabled : ''
        }`}
      />
      <div className={`${styles.leverRod} ${pulled ? styles.leverRodPulled : ''}`} />
    </div>
  );
};

// --- メイン ---
export default function NewSlotMachine({
  questions = [],
  onStart,
  disabled,
}: NewSlotMachineProps) {

  const [reels, setReels] = useState<string[]>(['7']);
  const [spinningReels, setSpinningReels] = useState<boolean[]>([false]);
  const [message, setMessage] = useState('BIG WIN');
  const [isSpinning, setIsSpinning] = useState(false);
  const [symbolHeightRem, setSymbolHeightRem] = useState(10);

  // 💡 質問の表示用（データベース連携確認用）
  const [currentQuestion, setCurrentQuestion] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      setSymbolHeightRem(window.innerWidth < 640 ? 8 : 10);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- 質問データがある場合に1つランダムに選ぶ ---
  useEffect(() => {
  if (questions.length > 0) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setTimeout(() => setCurrentQuestion(randomQuestion), 0);
  }
}, [questions]);


  const isWinner = message === 'BIG WIN';

  useEffect(() => {
    if (!isSpinning) {
      const allSevens = reels.every((symbol) => symbol === '7');
      setTimeout(() => {
        setMessage(allSevens ? 'BIG WIN' : 'TRY AGAIN');
      }, 0);
    }
  }, [reels, isSpinning]);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;
    if (onStart) onStart(); // 親（page.tsx）に通知
    setIsSpinning(true);
    setMessage('SPINNING');
    setSpinningReels([true]);

    const newReels = Array(REEL_COUNT)
      .fill(null)
      .map(() => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
    setReels(newReels);

    setTimeout(() => {
      setSpinningReels([false]);
      setIsSpinning(false);
    }, 3000);
  }, [isSpinning, onStart]);

  return (
    <main className={styles.container}>
      <div className={styles.machine}>
        <div className={styles.body}>
          {/* トップサイン */}
          <div className={`${styles.topSign} ${isWinner ? styles.winGlow : ''}`}>
            <div className={styles.signText}>{message}</div>
          </div>

          {/* 💬 データベースからの質問を表示 */}
          {currentQuestion && (
            <div className={styles.questionBox}>
              <p className={styles.questionText}>{currentQuestion}</p>
            </div>
          )}

          {/* リール */}
          <div className={styles.reelArea}>
            {reels.map((symbol, index) => (
              <Reel
                key={index}
                reelIndex={index}
                finalSymbol={symbol}
                isSpinning={spinningReels[index]}
                symbolHeightRem={symbolHeightRem}
              />
            ))}
          </div>

          {/* ボタン */}
          <div className={styles.bottomPanel}>
            <button
              onClick={handleSpin}
              disabled={isSpinning || disabled}
              className={styles.spinButton}
            >
              SPIN
            </button>
          </div>
        </div>
        <Lever onSpin={handleSpin} isSpinning={isSpinning} />
      </div>
    </main>
  );
}
