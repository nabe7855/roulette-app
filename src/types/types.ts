// app/types.ts

// 🎰 シンボル（スロットなどで使う文字列）
export type Symbol = string;

// 🎮 アプリ全体のモード（ルーレット or スロット）
export enum AppMode {
  Roulette = "roulette",
  Slot = "slot",
}

// 🎯 ルーレットの1セグメント（区画）情報
export interface Segment {
  id: number; // ✅ number型に変更！
  label: string;
  color: string;
}


// 💬 質問（管理画面などで扱うデータ）
export interface Question {
  id: string;      // 質問の一意なID
  text: string;    // 質問本文
  used: boolean;   // すでに使用済みかどうか
}

// 🧩 将来拡張用：ゲーム全体の状態をまとめる型（オプション）
export interface GameState {
  mode: AppMode;         // 現在のモード
  segments: Segment[];   // ルーレット用データ
  questions: Question[]; // スロット用データ
}
