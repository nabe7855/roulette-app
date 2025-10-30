import React from "react";

// Reactの機能をいくつか読み込んでいます。
// useState: コンポーネントの状態（データ）を管理するために使います。
// useCallback: 関数の再生成を防ぎ、パフォーマンスを向上させるために使います。
import { useState, useCallback } from 'react';
// 他のファイルで定義した「型」や「定数」を読み込んでいます。
import { Segment } from '../types';
import { SEGMENTS, SPIN_DURATION } from '../constants';

// `useRoulette` という、このアプリの心臓部となる機能（カスタムフック）を定義しています。
// ルーレットに関するすべてのロジック（状態管理や操作）をここにまとめています。
export const useRoulette = () => {
  // --- ここから状態管理（useState） ---
  // useStateを使って、アプリケーションで変化する値を管理します。
  // [値, 値を変更する関数] = useState(初期値); という形で使います。

  // `rotation`: ルーレット盤全体の回転角度。初期値は0度。
  const [rotation, setRotation] = useState<number>(0);
  // `isSpinning`: ルーレットが回転中かどうかを示すフラグ（true/false）。初期値はfalse（止まっている）。
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  // `winner`: 当選したセクションの情報を保持します。最初は何も決まっていないのでnull。
  const [winner, setWinner] = useState<Segment | null>(null);
  // `isModalOpen`: 当選結果を表示するモーダル（ポップアップウィンドウ）が開いているかどうか。初期値はfalse。
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // `numberOfSegments`: ルーレットのセクション数。初期値は定義されているセクションの最大数。
  const [numberOfSegments, setNumberOfSegments] = useState<number>(SEGMENTS.length);

  // --- 状態に基づいた計算 ---
  // 現在のセクション数に基づいて、表示するセクションのリストを作成します。
  const currentSegments = SEGMENTS.slice(0, numberOfSegments);

  // --- ここからイベントハンドラ（操作関数） ---
  // useCallbackは、不要な再計算を防ぐおまじないです。特に[ ]の中の値が変わらない限り、関数は再生成されません。

  /**
   * スピンボタンが押されたときに実行される関数
   */
  const handleSpin = useCallback(() => {
    // すでに回転中なら、何もしないで処理を終了します。
    if (isSpinning) return;

    // 回転を開始する準備
    setIsSpinning(true); // 回転中フラグをtrueに
    setWinner(null);     // 前回の当選結果をリセット
    setIsModalOpen(false); // モーダルを閉じる

    // 0からセクション数-1までの間で、ランダムな当選インデックスを決定します。
    const winningSegmentIndex = Math.floor(Math.random() * currentSegments.length);
    // 1セクションあたりの角度を計算します。（例：10セクションなら360 / 10 = 36度）
    const sliceAngle = 360 / currentSegments.length;
    
    // 当選セクションの真ん中にポインタが来るように、目標の角度を計算します。
    const targetAngle = winningSegmentIndex * sliceAngle + sliceAngle / 2;

    // 見た目を面白くするために、最低5回からランダムな回数だけ余分に回転させます。
    const randomSpins = 5 + Math.floor(Math.random() * 5); 

    // 最終的に停止するべき角度を計算します。
    // (余分な回転) + (当選セクションに止まるための角度)
    const finalRotation = (randomSpins * 360) + (360 - targetAngle);
    
    // 現在の回転角度に、計算した最終角度を加算します。
    // これにより、常に同じ位置からではなく、止まった位置から次の回転が始まります。
    // `rotation % 360` は、現在の回転の余りを引くことで、きれいに回転数をリセットしています。
    const newRotation = rotation - (rotation % 360) + finalRotation;

    setRotation(newRotation); // 計算した新しい回転角度をセットします。これによりアニメーションが始まります。

    // SPIN_DURATION（6秒）後に、結果を表示する処理を実行します。
    setTimeout(() => {
      setIsSpinning(false); // 回転中フラグをfalseに
      const winningSegment = currentSegments[winningSegmentIndex]; // 当選したセクションの情報を取得
      setWinner(winningSegment); // 当選者情報をセット
      setIsModalOpen(true);    // モーダルを開いて結果を表示
    }, SPIN_DURATION);
  }, [isSpinning, rotation, numberOfSegments, currentSegments]); // これらの値が変わった時だけ関数を再生成

  /**
   * モーダルを閉じるための関数
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * セクション数の入力欄が変更されたときに実行される関数
   */
  const handleNumberOfSegmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // ユーザーが入力欄を空にした場合、最小値の2を設定してエラーを防ぎます。
    if (rawValue === '') {
      setNumberOfSegments(2);
      return;
    }

    // 入力された文字列を数値に変換します。
    const value = parseInt(rawValue, 10);
    // 数値に変換できた場合のみ処理を続けます。
    if (!isNaN(value)) {
        // 値が2未満、または最大セクション数を超える場合は、範囲内に収まるように調整します。
        const clampedValue = Math.max(2, Math.min(SEGMENTS.length, value));
        setNumberOfSegments(clampedValue);
    }
  };
  
  // このフックが管理している値や関数を、他のコンポーネントで使えるように返します。
  return {
    rotation,
    isSpinning,
    winner,
    isModalOpen,
    numberOfSegments,
    currentSegments,
    handleSpin,
    handleCloseModal,
    handleNumberOfSegmentsChange,
  };
};
