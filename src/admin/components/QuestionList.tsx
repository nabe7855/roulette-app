// Reactライブラリをインポートします。
import React from 'react';
// 質問データの型定義とアイコンコンポーネントをインポートします。
import type { Question } from '../types';
import { EditIcon, DeleteIcon } from './icons';

// QuestionListコンポーネントが受け取るデータ（props）の型を定義します。
interface QuestionListProps {
  questions: Question[];         // 表示する質問のリスト
  onEdit: (question: Question) => void; // 編集ボタンがクリックされたときに呼ばれる関数
  onDelete: (id: number) => void;       // 削除ボタンがクリックされたときに呼ばれる関数
}

/**
 * 質問の一覧を表示するコンポーネント
 * 画面サイズに応じて、カード形式（モバイル）とテーブル形式（PC）を切り替えます。
 * @param {QuestionListProps} props - このコンポーネントが受け取るプロパティ。
 */
const QuestionList: React.FC<QuestionListProps> = ({ questions, onEdit, onDelete }) => {
  // 表示する質問がない場合のメッセージ
  if (questions.length === 0) {
    return <div className="text-center py-10 text-gray-500">質問が見つかりません。</div>;
  }

  return (
    <div className="flow-root">
      {/* --- モバイル用のカード表示 (mdサイズ未満で表示) --- */}
      <div className="space-y-4 md:hidden">
        {questions.map(q => (
          <div key={q.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800 text-sm break-words mb-3">{q.text}</p>
            <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
              <span className="text-xs text-gray-500">作成日: {q.createdAt}</span>
              <div className="flex items-center space-x-1">
                <button onClick={() => onEdit(q)} className="text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors"><EditIcon className="w-5 h-5"/></button>
                <button onClick={() => onDelete(q.id)} className="text-red-600 p-2 rounded-full hover:bg-red-100 transition-colors"><DeleteIcon className="w-5 h-5"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- PC用のテーブル表示 (mdサイズ以上で表示) --- */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">質問テキスト</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作成日</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {questions.map(q => (
              <tr key={q.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-700 max-w-xl break-words">{q.text}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{q.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => onEdit(q)} className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-100 transition-colors"><EditIcon /></button>
                    <button onClick={() => onDelete(q.id)} className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default QuestionList;
