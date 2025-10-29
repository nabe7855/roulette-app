"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AppMode } from "@/app/types";
import { DEFAULT_QUESTIONS } from "../../constants";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import ToggleSwitch from "@/app/components/ToggleSwitch";
import Roulette from "@/app/components/Roulette";
import Slot from "@/app/components/Slot";
import { SettingsIcon } from "@/app/components/icons";
import ResultModal from "@/app/components/ResultModal"; // ✅ 結果モーダル

export default function Page() {
  const router = useRouter();

  const [mode, setMode] = useLocalStorage<AppMode>("app-mode", AppMode.Roulette);
  const [questions] = useLocalStorage<string[]>("questions", DEFAULT_QUESTIONS);
  const [askedIndexes, setAskedIndexes] = useLocalStorage<number[]>("asked-indexes", []);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [displayQuestions, setDisplayQuestions] = useState<string[]>([]);
  const [targetQuestion, setTargetQuestion] = useState<string | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false); // ✅ モーダル制御

  // 利用可能な質問リストを取得
  const getAvailableQuestions = useCallback(() => {
    return questions
      .map((q, i) => ({ question: q, index: i }))
      .filter((item) => !askedIndexes.includes(item.index));
  }, [questions, askedIndexes]);

  // スタートボタンの動作
  const handleStart = () => {
    if (isSpinning) return;

    const available = getAvailableQuestions();
    if (available.length === 0) {
      alert("すべての質問が出題されました！「クリア」ボタンでリセットしてください。");
      return;
    }

    setIsSpinning(true);
    setSelectedQuestion(null);

    // ランダムピック
    const finalPick = available[Math.floor(Math.random() * available.length)];
    const displayPool = [...available];
    const tempDisplay = [finalPick.question];

    // 表示用リスト生成
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

    // 🎯 回転終了後に「一番上の質問」を結果として表示
    setTimeout(() => {
      const resultQuestion = finalDisplayQuestions[0] || finalPick.question;
      const resultIndex = questions.findIndex(q => q === resultQuestion);

      setSelectedQuestion(resultQuestion);
      setAskedIndexes((prev) => [...prev, resultIndex]);
      setIsSpinning(false);
      setIsResultOpen(true); // ✅ モーダルを開く
    }, 5000);
  };

  // 履歴リセット
  const handleClear = () => {
    setAskedIndexes([]);
    setSelectedQuestion(null);
    setTargetQuestion(null);
    alert("履歴がクリアされました。新しいセッションを開始できます。");
  };

  // ルーレット⇔スロット切り替え
  const handleToggleMode = useCallback(() => {
    setMode((prev) =>
      prev === AppMode.Roulette ? AppMode.Slot : AppMode.Roulette
    );
  }, [setMode]);

  // Tabキーでモード切替
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        event.preventDefault();
        handleToggleMode();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleToggleMode]);

  // 初期質問リスト設定
  useEffect(() => {
    const available = getAvailableQuestions();
    const initialDisplay = [...available.map((q) => q.question)]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);

    Promise.resolve().then(() => {
      setDisplayQuestions(initialDisplay);
    });
  }, [questions, getAvailableQuestions]);

  const availableCount = getAvailableQuestions().length;
  const totalCount = questions.length;

  // 🎡 メインUI
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

      {/* メイン */}
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
      <ResultModal
        isOpen={isResultOpen}
        question={selectedQuestion}
        onClose={() => setIsResultOpen(false)}
      />
    </div>
  );
}
