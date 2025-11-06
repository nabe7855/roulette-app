"use client";


import React from "react";
import Modal from "../Modal"; // ← 直下に置いたModal.tsxを使う
import AdminDashboard from "../admin/components/AdminDashboard";

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <Modal isOpen={true} onClose={onClose} title="⚙️ 管理画面設定">
      <div className="max-h-[70vh] overflow-y-auto p-2">
        {/* 🩵 AdminDashboardの背景と高さ指定を無効化するためのラッパ */}
        <div className="bg-gray-50 rounded-lg shadow-inner p-4">
          <AdminDashboard onLogout={() => console.log("ログアウトしました")} />
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
