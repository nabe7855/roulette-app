"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ToggleSwitch from "@/src/components/backend/ToggleSwitch";
import QuestionManager from "@/src/components/backend/QuestionManager";
import { AppMode, Question } from "@/src/types/types";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";

const AdminPage: React.FC = () => {
  const router = useRouter();
  const [mode, setMode] = React.useState<AppMode>(AppMode.Roulette);
  const [rouletteQuestions, setRouletteQuestions] = useLocalStorage<Question[]>("roulette_questions", []);
  const [slotQuestions, setSlotQuestions] = useLocalStorage<Question[]>("slot_questions", []);

  const isRoulette = mode === AppMode.Roulette;

  return (
    <div className="app-container">
      {/* 🔴 左上固定の戻るボタン */}
      <button
        className="back-button"
        onClick={() => router.push("/")}
      >
        ← 🎰 スロット画面に戻る
      </button>

      <header className="app-header">
        <h1>ルーレット＆スロット 質問管理</h1>
        <p>ゲームモードを選択して、質問を管理してください。</p>
      </header>

      <main className="app-main">
        <ToggleSwitch mode={mode} setMode={setMode} />
        <div className="question-manager-wrapper">
          {isRoulette ? (
            <QuestionManager
              key={AppMode.Roulette}
              title="ルーレットの質問管理"
              questions={rouletteQuestions}
              setQuestions={setRouletteQuestions}
            />
          ) : (
            <QuestionManager
              key={AppMode.Slot}
              title="スロットの質問管理"
              questions={slotQuestions}
              setQuestions={setSlotQuestions}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
