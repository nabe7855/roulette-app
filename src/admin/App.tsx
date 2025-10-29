// Reactから必要な機能をインポートします。
// useState: コンポーネント内で状態（データ）を管理するために使います。
// useCallback: 関数の不要な再作成を防ぎ、パフォーマンスを向上させるために使います。
import React, { useState, useCallback } from 'react';

// 他のファイルからコンポーネントをインポートします。
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';

/**
 * アプリケーションのメインコンポーネント
 * このコンポーネントが、アプリ全体の中心的な役割を果たします。
 * ログインしているかどうかで、表示する画面を切り替えます。
 */
const App: React.FC = () => {
  // 認証状態を管理するための変数です。
  // `isAuthenticated`が`true`ならログイン済み、`false`なら未ログインと判断します。
  // `useState(false)`は、最初の状態が「未ログイン」であることを意味します。
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ログインエラーメッセージを管理するための変数です。
  const [error, setError] = useState('');

  /**
   * ログイン処理を行う関数
   * @param password - ユーザーが入力したパスワード
   */
  const handleLogin = useCallback((password: string) => {
    // ここでは簡単にするため、パスワードが'password'かどうかだけで認証しています。
    // 実際のアプリケーションでは、より安全な方法で認証を行います。
    if (password === 'password') {
      setIsAuthenticated(true); // 認証成功
      setError(''); // エラーメッセージをクリア
    } else {
      // パスワードが間違っていた場合
      setError('パスワードが無効です。ヒント：「password」です');
    }
  }, []); // []は、この関数が他の変数に依存していないことを示します。

  /**
   * ログアウト処理を行う関数
   */
  const handleLogout = useCallback(() => {
    setIsAuthenticated(false); // 認証状態を「未ログイン」に戻します。
  }, []); // []は、この関数が他の変数に依存していないことを示します。

  // 画面に表示する内容を返します。
  return (
    <>
      {/* 
        三項演算子という書き方で、条件によって表示する内容を変えています。
        「もし`isAuthenticated`が`true`なら、`AdminDashboard`を表示し、
        そうでなければ（`false`なら）、`LoginPage`を表示する」という意味です。
      */}
      {isAuthenticated ? (
        <AdminDashboard onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} error={error} />
      )}
    </>
  );
};

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default App;
