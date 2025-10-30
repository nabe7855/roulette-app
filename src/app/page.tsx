"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Settings as SettingsIcon } from "lucide-react";

import { AppMode } from "../types";
import { DEFAULT_QUESTIONS } from "../constants";

import { useRoulette } from "../hooks/useRoulette";
import { useLocalStorage } from "../hooks/useLocalStorage";

import ToggleSwitch from "../components/ToggleSwitch";
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

  // 🌸 共通状態
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayQuestions, setDisplayQuestions] = useState<string[]>([]);
  const [targetQuestion, setTargetQuestion] = useState<string | null>(null);

  // 🎡 ルーレット用
  const [rouletteSelectedQuestion, setRouletteSelectedQuestion] = useState<string | null>(null);
  const [isRouletteResultOpen, setIsRouletteResultOpen] = useState(false);

  // 🎰 スロット用
  const [slotSelectedQuestion, setSlotSelectedQuestion] = useState<string | null>(null);
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

    // 結果を決定
    const finalPick = available[Math.floor(Math.random() * available.length)];

    // 表示するリストを作成
    const others = available
      .filter((q) => q.question !== finalPick.question)
      .map((q) => q.question)
      .sort(() => Math.random() - 0.5)
      .slice(0, 9);

    const finalDisplayQuestions = [...others, finalPick.question]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);

    if (!finalDisplayQuestions.includes(finalPick.question)) {
      finalDisplayQuestions.push(finalPick.question);
    }

    setDisplayQuestions(finalDisplayQuestions);
    setTimeout(() => setTargetQuestion(finalPick.question), 50);

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
    }, 5000);
  };

  // 履歴リセット
  const handleClear = () => {
    setAskedIndexes([]);
    setRouletteSelectedQuestion(null);
    setSlotSelectedQuestion(null);
    setTargetQuestion(null);
    alert("履歴をクリアしました！");
  };

  // モード切替
  const handleToggleMode = useCallback(() => {
    setMode((prev) =>
      prev === AppMode.Roulette ? AppMode.Slot : AppMode.Roulette
    );
  }, [setMode]);

  // モード変更時に状態をリセット
  useEffect(() => {
    if (mode === AppMode.Roulette) {
      setSlotSelectedQuestion(null);
      setIsSlotResultOpen(false);
    } else {
      setRouletteSelectedQuestion(null);
      setIsRouletteResultOpen(false);
    }
  }, [mode]);

  // 初期の表示リスト
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

  // 🎨 UI
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-4 font-sans relative">
      {/* ⚙ 設定ボタン */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.push("/admin")}
          disabled={isSpinning}
          className="text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SettingsIcon className="w-8 h-8" />
        </button>
      </div>

      {/* タイトル */}
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          質問{mode === AppMode.Roulette ? "ルーレット" : "スロット"}
        </h1>
        <p className="text-gray-500 mt-2">
          自己PRの練習や会話のきっかけ作りに！
        </p>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        {mode === AppMode.Roulette ? (
         <RouletteWheel
  segments={displayQuestions.map((q) => ({
    label: q,
    color: "#4ade80", // 💚お好みで色を変えてもOK！
  }))}
  rotation={isSpinning ? 360 : 0}
/>
        ) : (
          <SlotMachine
            questions={questions}
            isSpinning={isSpinning}
            selectedQuestion={slotSelectedQuestion}
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
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
          >
            {isSpinning ? "回転中..." : "スタート"}
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

      {/* ✅ モーダル */}
      {mode === AppMode.Roulette ? (
        <WinnerModal
          isOpen={isRouletteResultOpen}
          question={rouletteSelectedQuestion}
          onClose={() => setIsRouletteResultOpen(false)}
        />
      ) : (
        <WinnerModal
          isOpen={isSlotResultOpen}
          question={slotSelectedQuestion}
          onClose={() => setIsSlotResultOpen(false)}
        />
      )}
    </div>
  );
}
