"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./ResetUsedQuestionsButton.module.css"; // ← 追加

export default function ResetUsedQuestionsButton({
  onResetDone,
}: {
  onResetDone?: () => void;
}) {
  const supabase = createClientComponentClient();

  const handleResetUsedQuestions = async () => {
    const { error } = await supabase
      .from("questions")
      .update({ used: false })
      .eq("used", true)
      .eq("type", "roulette");

    if (error) {
      console.error("❌ Supabaseエラー:", error);
      alert("リセットに失敗しました😢");
    } else {
      alert("使用済みをリセットしました✨");
      if (onResetDone) onResetDone();
    }
  };

return (
  <button
    onClick={handleResetUsedQuestions}
    className={styles.resetButton} // ← ここをCSSで管理に変更
  >
    ♻️ 使用済みをリセット
  </button>
);

}
