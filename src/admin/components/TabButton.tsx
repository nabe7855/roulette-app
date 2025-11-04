// Reactライブラリをインポートします。
import React from 'react';

// TabButtonコンポーネントが受け取るデータ（props）の型を定義します。
interface TabButtonProps {
    label: string;      // ボタンに表示するテキスト
    isActive: boolean;  // このタブが現在アクティブ（選択されている）かどうか
    onClick: () => void; // ボタンがクリックされたときに呼ばれる関数
}

/**
 * タブ切り替え用のボタンコンポーネント
 * @param {TabButtonProps} props - このコンポーネントが受け取るプロパティ。
 */
const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
    // アクティブ状態に応じてCSSクラスを動的に変更します。
    // isActiveがtrueなら、下線が表示され文字色が青になるスタイルが適用されます。
    const activeClasses = 'border-b-2 border-blue-600 text-blue-600';
    const inactiveClasses = 'text-gray-500 hover:text-gray-700';

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ease-in-out focus:outline-none ${
                isActive ? activeClasses : inactiveClasses
            }`}
        >
            {label}
        </button>
    );
}

// このコンポーネントを他のファイルで使えるようにエクスポートします。
export default TabButton;
