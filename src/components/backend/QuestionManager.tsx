
import React, { useMemo } from 'react';
import { Question } from '../../types/types';
import AddQuestionForm from './AddQuestionForm';
import QuestionList from './QuestionList';
import ResetIcon from './icons/ResetIcon';

interface QuestionManagerProps {
  title: string;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const QuestionManager: React.FC<QuestionManagerProps> = ({ title, questions, setQuestions }) => {
  const addQuestion = (text: string) => {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      text,
      used: false,
    };
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const clearHistory = () => {
    setQuestions(prev => prev.map(q => ({ ...q, used: false })));
  };
  
  const usedCount = useMemo(() => questions.filter(q => q.used).length, [questions]);

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="text-sm text-gray-400 text-right flex-grow">
                <p>登録数: <span className="font-semibold text-white">{questions.length} / 200</span></p>
                <p>使用済み: <span className="font-semibold text-white">{usedCount}</span></p>
            </div>
            <button
                onClick={clearHistory}
                disabled={usedCount === 0}
                className="flex items-center gap-2 bg-yellow-600/80 text-white font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                <ResetIcon className="w-5 h-5" />
                履歴をクリア
            </button>
        </div>
      </div>
      
      <AddQuestionForm onAddQuestion={addQuestion} questionCount={questions.length} />
      
      <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
        <QuestionList questions={questions} onDeleteQuestion={deleteQuestion} />
      </div>
    </div>
  );
};

export default QuestionManager;
