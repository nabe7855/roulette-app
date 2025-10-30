// このファイルには、SVG（図形を描画する技術）で複雑な計算を行うための便利な関数をまとめています。

/**
 * 極座標（角度と半径）をデカルト座標（x, y）に変換します。
 * ルーレット盤のような円形のレイアウトで、要素を正しい位置に配置するために使います。
 * @param centerX 中心のx座標
 * @param centerY 中心のy座標
 * @param radius 半径
 * @param angleInDegrees 角度（度数法）
 * @returns { x: number, y: number } 変換後のx, y座標
 */
export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  // JavaScriptの三角関数はラジアンを使うため、角度をラジアンに変換します。
  // 90度を引いているのは、SVGの座標系で0度が真上になるように調整するためです。
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

/**
 * SVGのpath要素で円弧（扇形の一部）を描画するためのd属性の文字列を生成します。
 * ルーレットの各セクション（パイのスライス）を描画するために使います。
 * @param x 中心のx座標
 * @param y 中心のy座標
 * @param radius 半径
 * @param startAngle 円弧の開始角度
 * @param endAngle 円弧の終了角度
 * @returns {string} SVGのpathで使えるd属性の文字列
 */
export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {
  // 円弧の開始点と終了点の座標を計算します。
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  // 円弧の角度が180度を超えるかどうかで、SVGの描画方法が変わるためフラグを設定します。
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  // SVGのpathコマンドを組み立てて、最終的な文字列を生成します。
  // M: 開始点へ移動
  // A: 円弧を描画
  // L: 中心へ直線を引く
  // L: 開始点へ直線を引いて図形を閉じる
  const d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", x, y,
    "L", start.x, start.y
  ].join(" ");
  return d;
};
