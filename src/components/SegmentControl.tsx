// Reactライブラリと、アプリケーションの定数を読み込んでいます。
import React from 'react';
import { SEGMENTS } from "../constants";


// このコンポーネントに渡されるデータ（props）の形を定義しています。
interface SegmentControlProps {
  numberOfSegments: number; // 現在のセクション数
  onNumberOfSegmentsChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // セクション数が変更されたときに呼ばれる関数
  isSpinning: boolean; // ルーレットが回転中かどうか
}

// SegmentControlコンポーネントを定義しています。
// ルーレットのセクション数をユーザーが変更するための入力欄を提供します。
const SegmentControl: React.FC<SegmentControlProps> = ({
  numberOfSegments,
  onNumberOfSegmentsChange,
  isSpinning,
}) => {
  return (
    // <div> で全体を囲んでいます。
    <div className="w-full">
      {/* <label> は、入力欄が何のためのものかを示すテキストです。 */}
      <label htmlFor="segments-count" className="block mb-2 text-sm font-medium text-gray-400">
        セクション数 (2〜{SEGMENTS.length})
      </label>
      {/* <input> が実際の入力欄です。 */}
      <input
        type="number" // 数値のみ入力できるようにします。
        id="segments-count" // labelと紐付けるためのIDです。
        value={numberOfSegments} // 表示する値
        onChange={onNumberOfSegmentsChange} // 値が変更されたときに実行する関数
        min="2" // 入力できる最小値
        max={SEGMENTS.length} // 入力できる最大値
        disabled={isSpinning} // isSpinningがtrueの間は、入力欄を操作不可にします。
        // className="..." は、Tailwind CSSを使って見た目を整えています。
        className="w-full px-4 py-2 sm:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

// このコンポーネントを他のファイルでも使えるようにします。
export default SegmentControl;
