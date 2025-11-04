"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Settings as SettingsIcon } from "lucide-react";

import { AppMode } from "../types";
import { DEFAULT_QUESTIONS } from "../constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ToggleSwitch from "../slotComponents/ToggleSwitch";
import RouletteWheel from "../components/RouletteWheel";
import SlotMachine from "../slotComponents/SlotMachine";
import WinnerModal from "../components/WinnerModal";

export default function Page() {
  const router = useRouter();

  // 🌸 モード管理（ルーレット or スロット）
  const [mode, setMode] = useLocalStorage<AppMode>("app-mode", AppMode.Roulette);

  // 🌸 質問リストと履歴管理
  const [questions] = useLocalStorage<string[]>("questions", DEFAULT_QUESTIONS);
  const [askedIndexes, setAskedIndexes] = useLocalStorage<number[]>("asked-indexes", []);

  // 共通状態
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayQuestions, setDisplayQuestions] = useState<string[]>([]);
  const [rouletteSelectedQuestion, setRouletteSelectedQuestion] = useState<string | null>(null);
  const [slotSelectedQuestion, setSlotSelectedQuestion] = useState<string | null>(null);
  const [isRouletteResultOpen, setIsRouletteResultOpen] = useState(false);
  const [isSlotResultOpen, setIsSlotResultOpen] = useState(false);

  // 有効な質問を取得
  const getAvailableQuestions = useCallback(() => {
    return questions
      .map((q, i) => ({ question: q, index: i }))
      .filter((item) => !askedIndexes.includes(item.index));
  }, [questions, askedIndexes]);

  // 🎯 スタートボタン処理
  const handleStart = () => {
    if (isSpinning) return;

    const available = getAvailableQuestions();
    if (available.length === 0) {
      alert("すべての質問が出題されました！「履歴をクリア」ボタンでリセットしてください。");
      return;
    }

    setIsSpinning(true);
    const finalPick = available[Math.floor(Math.random() * available.length)];

    // 表示用リスト
    const others = available
      .filter((q) => q.question !== finalPick.question)
      .map((q) => q.question)
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);

    const finalDisplayQuestions = [...others, finalPick.question]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    setDisplayQuestions(finalDisplayQuestions);

    setTimeout(() => {
      const resultQuestion = finalPick.question;
      const resultIndex = questions.findIndex((q) => q === resultQuestion);

      if (mode === AppMode.Roulette) {
        setRouletteSelectedQuestion(resultQuestion);
        setIsRouletteResultOpen(true);
      } else {
        setSlotSelectedQuestion(resultQuestion);
        setIsSlotResultOpen(true);
      }

      setAskedIndexes((prev) => [...prev, resultIndex]);
      setIsSpinning(false);
    }, 6000); // ルーレット回転時間に合わせる
  };

  // 履歴リセット
  const handleClear = () => {
    setAskedIndexes([]);
    setRouletteSelectedQuestion(null);
    setSlotSelectedQuestion(null);
    alert("履歴をクリアしました！");
  };

  // モード切替
  const handleToggleMode = useCallback(() => {
    setMode((prev) => (prev === AppMode.Roulette ? AppMode.Slot : AppMode.Roulette));
  }, [setMode]);

  // 初期の質問リスト
  useEffect(() => {
    const available = getAvailableQuestions();
    const initialDisplay = available
      .map((q) => q.question)
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setDisplayQuestions(initialDisplay);
  }, [questions, getAvailableQuestions]);

  const availableCount = getAvailableQuestions().length;
  const totalCount = questions.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-white to-pink-200 text-gray-800 flex flex-col items-center justify-center p-4 font-sans relative">
      {/* ⚙ 設定ボタン */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.push("/admin")}
          disabled={isSpinning}
          className="text-gray-500 hover:text-pink-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SettingsIcon className="w-8 h-8" />
        </button>
      </div>

      {/* タイトル */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-pink-600 drop-shadow-[1px_2px_0_rgba(255,255,255,0.9)]">
          質問{mode === AppMode.Roulette ? "ルーレット" : "スロット"}
        </h1>
        <p className="text-gray-600 mt-2 text-lg">自己PRの練習や会話のきっかけ作りに！</p>
      </header>

      {/* メイン */}
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        {mode === AppMode.Roulette ? (
          <RouletteWheel
            segments={displayQuestions.map((q) => ({
              label: q,
              color: "#f48fb1", // 💗 ピンクトーンのルーレット
            }))}
            isSpinning={isSpinning}
            rotation={isSpinning ? 360 : 0}
            onFinished={(winner) => {
              setRouletteSelectedQuestion(winner.label);
              setIsRouletteResultOpen(true);
              setIsSpinning(false);
            }}
          />
        ) : (
          <SlotMachine
            questions={questions}
            isSpinning={isSpinning}
selectedQuestion={slotSelectedQuestion ?? ""}
            onStart={handleStart}
            disabled={isSpinning || availableCount === 0}
          />
        )}
      </main>

      {/* フッター */}
      <footer className="w-full max-w-lg mt-8">
        <div className="flex items-center justify-center mb-6">
          <ToggleSwitch mode={mode} onToggle={handleToggleMode} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleStart}
            disabled={isSpinning || availableCount === 0}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-pink-400/40 disabled:bg-gray-400"
          >
            {isSpinning ? "回転中..." : "スタート🎡"}
          </button>
          <button
            onClick={handleClear}
            disabled={isSpinning}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition-colors disabled:opacity-50"
          >
            履歴をクリア
          </button>
        </div>
        <p className="text-center mt-4 text-gray-600 font-medium">
          残り {availableCount} / {totalCount} 問
        </p>
      </footer>

      {/* 🎀 モーダル */}
      {mode === AppMode.Roulette ? (
        isRouletteResultOpen && (
          <WinnerModal
            winner={{ label: rouletteSelectedQuestion ?? "" }}
            onClose={() => setIsRouletteResultOpen(false)}
          />
        )
      ) : (
        isSlotResultOpen && (
          <WinnerModal
            winner={{ label: slotSelectedQuestion ?? "" }}
            onClose={() => setIsSlotResultOpen(false)}
          />
        )
      )}
    </div>
  );
}
