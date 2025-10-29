'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { AppMode } from '@/app/types';
import { DEFAULT_QUESTIONS } from '../../constants';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import ToggleSwitch from '@/app/components/ToggleSwitch';
import Roulette from '@/app/components/Roulette';
import Slot from '@/app/components/Slot';
import AdminPanel from '@/app/components/AdminPanel';
import { SettingsIcon } from '@/app/components/icons';

export default function Page() {
  const [mode, setMode] = useLocalStorage<AppMode>('app-mode', AppMode.Roulette);
  const [questions, setQuestions] = useLocalStorage<string[]>('questions', DEFAULT_QUESTIONS);
  const [askedIndexes, setAskedIndexes] = useLocalStorage<number[]>('asked-indexes', []);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [displayQuestions, setDisplayQuestions] = useState<string[]>([]);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [targetQuestion, setTargetQuestion] = useState<string | null>(null);

  const getAvailableQuestions = useCallback(() => {
    return questions
      .map((q, i) => ({ question: q, index: i }))
      .filter(item => !askedIndexes.includes(item.index));
  }, [questions, askedIndexes]);

  const handleStart = () => {
    if (isSpinning) return;

    const available = getAvailableQuestions();
    if (available.length === 0) {
      alert("すべての質問が出題されました！「クリア」ボタンでリセットしてください。");
      return;
    }

    setIsSpinning(true);
    setSelectedQuestion(null);

    const finalPick = available[Math.floor(Math.random() * available.length)];
    const displayPool = [...available];
    const tempDisplay = [finalPick.question];

    while (tempDisplay.length < 10 && displayPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * displayPool.length);
      const randomItem = displayPool[randomIndex];
      if (randomItem && !tempDisplay.includes(randomItem.question)) {
        tempDisplay.push(randomItem.question);
      }
      displayPool.splice(randomIndex, 1);
    }

    const finalDisplayQuestions = tempDisplay.sort(() => Math.random() - 0.5);
    setDisplayQuestions(finalDisplayQuestions);
    setTargetQuestion(finalPick.question);

    setTimeout(() => {
      setSelectedQuestion(finalPick.question);
      setAskedIndexes(prev => [...prev, finalPick.index]);
      setIsSpinning(false);
    }, 5000);
  };

  const handleClear = () => {
    setAskedIndexes([]);
    setSelectedQuestion(null);
    setTargetQuestion(null);
    alert("履歴がクリアされました。新しいセッションを開始できます。");
  };

  const handleToggleMode = () => {
    setMode(prev => prev === AppMode.Roulette ? AppMode.Slot : AppMode.Roulette);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        handleToggleMode();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    const available = getAvailableQuestions();
    const initialDisplay = [...available.map(q => q.question)]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    setDisplayQuestions(initialDisplay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const availableCount = getAvailableQuestions().length;
  const totalCount = questions.length;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-4 font-sans relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAdminPanelOpen(true)}
          disabled={isSpinning}
          className="text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SettingsIcon className="w-8 h-8" />
        </button>
      </div>

      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          質問{mode === AppMode.Roulette ? 'ルーレット' : 'スロット'}
        </h1>
        <p className="text-gray-500 mt-2">自己PRの練習や会話のきっかけ作りに！</p>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center w-full">
        {mode === AppMode.Roulette ? (
          <Roulette
            questions={displayQuestions}
            isSpinning={isSpinning}
            targetQuestion={targetQuestion}
          />
        ) : (
          <Slot
            questions={questions}
            isSpinning={isSpinning}
            selectedQuestion={selectedQuestion}
            onStart={handleStart}
            disabled={isSpinning || availableCount === 0}
          />
        )}
      </main>

      <footer className="w-full max-w-lg mt-8">
        <div className="flex items-center justify-center mb-6">
          <ToggleSwitch mode={mode} onToggle={handleToggleMode} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleStart}
            disabled={isSpinning || availableCount === 0}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
          >
            {isSpinning ? '回転中...' : 'スタート'}
          </button>
          <button
            onClick={handleClear}
            disabled={isSpinning}
            className="w-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition-colors"
          >
            履歴をクリア
          </button>
        </div>
        <p className="text-center mt-4 text-gray-500 font-medium">
          残り {availableCount} / {totalCount} 問
        </p>
      </footer>

      <AdminPanel
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        questions={questions}
        setQuestions={setQuestions}
      />
    </div>
  );
}

