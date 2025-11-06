
import React from 'react';
import { Question } from '../../types/types';
import TrashIcon from './icons/TrashIcon';

interface QuestionListProps {
  questions: Question[];
  onDeleteQuestion: (id: string) => void;
}

const QuestionItem: React.FC<{ question: Question; onDelete: () => void; index: number }> = ({ question, onDelete, index }) => (
  <li className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${question.used ? 'bg-gray-800' : 'bg-gray-700/50 hover:bg-gray-700'}`}>
    <span className={`flex-grow ${question.used ? 'line-through text-gray-500' : 'text-gray-200'}`}>
      <span className="font-mono text-gray-400 mr-3">{String(index + 1).padStart(3, '0')}</span>
      {question.text}
    </span>
    <button
      onClick={onDelete}
      className="text-gray-500 hover:text-red-500 transition-colors duration-200 p-1"
      aria-label="質問を削除"
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  </li>
);

const QuestionList: React.FC<QuestionListProps> = ({ questions, onDeleteQuestion }) => {
  if (questions.length === 0) {
    return <p className="text-center text-gray-500 py-10">まだ質問が登録されていません。</p>;
  }

  return (
    <ul className="space-y-2">
      {questions.map((q, index) => (
        <QuestionItem 
          key={q.id}
          question={q}
          index={index}
          onDelete={() => onDeleteQuestion(q.id)}
        />
      ))}
    </ul>
  );
};

export default QuestionList;
