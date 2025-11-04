// Reactライブラリをインポートします。
import React from 'react';
// アイコンコンポーネントをインポートします。
import { AddIcon, SearchIcon } from './icons';

// Controlsコンポーネントが受け取るデータ（props）の型を定義します。
interface ControlsProps {
  searchTerm: string; // 現在の検索キーワード
  onSearchTermChange: (term: string) => void; // 検索キーワードが変更されたときに呼ばれる関数
  onAddQuestion: () => void; // 「質問を追加」ボタンがクリックされたときに呼ばれる関数
}

/**
 * 検索バーと追加ボタンを持つコントロールパネルコンポーネント
 * @param {ControlsProps} props - このコンポーネントが受け取るプロパティ。
 */
const Controls: React.FC<ControlsProps> = ({ searchTerm, onSearchTermChange, onAddQuestion }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
      {/* 検索入力フィールド */}
      <div className="relative w-full sm:w-auto flex-grow sm:max-w-xs">
        <input
          type="text"
          placeholder="質問を検索..."
          value={searchTerm}
          onChange={e => onSearchTermChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {/* 検索アイコン */}
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
      
      {/* 質問追加ボタン */}
      <button
        onClick={onAddQuestion}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105 shadow-md"
      >
        <AddIcon />
        <span>質問を追加</span>
      </button>
    </div>
  );
};

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default Controls;
