// Reactから必要な機能をインポートします。
import React, { useState, useEffect } from 'react';
// 型定義と汎用モーダルコンポーネントをインポートします。
import type { Question, QuestionType } from '../types';
import Modal from '../../Modal';

// QuestionModalコンポーネントが受け取るデータ（props）の型を定義します。
interface QuestionModalProps {
  isOpen: boolean; // モーダルが開いているかどうか
  onClose: () => void; // モーダルを閉じるための関数
  onSave: (questionText: string, type: QuestionType) => void; // 質問を保存するための関数
  question: Question | null; // 編集対象の質問データ（新規追加の場合はnull）
  maxQuestions: number; // 登録できる質問の最大数
  currentQuestionCount: number; // 現在の質問数
  activeTab: QuestionType; // 現在選択されているタブの種類
}

/**
 * 質問の新規追加または編集を行うためのモーダル（ポップアップ）コンポーネント
 * @param {QuestionModalProps} props - このコンポーネントが受け取るプロパティ。
 */
const QuestionModal: React.FC<QuestionModalProps> = ({ isOpen, onClose, onSave, question, maxQuestions, currentQuestionCount, activeTab }) => {
    // 入力された質問テキストの状態を管理します。
    const [text, setText] = useState('');
    // 選択された質問の種別（ルーレット or スロット）の状態を管理します。
    const [type, setType] = useState<QuestionType>(activeTab);
    // エラーメッセージの状態を管理します。
    const [error, setError] = useState('');

    // `question`（編集対象）やモーダルの表示状態が変わった時に実行される副作用フック
    useEffect(() => {
        // 編集対象の質問があればそのテキストとタイプを、なければ空文字と現在のアクティブなタブをセットします。
        setText(question?.text || '');
        setType(question?.type || activeTab);
        setError(''); // エラーメッセージをリセット
    }, [question, isOpen, activeTab]);

    // モーダルが編集モードかどうかを判定します。
    const isEditing = !!question;
    // 質問数が上限に達しているかどうかを判定します（新規追加時のみ）。
    const isAtLimit = !isEditing && currentQuestionCount >= maxQuestions;

    /**
     * 保存ボタンがクリックされたときに実行される関数
     */
    const handleSubmit = () => {
        // 入力値のバリデーション（検証）
        if (text.trim().length === 0) {
            setError('質問テキストは空にできません。');
            return;
        }
        if (text.length > 500) {
            setError('質問テキストは500文字を超えることはできません。');
            return;
        }
        if(isAtLimit) {
            setError(`新しい質問は追加できません。上限の${maxQuestions}件に達しました。`);
            return;
        }
        // 親コンポーネントから渡された保存関数を実行
        onSave(text, type);
        onClose(); // モーダルを閉じる
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? '質問を編集' : '新しい質問を追加'}>
            <div className="space-y-4">
                 {/* 質問種別選択ラジオボタン */}
                 <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">種別</label>
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input 
                                type="radio" 
                                name="questionType" 
                                value="roulette" 
                                checked={type === 'roulette'}
                                onChange={() => setType('roulette')}
                                className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">ルーレット</span>
                        </label>
                        <label className="flex items-center">
                            <input 
                                type="radio" 
                                name="questionType" 
                                value="slot" 
                                checked={type === 'slot'}
                                onChange={() => setType('slot')}
                                className="form-radio h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-gray-700">スロット</span>
                        </label>
                    </div>
                </div>
                {/* 質問テキスト入力エリア */}
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="質問テキストを入力..."
                    maxLength={500}
                    disabled={isAtLimit}
                />
                <div className="text-right text-sm text-gray-500">{text.length} / 500</div>
                 {error && <p className="text-red-500 text-sm">{error}</p>}
                {/* ボタンエリア */}
                <div className="flex justify-end space-x-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">キャンセル</button>
                    <button onClick={handleSubmit} disabled={isAtLimit} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors">質問を保存</button>
                </div>
            </div>
        </Modal>
    );
};

export default QuestionModal;
