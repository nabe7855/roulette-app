// Reactを動かすために必要なライブラリを読み込んでいます。
import React from 'react';
import ReactDOM from 'react-dom/client';
// アプリケーションの本体である App コンポーネントを読み込んでいます。
import App from './App';

// public/index.html ファイル内にある、idが'root'の要素を探します。
// ここが、Reactアプリケーションが描画される場所になります。
const rootElement = document.getElementById('root');
// もし'root'要素が見つからなかった場合は、エラーを出して処理を止めます。
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// 見つかった'root'要素を、Reactが管理できる領域（ルート）として設定します。
const root = ReactDOM.createRoot(rootElement);

// 作成したルートに、<App /> コンポーネントを描画（レンダリング）するよう指示します。
// <React.StrictMode>で囲むと、開発中に問題となりそうな点をReactが警告してくれるようになります。
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
