"use client";

import React, { useState, useMemo, useCallback } from "react";
import styles from "./AdminDashboard.module.css";

import type { Question, QuestionType } from "../types";
import {
  INITIAL_QUESTIONS,
  MAX_QUESTIONS,
  QUESTIONS_PER_PAGE,
} from "../constants";

import Header from "./Header";
import TabButton from "./TabButton";
import Controls from "./Controls";
import QuestionList from "./QuestionList";
import Pagination from "./Pagination";
import QuestionModal from "./QuestionModal";
import ConfirmationDialog from "./ConfirmationDialog";

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<QuestionType>("roulette");
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [deletingQuestionId, setDeletingQuestionId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredQuestions = useMemo(() => {
    return questions
      .filter((q) => q.type === activeTab)
      .filter((q) => q.text.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [questions, searchTerm, activeTab]);

  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
    return filteredQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);
  }, [filteredQuestions, currentPage]);

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);

  const handleTabChange = (tab: QuestionType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleAddQuestion = useCallback(() => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  }, []);

  const handleEditQuestion = useCallback((question: Question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  }, []);

  const handleDeleteQuestion = useCallback((id: number) => {
    setDeletingQuestionId(id);
  }, []);

  const confirmDelete = useCallback(() => {
    if (deletingQuestionId !== null) {
      setQuestions((prev) => prev.filter((q) => q.id !== deletingQuestionId));
      setDeletingQuestionId(null);
    }
  }, [deletingQuestionId]);

  const handleSaveQuestion = useCallback(
    (text: string, type: QuestionType) => {
      if (editingQuestion) {
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === editingQuestion.id ? { ...q, text, type } : q
          )
        );
      } else {
        if (questions.length >= MAX_QUESTIONS) {
          alert(`${MAX_QUESTIONS}件より多くの質問は追加できません。`);
          return;
        }
        const newQuestion: Question = {
          id: Math.max(0, ...questions.map((q) => q.id)) + 1,
          text,
          createdAt: new Date().toISOString().split("T")[0],
          type,
        };
        setQuestions((prev) => [newQuestion, ...prev]);
      }
      setIsModalOpen(false);
    },
    [editingQuestion, questions]
  );

  return (
    <div className={styles.modalContainer}>
      <div className={styles.dashboardInner}>
        <Header
          questionCount={questions.length}
          maxQuestions={MAX_QUESTIONS}
          onLogout={onLogout}
        />

        <main className={styles.main}>
          <div className={styles.panel}>
            {/* タブ */}
            <div className={styles.tabContainer}>
              <nav className={styles.tabs} aria-label="Tabs">
                <TabButton
                  label="ルーレット"
                  isActive={activeTab === "roulette"}
                  onClick={() => handleTabChange("roulette")}
                />
                <TabButton
                  label="スロット"
                  isActive={activeTab === "slot"}
                  onClick={() => handleTabChange("slot")}
                />
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
    </div>
  );
};

export default AdminDashboard;
