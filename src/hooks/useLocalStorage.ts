// app/hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

/**
 * localStorage に値を保存・取得するカスタムフック
 * @param key localStorage のキー
 * @param initialValue 初期値
 * @returns [値, 値を更新する関数]
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue; // SSR対策（Next.jsで必須）
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn("Error reading localStorage key", key, error);
      return initialValue;
    }
  });

  // 値が変わったとき localStorage に保存
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn("Error setting localStorage key", key, error);
    }
  }, [key, storedValue]);

  // 値を更新する関数（関数型アップデートにも対応）
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn("Error updating localStorage key", key, error);
    }
  };

  return [storedValue, setValue] as const;
}
