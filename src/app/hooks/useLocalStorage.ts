'use client'; // ✅ クライアント専用フック（SSRでは動かない）

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * useLocalStorage hook
 * - SSR(サーバー)環境ではwindowがないため安全にスキップ
 * - クライアント側でのみlocalStorageを読み書き
 * - 型(TS)対応済み
 */
function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // ✅ クライアント側でlocalStorageを読み込み
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      const item = window.localStorage.getItem(key);
      if (item) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error('useLocalStorage load error:', error);
    }
  }, [key]);

  // ✅ 値が変わったらlocalStorageに保存
  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error('useLocalStorage setValue error:', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
