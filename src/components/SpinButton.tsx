// Reactライブラリを読み込んでいます。
import React from 'react';

// このコンポーネントに渡されるデータ（props）の形を定義しています。
interface SpinButtonProps {
  onSpin: () => void; // ボタンがクリックされたときに呼ばれる関数
  isSpinning: boolean; // ルーレットが回転中かどうか
}

// SpinButtonコンポーネントを定義しています。
// ルーレットを回転させるためのボタンです。
const SpinButton: React.FC<SpinButtonProps> = ({ onSpin, isSpinning }) => {
  return (
    // <button> タグでボタンを作成します。
    <button
      onClick={onSpin} // クリックされたら onSpin 関数を実行します。
      disabled={isSpinning} // isSpinningがtrueの間は、ボタンを押せないようにします。
      // className="..." は、Tailwind CSSを使って見た目を整えています。
      // disabled:opacity-50 などは、disabled状態の時の見た目を指定しています。
      className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-xl sm:text-2xl rounded-lg shadow-lg hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transform transition-transform duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
    >
      {/* 
        isSpinning の状態によってボタンのテキストを切り替えています。
        trueなら「回転中...」、falseなら「スピン！」と表示します。
      */}
      {isSpinning ? '回転中...' : 'スピン！'}
    </button>
  );
};

// このコンポーネントを他のファイルでも使えるようにします。
export default SpinButton;
