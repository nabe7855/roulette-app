// Reactの機能と、アプリケーションで使う「型」を読み込んでいます。
import React, { useEffect } from 'react';
import { Segment } from '../types';

// このコンポーネントに渡されるデータ（props）の形を定義しています。
interface WinnerModalProps {
  winner: Segment; // 当選したセクションの情報
  onClose: () => void; // モーダルを閉じる時に呼ばれる関数
}

// WinnerModalコンポーネントを定義しています。
// ルーレットが止まった後に、当選結果をポップアップで表示します。
const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
  
  // useEffectは、特定のタイミングで処理を実行するための機能です。
  // ここでは、このモーダルが表示された時に一度だけ実行されます。
  useEffect(() => {
    // キーボードが押されたときの処理を定義します。
    const handleKeyDown = (event: KeyboardEvent) => {
      // もし押されたキーが 'Escape' なら、モーダルを閉じる関数を実行します。
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // ブラウザのウィンドウ全体で、キーボードが押されるのを監視し始めます。
    window.addEventListener('keydown', handleKeyDown);

    // このモーダルが画面から消えるときに、後片付けの処理を実行します。
    // ここでは、キーボードの監視を停止しています。これを行わないと、不要な処理が残り続ける可能性があります。
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]); // [onClose] は、このuseEffectがonCloseの変更にのみ反応することを意味します。

  return (
    // ここからが画面に表示される内容です。
    // モーダル全体を覆う、半透明の背景です。
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in-fast"
      onClick={onClose} // 背景をクリックしてもモーダルが閉じるようにします。
      aria-modal="true"
      role="dialog"
    >
      {/* モーダルの本体（白い箱の部分）です。 */}
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8 w-full max-w-md text-center transform animate-scale-in"
        onClick={(e) => e.stopPropagation()} // 箱の中をクリックしたときに、背景のクリックイベントが発動しないようにします。
      >
        <h2 className="text-gray-400 text-lg mb-2">結果</h2>
        {/* 当選したセクションのラベルを表示します。 */}
        <p 
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold my-4 break-words" 
          // 当選したセクションの色を文字色に設定します。
          style={{ color: winner.color }}
        >
          {winner.label}
        </p>
        {/* 閉じるボタンです。 */}
        <button
          onClick={onClose}
          className="mt-6 w-full px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-lg sm:text-xl rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transform transition-transform duration-200 hover:scale-105"
        >
          閉じる
        </button>
      </div>
      {/* 
        モーダルが表示されるときのアニメーション（フェードイン、スケールアップ）を
        CSSで定義しています。
      */}
      <style>{`
          @keyframes fade-in-fast {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in-fast {
            animation: fade-in-fast 0.3s ease-out forwards;
          }
          @keyframes scale-in {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-scale-in {
             animation: scale-in 0.3s ease-out forwards;
          }
       `}</style>
    </div>
  );
};

// このコンポーネントを他のファイルでも使えるようにします。
export default WinnerModal;
