// Reactライブラリを読み込んでいます。
import React from 'react';
// このアプリケーションで使う各部品（コンポーネント）を読み込んでいます。
import RouletteWheel from './components/RouletteWheel'; // ルーレット盤
import WinnerModal from './components/WinnerModal';   // 結果表示モーダル
import Header from './components/Header';             // ヘッダー（タイトル）
import SegmentControl from './components/SegmentControl'; // セクション数コントローラー
import SpinButton from './components/SpinButton';       // スピンボタン
// ルーレットの複雑なロジックをまとめたカスタムフックを読み込んでいます。
import { useRoulette } from './hooks/useRoulette';

// Appコンポーネントを定義しています。これがアプリケーションの本体です。
const App: React.FC = () => {
  // useRouletteフックを呼び出して、ルーレットの状態や操作関数を取得します。
  // これにより、Appコンポーネントはロジックの詳細を知らなくても、
  // 必要な値や関数を使うだけでよくなります。
  const {
    rotation, // ルーレットの現在の回転角度
    isSpinning, // 回転中かどうかのフラグ
    winner, // 当選したセクションの情報
    isModalOpen, // モーダルが開いているかどうかのフラグ
    numberOfSegments, // 現在のセクション数
    currentSegments, // 現在表示されているセクションのリスト
    handleSpin, // スピンを開始する関数
    handleCloseModal, // モーダルを閉じる関数
    handleNumberOfSegmentsChange, // セクション数を変更する関数
  } = useRoulette();

  // return の中が、実際に画面に表示される内容です。
  return (
    // 全体を囲むdiv要素。Tailwind CSSで背景色やレイアウトを設定しています。
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 font-sans">
      {/* ヘッダーコンポーネントを表示します。 */}
      <Header />
      
      {/* メインコンテンツ部分 */}
      <main className="flex flex-col items-center space-y-6 sm:space-y-8 w-full">
        {/* ルーレット盤コンポーネントを表示します。現在のセクションと回転角度を渡しています。 */}
        <RouletteWheel segments={currentSegments} rotation={rotation} />

        {/* コントロール部分（セクション数入力とスピンボタン） */}
        <div className="flex flex-col items-center space-y-6 w-full max-w-md">
          {/* セクション数コントロールコンポーネントを表示します。 */}
          <SegmentControl
            numberOfSegments={numberOfSegments}
            onNumberOfSegmentsChange={handleNumberOfSegmentsChange}
            isSpinning={isSpinning}
          />
          {/* スピンボタンコンポーネントを表示します。 */}
          <SpinButton onSpin={handleSpin} isSpinning={isSpinning} />
        </div>
      </main>

      {/* 
        条件付きレンダリング: 
        `winner` に情報があり、かつ `isModalOpen` が true の場合のみ、
        WinnerModalコンポーネントを表示します。
      */}
      {winner && isModalOpen && (
        <WinnerModal winner={winner} onClose={handleCloseModal} />
      )}
    </div>
  );
};

// このAppコンポーネントを他のファイルでも使えるようにします。
export default App;
