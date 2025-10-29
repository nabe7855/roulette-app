// Reactライブラリをインポートします。
import React from 'react';
// アイコンコンポーネントをインポートします。
import { LogoutIcon } from './icons';

// Headerコンポーネントが受け取るデータ（props）の型を定義します。
interface HeaderProps {
  questionCount: number;  // 現在の質問の総数
  maxQuestions: number;     // 登録できる質問の最大数
  onLogout: () => void;     // ログアウト処理を実行する関数
}

/**
 * ダッシュボードの上部に表示されるヘッダーコンポーネント
 * @param {HeaderProps} props - このコンポーネントが受け取るプロパティ。
 */
const Header: React.FC<HeaderProps> = ({ questionCount, maxQuestions, onLogout }) => {
  // 質問数が上限の90%を超えたかどうかを判定します。
  const isApproachingLimit = questionCount > maxQuestions * 0.9;

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center py-4 gap-4 sm:gap-0">
          {/* ページのタイトル */}
          <h1 className="text-2xl font-bold text-gray-800 text-center sm:text-left">質問ダッシュボード</h1>
          
          {/* 右側の情報エリア */}
          <div className="w-full sm:w-auto flex justify-between sm:justify-end items-center space-x-4">
            {/* 質問数の表示 */}
            <div className="text-sm font-medium">
              <span className={isApproachingLimit ? 'text-red-500' : 'text-gray-600'}>
                合計: {questionCount}/{maxQuestions}
              </span>
            </div>
            {/* ログアウトボタン */}
            <button onClick={onLogout} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <LogoutIcon />
              <span className="hidden sm:inline">ログアウト</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default Header;
