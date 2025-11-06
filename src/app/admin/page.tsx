"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabaseClient";
import ToggleSwitch from "@/src/components/backend/ToggleSwitch";
import { AppMode, Question } from "@/src/types/types";
import { useLocalStorage } from "@/src/hooks/useLocalStorage";

// ✅ Supabase用の型
type DBQuestion = {
  id: string;
  question_text: string;
  used: boolean;
  type: "slot" | "roulette";
};

const AdminPage: React.FC = () => {
  const router = useRouter();

  // 🎛 モードとローカルストレージ
  const [mode, setMode] = useState<AppMode>(AppMode.Roulette);
  const [rouletteQuestions, setRouletteQuestions] = useLocalStorage<Question[]>(
    "roulette_questions",
    []
  );
  const [slotQuestions, setSlotQuestions] = useLocalStorage<Question[]>(
    "slot_questions",
    []
  );

  // ✏️ 状態管理
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<DBQuestion[]>([]);
  const [showUsed, setShowUsed] = useState(false);

  // ✏️ 編集モード用
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // 🚫 二重登録防止フラグ
  const isSubmittingRef = useRef(false);

  const isRoulette = mode === AppMode.Roulette;

  // 🎯 Supabaseから質問を取得
  const fetchQuestions = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ データ取得エラー:", error);
    } else {
      setQuestions(data || []);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 💾 質問追加（← ここを修正版）
  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;
    if (isSubmittingRef.current) return; // ← 二重クリック防止

    isSubmittingRef.current = true;
    const text = newQuestion.trim();

    try {
      // 🧩 同じ内容の重複チェック
      const { data: existing, error: checkError } = await supabase
        .from("questions")
        .select("id")
        .eq("question_text", text)
        .eq("type", isRoulette ? "roulette" : "slot")
        .limit(1);

      if (checkError) {
        console.error("❌ 重複チェックエラー:", checkError);
        alert("確認中にエラーが発生しました。");
        return;
      }

      if (existing && existing.length > 0) {
        alert("同じ質問がすでに登録されています⚠️");
        return;
      }

      const newItem: DBQuestion = {
        id: crypto.randomUUID(),
        question_text: text,
        used: false,
        type: isRoulette ? "roulette" : "slot",
      };

      // ✅ Supabaseに登録
      const { error } = await supabase.from("questions").insert([newItem]);
      if (error) {
        console.error("❌ Supabase保存エラー:", error);
        alert("保存に失敗しました。");
        return;
      }

      console.log("✅ Supabaseに保存:", newItem.question_text);
      await fetchQuestions();
      setNewQuestion("");
    } catch (err) {
      console.error("⚠️ 予期せぬエラー:", err);
    } finally {
      // ⏳ 少し遅らせて解除（連打防止）
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 500);
    }
  };

  // ❌ 質問削除（修正版：多重呼び出し防止）
  const handleDeleteQuestion = async (id: string, type: "roulette" | "slot") => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      const { error } = await supabase.from("questions").delete().eq("id", id);
      if (error) {
        console.error("❌ 削除エラー:", error);
        alert("削除に失敗しました。");
        return;
      }

      console.log("🗑️ 削除完了:", id);
      await fetchQuestions();
    } finally {
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 500);
    }
  };

  // ✏️ 編集開始
  const handleEditStart = (id: string, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  // 💾 編集保存
  const handleEditSave = async (id: string, type: "roulette" | "slot") => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    try {
      const { error } = await supabase
        .from("questions")
        .update({ question_text: editingText })
        .eq("id", id);

      if (error) {
        console.error("❌ 更新エラー:", error);
        alert("更新に失敗しました。");
        return;
      }

      console.log("✏️ 更新完了:", id);
      await fetchQuestions();
      setEditingId(null);
      setEditingText("");
    } finally {
      setTimeout(() => {
        isSubmittingRef.current = false;
      }, 500);
    }
  };

  // 💡 Supabase＋ローカル合算
  const mergedRoulette = [
    ...rouletteQuestions,
    ...questions.filter((q) => q.type === "roulette"),
  ];
  const mergedSlot = [
    ...slotQuestions,
    ...questions.filter((q) => q.type === "slot"),
  ];

  // 📊 カウント
  const rouletteCount = mergedRoulette.length;
  const rouletteUsed = mergedRoulette.filter((q) => q.used).length;
  const slotCount = mergedSlot.length;
  const slotUsed = mergedSlot.filter((q) => q.used).length;

  // 🎡 共通リストレンダリング関数
  const renderList = (
    data: (Question | DBQuestion)[],
    type: "roulette" | "slot"
  ) => (
    <ul>
      {data
        .filter((q) => (showUsed ? q.used : !q.used))
        .map((q) => {
          const text = "text" in q ? q.text : q.question_text;
          const isEditing = editingId === q.id;
          return (
            <li key={q.id} style={{ marginBottom: "0.5rem", opacity: showUsed ? 0.6 : 1 }}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={{ marginRight: "0.5rem" }}
                  />
                  <button
                    onClick={() => handleEditSave(q.id, type)}
                    style={{
                      backgroundColor: "#00b894",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      cursor: "pointer",
                      marginRight: "0.3rem",
                    }}
                  >
                    保存
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditingText("");
                    }}
                    style={{
                      backgroundColor: "#666",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      cursor: "pointer",
                    }}
                  >
                    キャンセル
                  </button>
                </>
              ) : (
                <>
                  {type === "roulette" ? "🎡" : "🎰"} {text}
                  <button
                    onClick={() => handleEditStart(q.id, text)}
                    style={{
                      marginLeft: "0.5rem",
                      backgroundColor: "#ffa502",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      cursor: "pointer",
                    }}
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(q.id, type)}
                    style={{
                      marginLeft: "0.3rem",
                      backgroundColor: "#ff5c5c",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      padding: "2px 6px",
                      cursor: "pointer",
                    }}
                  >
                    削除
                  </button>
                </>
              )}
            </li>
          );
        })}
    </ul>
  );

  return (
    <div className="app-container">
      {/* 🔙 戻るボタン */}
      <button className="back-button" onClick={() => router.push("/")}>
        ← 🎰 スロット画面に戻る
      </button>

      <header className="app-header">
        <h1>ルーレット＆スロット 質問管理</h1>
        <p>質問の追加・削除・編集ができます。</p>
      </header>

      <main className="app-main">
        <ToggleSwitch mode={mode} setMode={setMode} />

        {isRoulette ? (
          <section className="question-manager">
            <h2>🎡 ルーレットの質問管理</h2>
            <p>登録数: {rouletteCount} / 200</p>
            <p>使用済み: {rouletteUsed}</p>

            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="新しい質問を入力してください"
              />
              <button onClick={handleAddQuestion}>追加</button>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <button
                  onClick={() => setShowUsed(false)}
                  style={{
                    backgroundColor: !showUsed ? "#0070f3" : "#444",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🕹 未使用
                </button>
                <button
                  onClick={() => setShowUsed(true)}
                  style={{
                    backgroundColor: showUsed ? "#0070f3" : "#444",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ✅ 使用済み
                </button>
              </div>
              {renderList(mergedRoulette, "roulette")}
            </div>
          </section>
        ) : (
          <section className="question-manager">
            <h2>🎰 スロットの質問管理</h2>
            <p>登録数: {slotCount} / 200</p>
            <p>使用済み: {slotUsed}</p>

            <div style={{ marginTop: "1rem" }}>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="新しい質問を入力してください"
              />
              <button onClick={handleAddQuestion}>追加</button>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <button
                  onClick={() => setShowUsed(false)}
                  style={{
                    backgroundColor: !showUsed ? "#0070f3" : "#444",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  🎰 未使用
                </button>
                <button
                  onClick={() => setShowUsed(true)}
                  style={{
                    backgroundColor: showUsed ? "#0070f3" : "#444",
                    color: "white",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ✅ 使用済み
                </button>
              </div>
              {renderList(mergedSlot, "slot")}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
