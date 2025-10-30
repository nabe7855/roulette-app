// Reactライブラリを読み込んでいます。
import React from 'react';

// Headerコンポーネントを定義しています。
// このコンポーネントは、ページのタイトルとサブタイトルを表示する役割だけを持っています。
const Header: React.FC = () => {
  return (
    // <header> タグは、ページのヘッダー部分であることを示します。
    // className="..." は、Tailwind CSSを使って見た目を整えています。
    <header className="text-center">
      {/* <h1> タグは、最も重要な見出し（タイトル）を示します。 */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        運命のルーレット
      </h1>
      {/* <p> タグは、段落（パラグラフ）を示します。ここではサブタイトルとして使っています。 */}
      <p className="text-gray-400 mt-2 text-base sm:text-lg">あなたの特性は？</p>
    </header>
  );
};

// このHeaderコンポーネントを他のファイルでも使えるようにします。
export default Header;
