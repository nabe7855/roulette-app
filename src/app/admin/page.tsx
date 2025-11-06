// src/app/admin/page.tsx
"use client";

import React, { useState } from "react";
import { AppMode, Question } from "@/src/types/types";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";
import ToggleSwitch from "@/src/components/backend/ToggleSwitch";
import QuestionManager from "@/src/components/backend/QuestionManager";

const AdminPage: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Roulette);
  const [rouletteQuestions, setRouletteQuestions] = useLocalStorage<Question[]>(
    "roulette_questions",
    []
  );
  const [slotQuestions, setSlotQuestions] = useLocalStorage<Question[]>(
    "slot_questions",
    []
  );

  const isRoulette = mode === AppMode.Roulette;

  return (
    <>
      <header className="w-full max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
          ルーレット & スロット 質問管理
        </h1>
        <p className="text-gray-400 mt-2">
          ゲームモードを選択して、質問を管理してください。
        </p>
      </header>

      <main className="w-full max-w-4xl mx-auto flex flex-col items-center gap-8">
        <ToggleSwitch mode={mode} setMode={setMode} />

        <div className="w-full transition-opacity duration-300">
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
    </>
  );
};

export default AdminPage;
