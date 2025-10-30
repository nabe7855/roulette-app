export type Symbol = string;
export enum AppMode {
  Roulette = "roulette",
  Slot = "slot",
}
// 🎯 ルーレットのセグメント（1区画）の型
export interface Segment {
  label: string; // 表示する文字
  color: string; // 背景色（例: "#FF0000"）
}
