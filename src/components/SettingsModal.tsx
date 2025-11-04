import React from "react";
import AdminPanel from "../admin/components/AdminDashboard";

const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50 animate-fadeIn">
    <div className="bg-white text-gray-900 rounded-2xl shadow-2xl w-[95%] max-w-3xl p-6 border-4 border-blue-500 overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        ⚙️ 管理画面設定
      </h2>
      <AdminPanel onLogout={() => console.log("ログアウトしました")} />
      <div className="text-center mt-6">
        <button
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-transform hover:scale-105 shadow-md"
        >
          閉じる ✖
        </button>
      </div>
    </div>
  </div>
);

export default SettingsModal;
