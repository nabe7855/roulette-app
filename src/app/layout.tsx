// src/app/admin/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";

// 🌐 Googleフォント設定（全体共通）
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 🧠 メタデータ（タイトル・説明）
export const metadata: Metadata = {
  title: "質問管理 | 質問ルーレット＆スロット",
  description: "ルーレット・スロット用の質問を管理するページ",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8`}
      >
        {/* 共通フォントを維持しつつ、admin専用デザインを適用 */}
        {children}
      </body>
    </html>
  );
}
