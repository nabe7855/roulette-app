"use client";

import React, { useEffect, useState } from "react";
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

  // ✏️ 入力・状態管理
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<DBQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  const isRoulette = mode === AppMode.Roulette;

  // 🎯 Supabaseから質問取得
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
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 💾 質問追加（Supabase + ローカル両方）
  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;

    const newItem: DBQuestion = {
      id: crypto.randomUUID(),
      question_text: newQuestion,
      used: false,
      type: isRoulette ? "roulette" : "slot",
    };

    // ローカル保存
    const localItem: Question = {
      id: newItem.id,
      text: newItem.question_text,
      used: newItem.used,
    };

    if (isRoulette) {
      setRouletteQuestions([...rouletteQuestions, localItem]);
    } else {
      setSlotQuestions([...slotQuestions, localItem]);
    }

    // Supabase保存
    const { error } = await supabase.from("questions").insert([
      {
        id: newItem.id,
        question_text: newItem.question_text,
        used: newItem.used,
        type: newItem.type,
      },
    ]);

    if (error) {
      console.error("❌ Supabase保存エラー:", error);
      alert("保存に失敗しました。");
    } else {
      console.log("✅ Supabaseに保存:", newItem.question_text);
      await fetchQuestions();
      setNewQuestion("");
    }
  };

  // ❌ 削除機能（Supabase & ローカル両方から）
  const handleDeleteQuestion = async (id: string, type: "roulette" | "slot") => {
    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (error) {
      console.error("❌ 削除エラー:", error);
      alert("削除に失敗しました。");
      return;
    }

    if (type === "roulette") {
      setRouletteQuestions(rouletteQuestions.filter((q) => q.id !== id));
    } else {
      setSlotQuestions(slotQuestions.filter((q) => q.id !== id));
    }

    console.log("🗑️ 削除完了:", id);
    await fetchQuestions();
  };

  // 💡 Supabase + ローカルを合算してカウント
  const mergedRoulette = [
    ...rouletteQuestions,
    ...questions.filter((q) => q.type === "roulette"),
  ];
  const mergedSlot = [
    ...slotQuestions,
    ...questions.filter((q) => q.type === "slot"),
  ];

  const rouletteCount = mergedRoulette.length;
  const rouletteUsed = mergedRoulette.filter((q) => q.used).length;

  const slotCount = mergedSlot.length;
  const slotUsed = mergedSlot.filter((q) => q.used).length;

  return (
    <div className="app-container">
      {/* 🔙 左上固定の戻るボタン */}
      <button className="back-button" onClick={() => router.push("/")}>
        ← 🎰 スロット画面に戻る
      </button>

      <header className="app-header">
        <h1>ルーレット＆スロット 質問管理</h1>
        <p>ゲームモードを選択して、質問を管理してください。</p>
      </header>

      <main className="app-main">
        <ToggleSwitch mode={mode} setMode={setMode} />

        {isRoulette ? (
          <section className="question-manager">
            <h2>ルーレットの質問管理</h2>
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

            <ul style={{ marginTop: "1rem" }}>
              {mergedRoulette.map((q) => (
                <li key={q.id} style={{ marginBottom: "0.5rem" }}>
🎡 {"text" in q ? q.text : q.question_text}
                  <button
                    onClick={() => handleDeleteQuestion(q.id, "roulette")}
                    style={{
                      marginLeft: "0.5rem",
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
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="question-manager">
            <h2>スロットの質問管理</h2>
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

            <ul style={{ marginTop: "1rem" }}>
              {mergedSlot.map((q) => (
                <li key={q.id} style={{ marginBottom: "0.5rem" }}>
🎰 {"text" in q ? q.text : q.question_text}
                  <button
                    onClick={() => handleDeleteQuestion(q.id, "slot")}
                    style={{
                      marginLeft: "0.5rem",
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
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
