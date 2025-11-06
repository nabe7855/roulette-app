"use client";
import React, { useMemo, useRef, useCallback } from "react";
import { supabase } from "@/src/lib/supabaseClient";
import { Question } from "../../types/types";
import AddQuestionForm from "./AddQuestionForm";
import QuestionList from "./QuestionList";
import ResetIcon from "./icons/ResetIcon";

interface QuestionManagerProps {
  title: string;
  type: "roulette" | "slot"; // 🎯 どっちの質問管理かを指定
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  fetchQuestions: () => Promise<void>; // 🧩 最新データ再取得関数
}

const QuestionManager: React.FC<QuestionManagerProps> = ({
  title,
  type,
  questions,
  setQuestions,
  fetchQuestions,
}) => {
  // 🚫 二重登録防止
  const isSubmittingRef = useRef(false);

  // 🆕 質問追加処理（Supabase連携 + 重複防止付き）
  const addQuestion = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      if (isSubmittingRef.current) return; // ← 二重実行防止

      isSubmittingRef.current = true;
      try {
        const { error } = await supabase.from("questions").insert([
          {
            question_text: text.trim(),
            type: type,
            used: false,
          },
        ]);

        if (error) {
          console.error("❌ 質問追加エラー:", error);
          alert("追加に失敗しました😢");
          return;
        }

        await fetchQuestions(); // 最新データ取得
      } catch (err) {
        console.error("⚠️ 予期せぬエラー:", err);
      } finally {
        // ちょっと遅らせて解除（連打防止）
        setTimeout(() => {
          isSubmittingRef.current = false;
        }, 300);
      }
    },
    [fetchQuestions, type]
  );

  // 🗑️ 削除処理
  const deleteQuestion = useCallback(
    async (id: string) => {
      const { error } = await supabase.from("questions").delete().eq("id", id);
      if (error) {
        console.error("❌ 削除エラー:", error);
        alert("削除に失敗しました");
        return;
      }
      await fetchQuestions();
    },
    [fetchQuestions]
  );

  // ♻️ 使用済みをリセット
  const clearHistory = useCallback(async () => {
    const { error } = await supabase
      .from("questions")
      .update({ used: false })
      .eq("type", type)
      .eq("used", true);

    if (error) {
      console.error("❌ リセットエラー:", error);
      alert("履歴のリセットに失敗しました");
      return;
    }

    alert("使用済みをリセットしました✨");
    await fetchQuestions();
  }, [fetchQuestions, type]);

  // 📊 使用済みカウント
  const usedCount = useMemo(
    () => questions.filter((q) => q.used).length,
    [questions]
  );

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-6 w-full">
      {/* --- ヘッダー --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="text-sm text-gray-400 text-right flex-grow">
            <p>
              登録数:{" "}
              <span className="font-semibold text-white">
                {questions.length} / 200
              </span>
            </p>
            <p>
              使用済み:{" "}
              <span className="font-semibold text-white">{usedCount}</span>
            </p>
          </div>

          <button
            onClick={clearHistory}
            disabled={usedCount === 0}
            className="flex items-center gap-2 bg-yellow-600/80 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <ResetIcon className="w-5 h-5" />
            履歴をクリア
          </button>
        </div>
      </div>

      {/* --- 質問追加フォーム --- */}
      <AddQuestionForm
        onAddQuestion={addQuestion}
        questionCount={questions.length}
      />

      {/* --- 質問リスト --- */}
      <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
        <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} />
      </div>
    </div>
  );
};

export default QuestionManager;
