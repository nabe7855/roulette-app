"use client";
import React, { useState, useRef } from "react";

interface AddQuestionFormProps {
  onAddQuestion: (text: string) => Promise<void> | void; // ← 非同期もOKに対応
  questionCount: number;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({
  onAddQuestion,
  questionCount,
}) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // ← 二重送信防止
  const canAdd = questionCount < 200;

  // 🚫 二重送信ガード
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return; // ← ここでガード！
    if (!newQuestion.trim() || !canAdd) return;

    setIsSubmitting(true);

    try {
      // await対応で親のSupabase処理が終わるまで待つ
      await onAddQuestion(newQuestion.trim());
      setNewQuestion("");
    } catch (err) {
      console.error("❌ 質問追加エラー:", err);
    } finally {
      // 少し遅らせて解除（連打防止）
      setTimeout(() => setIsSubmitting(false), 400);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder={
          canAdd
            ? "新しい質問を入力してください..."
            : "登録上限に達しました"
        }
        disabled={!canAdd || isSubmitting}
        style={{
          flexGrow: 1,
          backgroundColor: "#333",
          border: "1px solid #555",
          color: "#fff",
          borderRadius: "6px",
          padding: "8px 10px",
          outline: "none",
        }}
      />
      <button
        type="submit"
        disabled={!newQuestion.trim() || !canAdd || isSubmitting}
        style={{
          backgroundColor: isSubmitting ? "#777" : "#0070f3",
          color: "#fff",
          fontWeight: 600,
          padding: "8px 16px",
          border: "none",
          borderRadius: "6px",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          transition: "background-color 0.2s",
        }}
      >
        {isSubmitting ? "追加中..." : "追加"}
      </button>
    </form>
  );
};

export default AddQuestionForm;
