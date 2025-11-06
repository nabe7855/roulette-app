
import React, { useState } from 'react';

interface AddQuestionFormProps {
  onAddQuestion: (text: string) => void;
  questionCount: number;
}

const AddQuestionForm: React.FC<AddQuestionFormProps> = ({ onAddQuestion, questionCount }) => {
  const [newQuestion, setNewQuestion] = useState('');
  const canAdd = questionCount < 200;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newQuestion.trim() && canAdd) {
      onAddQuestion(newQuestion.trim());
      setNewQuestion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={newQuestion}
        onChange={(e) => setNewQuestion(e.target.value)}
        placeholder={canAdd ? "新しい質問を入力してください..." : "登録上限に達しました"}
        disabled={!canAdd}
        className="flex-grow bg-gray-700 border border-gray-600 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        type="submit"
        disabled={!newQuestion.trim() || !canAdd}
        className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        追加
      </button>
    </form>
  );
};

export default AddQuestionForm;
