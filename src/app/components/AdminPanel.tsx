import React, { useState } from 'react';
import Modal from './Modal';
import { ADMIN_PASSWORD, MAX_QUESTIONS } from '../../../constants';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  questions: string[];
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose, questions, setQuestions }) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('パスワードが違います。');
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() && questions.length < MAX_QUESTIONS) {
      setQuestions(prev => [...prev, newQuestion.trim()]);
      setNewQuestion('');
    }
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingText(questions[index]);
  };

  const handleSaveEdit = (index: number) => {
    if (editingText.trim()) {
      const updatedQuestions = [...questions];
      updatedQuestions[index] = editingText.trim();
      setQuestions(updatedQuestions);
      setEditingIndex(null);
      setEditingText('');
    }
  };

  const handleDelete = (index: number) => {
    if (window.confirm('この質問を削除してもよろしいですか？')) {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const renderLogin = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-600">パスワード</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 p-2"
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors">
        ログイン
      </button>
    </form>
  );

  const renderAdminView = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">新しい質問を追加 ({questions.length}/{MAX_QUESTIONS})</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="新しい質問を入力"
            className="flex-grow bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 p-2"
            disabled={questions.length >= MAX_QUESTIONS}
          />
          <button onClick={handleAddQuestion} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled={questions.length >= MAX_QUESTIONS}>
            追加
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2 text-gray-700">質問を管理</h3>
        <ul className="space-y-2 max-h-80 overflow-y-auto pr-2">
          {questions.map((q, index) => (
            <li key={index} className="bg-white p-3 rounded-md flex items-center justify-between gap-2 border border-gray-200">
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-grow bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 p-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(index)}
                />
              ) : (
                <span className="flex-grow">{q}</span>
              )}
              <div className="flex gap-2 flex-shrink-0">
                {editingIndex === index ? (
                  <button onClick={() => handleSaveEdit(index)} className="text-green-600 hover:text-green-500 transition-colors font-medium">保存</button>
                ) : (
                  <button onClick={() => handleEdit(index)} className="text-yellow-600 hover:text-yellow-500 transition-colors font-medium">編集</button>
                )}
                <button onClick={() => handleDelete(index)} className="text-red-600 hover:text-red-500 transition-colors font-medium">削除</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="管理パネル">
      {isAuthenticated ? renderAdminView() : renderLogin()}
    </Modal>
  );
};

export default AdminPanel;