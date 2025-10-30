// このファイルは、アプリケーション全体で使われる「定数（ていすう）」をまとめています。
// 定数とは、一度決めたら変わらない値のことで、一か所にまとめておくと管理がしやすくなります。

// Segment型を他のファイルから読み込んでいます。
import { Segment } from './types';

// ルーレットのセクションで使う色の名前と、その具体的な色コード（16進数）を定義しています。
// Tailwind CSSというデザインツールで定義されている色に合わせています。
const COLORS = {
  red: '#ef4444',    // 赤色 (red-500)
  green: '#22c55e',  // 緑色 (green-500)
  yellow: '#facc15', // 黄色 (yellow-400)
  blue: '#2563eb',   // 青色 (blue-600)
  orange: '#f97316', // オレンジ色 (orange-500)
  purple: '#9333ea', // 紫色 (purple-600)
};

// ルーレットの各セクションに表示する内容を定義しています。
// Segment型で決めた通り、各セクションは `color` と `label` を持っています。
// このリストの順番で、ルーレットのセクションが時計回りに並びます。
export const SEGMENTS: Segment[] = [
  { color: COLORS.red, label: 'おしゃべり番長' },
  { color: COLORS.green, label: 'アイデアの泉' },
  { color: COLORS.yellow, label: '歩く辞書' },
  { color: COLORS.blue, label: 'ドジっ子天使' },
  { color: COLORS.orange, label: '天然記念物' },
  { color: COLORS.purple, label: '謎の覆面マスク' },
  { color: COLORS.red, label: 'ちょっといいとこ取り' },
  { color: COLORS.green, label: 'マイペースキングダム' },
  { color: COLORS.yellow, label: 'ポジティブサンシャイン' },
  { color: COLORS.blue, label: '食いしん坊探検隊' },
  { color: COLORS.orange, label: '夢見るラッコ' },
  { color: COLORS.purple, label: 'おっとり屋さん' },
  { color: COLORS.red, label: '宇宙飛行士' },
  { color: COLORS.green, label: '時間泥棒' },
  { color: COLORS.yellow, label: 'いたずら小僧' },
  { color: COLORS.blue, label: 'おしゃれクラス' },
  { color: COLORS.orange, label: 'お調子者ピエロ' },
  { color: COLORS.purple, label: 'みんなのまとめ役' },
];

// ルーレットが回転するアニメーションの時間（ミリ秒単位）を定義しています。
// 6000ミリ秒 = 6秒です。
export const SPIN_DURATION = 6000; // 6 seconds
