// Reactから必要な機能をインポートします。
// useState: コンポーネント内で状態（データ）を管理します。
// useMemo: 計算結果を記憶（メモ化）して、不要な再計算を防ぎパフォーマンスを向上させます。
// useCallback: 関数の不要な再作成を防ぎ、パフォーマンスを向上させます。
import React, { useState, useMemo, useCallback } from 'react';

// アプリケーションで使う型定義や定数をインポートします。
import type { Question, QuestionType } from '../types';
import { INITIAL_QUESTIONS, MAX_QUESTIONS, QUESTIONS_PER_PAGE } from '../constants';

// UIを構成する子コンポーネントをインポートします。
import Header from './Header';
import TabButton from './TabButton';
import Controls from './Controls';
import QuestionList from './QuestionList';
import Pagination from './Pagination';
import QuestionModal from './QuestionModal';
import ConfirmationDialog from './ConfirmationDialog';


// AdminDashboardコンポーネントが受け取るデータ（props）の型を定義します。
interface AdminDashboardProps {
  onLogout: () => void; // ログアウトを実行する関数
}

/**
 * 質問管理ダッシュボードのメインコンポーネント
 * 質問の表示、追加、編集、削除など、管理機能の全体を統括します。
 * @param {AdminDashboardProps} props - このコンポーネントが受け取るプロパティ。
 */
const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
    // --- 状態管理(useState) ---
    // ここで管理しているデータが変更されると、画面が自動的に再描画されます。

    // 全ての質問データを管理します。初期値として`INITIAL_QUESTIONS`を使います。
    const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
    // 検索バーに入力されたテキストを管理します。
    const [searchTerm, setSearchTerm] = useState('');
    // 現在表示しているページの番号を管理します。
    const [currentPage, setCurrentPage] = useState(1);
    // 現在選択されているタブ（'roulette' or 'slot'）を管理します。
    const [activeTab, setActiveTab] = useState<QuestionType>('roulette');
    // 編集中の質問データを管理します。新規追加の場合は`null`になります。
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    // 削除しようとしている質問のIDを管理します。削除確認ダイアログを表示するために使います。
    const [deletingQuestionId, setDeletingQuestionId] = useState<number | null>(null);
    // 質問追加・編集モーダル（ポップアップ画面）の表示状態を管理します。
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- データ加工(useMemo) ---
    // `questions`, `searchTerm`, `activeTab`が変更された時だけ再計算されます。

    // 表示する質問をフィルタリングします。
    const filteredQuestions = useMemo(() => {
        return questions
            .filter(q => q.type === activeTab) // 選択中のタブと同じタイプの質問だけを残す
            .filter(q => q.text.toLowerCase().includes(searchTerm.toLowerCase())); // 検索ワードを含む質問だけを残す
    }, [questions, searchTerm, activeTab]);

    // フィルタリングされた質問を、現在のページに合わせて切り出します。
    const paginatedQuestions = useMemo(() => {
        const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
        return filteredQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);
    }, [filteredQuestions, currentPage]);
    
    // 全ページ数を計算します。
    const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);

    // --- イベントハンドラ(useCallback) ---
    // これらの関数は、ユーザーの操作（クリックなど）によって呼び出されます。

    // タブがクリックされた時に呼ばれる関数
    const handleTabChange = (tab: QuestionType) => {
        setActiveTab(tab);
        setCurrentPage(1); // タブを切り替えたら、1ページ目に戻す
    }

    // 「質問を追加」ボタンが押された時に呼ばれる関数
    const handleAddQuestion = useCallback(() => {
        setEditingQuestion(null); // 編集中の質問はないのでnullに
        setIsModalOpen(true); // モーダルを開く
    }, []);

    // 質問の「編集」ボタンが押された時に呼ばれる関数
    const handleEditQuestion = useCallback((question: Question) => {
        setEditingQuestion(question); // 編集対象の質問をセット
        setIsModalOpen(true); // モーダルを開く
    }, []);

    // 質問の「削除」ボタンが押された時に呼ばれる関数
    const handleDeleteQuestion = useCallback((id: number) => {
        setDeletingQuestionId(id); // 削除対象の質問IDをセット（確認ダイアログが表示される）
    }, []);

    // 削除確認ダイアログで「削除を実行」が押された時に呼ばれる関数
    const confirmDelete = useCallback(() => {
        if (deletingQuestionId !== null) {
            setQuestions(prev => prev.filter(q => q.id !== deletingQuestionId)); // IDが一致しない質問だけを残す＝削除
            setDeletingQuestionId(null); // 削除対象IDをリセット
        }
    }, [deletingQuestionId]);
    
    // 質問追加・編集モーダルで「保存」が押された時に呼ばれる関数
    const handleSaveQuestion = useCallback((text: string, type: QuestionType) => {
        if (editingQuestion) {
            // 編集の場合
            setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? { ...q, text, type } : q));
        } else {
            // 新規追加の場合
             if (questions.length >= MAX_QUESTIONS) {
                alert(`${MAX_QUESTIONS}件より多くの質問は追加できません。`);
                return;
            }
            const newQuestion: Question = {
                id: Math.max(0, ...questions.map(q => q.id)) + 1, // 新しいIDを生成
                text,
                createdAt: new Date().toISOString().split('T')[0],
                type,
            };
            setQuestions(prev => [newQuestion, ...prev]); // 質問リストの先頭に追加
        }
    }, [editingQuestion, questions]);

    // --- レンダリング ---
    // 画面に表示するHTMLのようなものを返します (JSX)。
    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            <Header
                questionCount={questions.length}
                maxQuestions={MAX_QUESTIONS}
                onLogout={onLogout}
            />

            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
                    {/* タブ */}
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                            <TabButton label="ルーレット" isActive={activeTab === 'roulette'} onClick={() => handleTabChange('roulette')} />
                            <TabButton label="スロット" isActive={activeTab === 'slot'} onClick={() => handleTabChange('slot')} />
                        </nav>
                    </div>

                    <Controls
                        searchTerm={searchTerm}
                        onSearchTermChange={setSearchTerm}
                        onAddQuestion={handleAddQuestion}
                    />

                    <QuestionList
                        questions={paginatedQuestions}
                        onEdit={handleEditQuestion}
                        onDelete={handleDeleteQuestion}
                    />
                    
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                      />
                    )}
                </div>
            </main>
            
            <QuestionModal 
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveQuestion}
              question={editingQuestion}
              maxQuestions={MAX_QUESTIONS}
              currentQuestionCount={questions.length}
              activeTab={activeTab}
            />

            <ConfirmationDialog
              isOpen={deletingQuestionId !== null}
              onClose={() => setDeletingQuestionId(null)}
              onConfirm={confirmDelete}
              title="削除の確認"
              message="この質問を削除してもよろしいですか？この操作は元に戻せません。"
            />
        </div>
    );
};

export default AdminDashboard;
