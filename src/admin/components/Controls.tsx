import React from "react";
import { AddIcon, SearchIcon } from "./icons";
import styles from "./Controls.module.css";

interface ControlsProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  onAddQuestion: () => void;
}

/**
 * 検索バーと追加ボタンを持つコントロールパネルコンポーネント
 */
const Controls: React.FC<ControlsProps> = ({
  searchTerm,
  onSearchTermChange,
  onAddQuestion,
}) => {
  return (
    <div className={styles.controlsContainer}>
      {/* 検索入力フィールド */}
      <div className={styles.searchBox}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="質問を検索..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* 質問追加ボタン */}
      <button onClick={onAddQuestion} className={styles.addButton}>
        <AddIcon className={styles.addIcon} />
        <span>質問を追加</span>
      </button>
    </div>
  );
};

export default Controls;
