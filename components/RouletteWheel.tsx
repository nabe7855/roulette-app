// Reactというライブラリから必要な機能を読み込んでいます。
import React from 'react';
// アプリケーションで使う「型」を定義したファイルから、Segmentという型を読み込んでいます。
import { Segment } from '../types';
// SVG（図形を描く技術）で使う計算用の関数を読み込んでいます。
import { polarToCartesian, describeArc } from '../utils/svgUtils';

// このコンポーネントに渡されるデータ（props）の形を定義しています。
interface RouletteWheelProps {
  segments: Segment[]; // ルーレットの各セクションの情報が入ったリスト
  rotation: number;    // ルーレット全体の回転角度
}

// RouletteWheelコンポーネント本体の定義です。
// これは、画面にルーレット盤を描画する役割を持っています。
const RouletteWheel: React.FC<RouletteWheelProps> = ({ segments, rotation }) => {
  // ルーレット盤の基本サイズを設定します。
  const size = 500; // 描画エリアの縦横幅
  const center = size / 2; // 中心点の座標 (x, y)
  const radius = size / 2 - 10; // 半径（少し余白を持たせる）
  // 1セクションあたりの角度を計算します。（例：10セクションなら 360 / 10 = 36度）
  const segmentAngle = 360 / segments.length;

  return (
    // ここからが画面に表示される内容です。
    // relativeクラスは、中にある▲（ポインタ）を絶対位置で配置するための基準点になります。
    <div className="relative w-full max-w-[500px] aspect-square">
      {/* SVGは、ウェブページ上で図形を描くための技術です。 */}
      <svg
        viewBox={`0 0 ${size} ${size}`} // SVG内の座標系を設定します。
        className="w-full h-full"        // 親要素いっぱいに広がるようにします。
      >
        {/* <g>は、複数の図形をグループ化するためのタグです。 */}
        <g 
          // style属性で、CSSを使って見た目を調整します。
          style={{ 
            // `rotation` の値に基づいて、このグループ全体を回転させます。
            transform: `rotate(${rotation}deg)`, 
            // 回転の中心を円の中心に設定します。
            transformOrigin: 'center center', 
            // 回転アニメーションの設定。6秒かけて、ゆっくり始まってゆっくり終わる動きにします。
            transition: `transform ${6000}ms cubic-bezier(0.25, 0.1, 0.25, 1)` 
          }}
        >
          {/* segmentsリストの各要素に対して、一つずつ扇形とテキストを描画します。 */}
          {segments.map((segment, index) => {
            // 各セクションの開始角度と終了角度を計算します。
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            // 計算した角度を元に、扇形のパス（通る道のり）データを生成します。
            const pathData = describeArc(center, center, radius, startAngle, endAngle);

            // テキストを配置するための中心角度を計算します。
            const midAngle = startAngle + segmentAngle / 2;
            // テキストを円の中心から少し外側に配置するための座標を計算します。
            const textPosition = polarToCartesian(center, center, radius * 0.7, midAngle);
            
            return (
              // keyはReactがリストの各要素を区別するために必要です。
              <g key={index}>
                {/* <path>タグで、計算したパスデータを使って扇形を描画します。 */}
                <path d={pathData} fill={segment.color} stroke="#fff" strokeWidth="2" />
                {/* <text>タグで、セクションのラベル（文字）を表示します。 */}
                <text
                  x={textPosition.x} // テキストのx座標
                  y={textPosition.y} // テキストのy座標
                  fill="#ffffff"      // 文字色を白に
                  textAnchor="middle" // 文字を中央揃えに
                  dominantBaseline="middle" // 縦方向も中央揃えに
                  fontSize="13"       // 文字サイズ
                  fontWeight="bold"   // 文字を太字に
                  // テキスト自体も扇形の角度に合わせて回転させ、読みやすくします。
                  transform={`rotate(${midAngle + 90}, ${textPosition.x}, ${textPosition.y})`}
                  // マウス操作を無効にし、テキスト選択ができないようにします。
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {segment.label}
                </text>
              </g>
            );
          })}
        </g>
        {/* ルーレットの中心に、白い円を描画します。 */}
        <circle cx={center} cy={center} r="25" fill="#ffffff" stroke="#e2e8f0" strokeWidth="5" />
      </svg>
      {/* ルーレットのどの位置を指しているかを示すための、赤い三角形のポインタです。 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 
        border-l-[15px] border-l-transparent
        border-r-[15px] border-r-transparent
        border-t-[30px] border-t-red-500
        drop-shadow-lg">
      </div>
    </div>
  );
};

// このコンポーネントを他のファイルでも使えるようにします。
export default RouletteWheel;
