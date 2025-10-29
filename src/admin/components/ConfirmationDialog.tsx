// Reactライブラリと汎用モーダルコンポーネントをインポートします。
import React from 'react';
import Modal from './Modal';

// ConfirmationDialogコンポーネントが受け取るデータ（props）の型を定義します。
interface ConfirmationDialogProps {
  isOpen: boolean;      // ダイアログが開いているかどうか
  onClose: () => void;    // ダイアログを閉じるための関数
  onConfirm: () => void;  // 確認（削除実行）ボタンが押されたときの関数
  title: string;        // ダイアログのタイトル
  message: string;      // 表示する確認メッセージ
}

/**
 * 操作の実行前に確認を求めるためのダイアログコンポーネント
 * @param {ConfirmationDialogProps} props - このコンポーネントが受け取るプロパティ。
 */
const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  // isOpenがfalseの場合は何も表示しない
  if (!isOpen) return null;

  return (
    // 汎用的なModalコンポーネントを土台として使います
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      {/* 確認メッセージ */}
      <p className="text-gray-600 mb-6">{message}</p>
      
      {/* ボタンエリア */}
      <div className="flex justify-end space-x-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">キャンセル</button>
        <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">削除を実行</button>
      </div>
    </Modal>
  );
};

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default ConfirmationDialog;
