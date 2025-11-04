import { useState } from "react";

export function useSlot() {
  // 質問リスト
  const [questions] = useState<string[]>([
    "💬 好きな食べ物は？",
    "🌈 行ってみたい場所は？",
    "🔥 今年頑張りたいことは？",
    "🌙 今の気分は？",
  ]);

  // 選ばれた質問
  const [selectedQuestion, setSelectedQuestion] = useState<string>("");

  // スピン状態
  const [isSpinning, setIsSpinning] = useState(false);

  // レバー操作の無効化
  const [disabled, setDisabled] = useState(false);

  // スピン開始処理
  const onStart = () => {
    if (disabled) return;
    setIsSpinning(true);
    setDisabled(true);

    // 3秒後に結果を表示
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setSelectedQuestion(questions[randomIndex]);
      setIsSpinning(false);
      setDisabled(false);
    }, 3000);
  };

  return { questions, isSpinning, selectedQuestion, onStart, disabled };
}
