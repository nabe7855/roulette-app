// Reactライブラリをインポートします。
import React from 'react';

// Paginationコンポーネントが受け取るデータ（props）の型を定義します。
interface PaginationProps {
  currentPage: number; // 現在のページ番号
  totalPages: number;  // 全体のページ数
  onPageChange: (page: number) => void; // ページ番号が変更されたときに呼ばれる関数
}

/**
 * ページネーション（ページ送り）を表示・操作するためのコンポーネント
 * @param {PaginationProps} props - このコンポーネントが受け取るプロパティ。
 */
const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // 前のページへ移動する処理
  const goToPreviousPage = () => {
    // 現在のページが1より大きい場合のみ、ページ番号を1減らす
    onPageChange(Math.max(1, currentPage - 1));
  };

  // 次のページへ移動する処理
  const goToNextPage = () => {
    // 現在のページが総ページ数より小さい場合のみ、ページ番号を1増やす
    onPageChange(Math.min(totalPages, currentPage + 1));
  };
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 sm:gap-0">
      {/* 現在のページと総ページ数を表示 */}
      <span className="text-sm text-gray-700">
        ページ <span className="font-semibold">{currentPage}</span> / <span className="font-semibold">{totalPages}</span>
      </span>
      
      {/* ページ移動ボタン */}
      <div className="flex space-x-2">
        <button 
          onClick={goToPreviousPage} 
          disabled={currentPage === 1} // 最初のページでは「前へ」ボタンを無効化
          className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          前へ
        </button>
        <button 
          onClick={goToNextPage} 
          disabled={currentPage === totalPages} // 最後のページでは「次へ」ボタンを無効化
          className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          次へ
        </button>
      </div>
    </div>
  );
};

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default Pagination;
