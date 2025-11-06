'use client';
import React from "react";
import AdminDashboard from "@/admin/components/AdminDashboard";

export default function AdminPage() {
  // ログアウト処理（今は仮の動作でOK）
  const handleLogout = () => {
    console.log("ログアウトしました！");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        ⚙ 管理画面ダッシュボード
      </h1>

      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl p-8">
        <AdminDashboard onLogout={handleLogout} />
      </div>
    </div>
  );
}
