// Reactから必要な機能をインポートします。
// useState: コンポーネント内で状態（データ）を管理するために使います。
import React, { useState } from 'react';

// LoginPageコンポーネントが受け取るデータ（props）の型を定義します。
interface LoginPageProps {
    onLogin: (password: string) => void; // ログインを試みるための関数
    error: string; // 表示するエラーメッセージ
}

/**
 * ログイン画面を表示するためのコンポーネント
 * @param {LoginPageProps} props - このコンポーネントが受け取るプロパティ。
 */
const LoginPage: React.FC<LoginPageProps> = ({ onLogin, error }) => {
    // ユーザー名入力フィールドの状態を管理します。初期値は'admin'です。
    const [username, setUsername] = useState('admin');
    // パスワード入力フィールドの状態を管理します。初期値は空です。
    const [password, setPassword] = useState('');

    /**
     * フォームが送信されたとき（ログインボタンが押されたとき）に実行される関数
     * @param e - フォーム送信イベントのオブジェクト
     */
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // フォーム送信時のページの再読み込みを防ぎます。
        onLogin(password); // 親コンポーネントから渡されたonLogin関数を呼び出します。
    };

    // 画面に表示する内容（ログインフォーム）を返します。
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">管理者ログイン</h1>
                <p className="text-center text-gray-500 mb-8">質問管理ダッシュボード</p>
                <form onSubmit={handleSubmit}>
                    {/* ユーザー名入力欄 */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            ユーザー名
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin"
                            readOnly // このフィールドは編集不可にしています。
                        />
                    </div>
                    {/* パスワード入力欄 */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            パスワード
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="password"
                        />
                    </div>
                    {/* エラーメッセージ（エラーがある場合のみ表示） */}
                    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
                    {/* サインインボタン */}
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                        >
                            サインイン
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default LoginPage;
