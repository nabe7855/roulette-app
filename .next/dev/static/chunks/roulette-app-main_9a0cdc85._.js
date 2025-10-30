(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/roulette-app-main/src/app/types/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppMode",
    ()=>AppMode
]);
var AppMode = /*#__PURE__*/ function(AppMode) {
    AppMode["Roulette"] = "roulette";
    AppMode["Slot"] = "slot";
    return AppMode;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/hooks/useLocalStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// FIX: Import `Dispatch` and `SetStateAction` types to resolve "Cannot find namespace 'React'" error.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useLocalStorage(key, initialValue) {
    _s();
    const [storedValue, setStoredValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "useLocalStorage.useState": ()=>{
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.error(error);
                return initialValue;
            }
        }
    }["useLocalStorage.useState"]);
    const setValue = (value)=>{
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLocalStorage.useEffect": ()=>{
            try {
                const item = window.localStorage.getItem(key);
                if (item) {
                    setStoredValue(JSON.parse(item));
                }
            } catch (error) {
                console.error(error);
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useLocalStorage.useEffect"], [
        key
    ]);
    return [
        storedValue,
        setValue
    ];
}
_s(useLocalStorage, "CNhZxQbxYOyslLkU5SGkvIZlGUQ=");
const __TURBOPACK__default__export__ = useLocalStorage;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/components/ToggleSwitch.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/types/index.ts [app-client] (ecmascript)");
;
;
const ToggleSwitch = ({ mode, onToggle })=>{
    const isRoulette = mode === __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppMode"].Roulette;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center space-x-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `font-bold transition-colors ${!isRoulette ? 'text-blue-600' : 'text-gray-400'}`,
                children: "スロット"
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/ToggleSwitch.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onToggle,
                className: `relative inline-flex items-center h-7 rounded-full w-12 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 ${isRoulette ? 'bg-pink-400' : 'bg-blue-400'}`,
                "aria-label": "Toggle mode",
                onKeyDown: (e)=>{
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        onToggle();
                    }
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: `inline-block w-5 h-5 transform bg-white rounded-full transition-transform ease-in-out duration-200 ${isRoulette ? 'translate-x-6' : 'translate-x-1'}`
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/components/ToggleSwitch.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/ToggleSwitch.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: `font-bold transition-colors ${isRoulette ? 'text-pink-600' : 'text-gray-400'}`,
                children: "ルーレット"
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/ToggleSwitch.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/roulette-app-main/src/app/components/ToggleSwitch.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ToggleSwitch;
const __TURBOPACK__default__export__ = ToggleSwitch;
var _c;
__turbopack_context__.k.register(_c, "ToggleSwitch");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/constants [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ADMIN_PASSWORD",
    ()=>ADMIN_PASSWORD,
    "DEFAULT_QUESTIONS",
    ()=>DEFAULT_QUESTIONS,
    "MAX_QUESTIONS",
    ()=>MAX_QUESTIONS,
    "POP_COLORS",
    ()=>POP_COLORS
]);
const DEFAULT_QUESTIONS = [
    "あなたの最大の短所は何ですか？",
    "困難な課題に直面した時のことを教えてください。",
    "5年後の自分はどうなっていると思いますか？",
    "なぜここで働きたいのですか？",
    "あなたが情熱を注いでいることは何ですか？",
    "あなたの理想的な職場環境について説明してください。",
    "ストレスやプレッシャーにどう対処しますか？",
    "あなたの最大の功績は何ですか？",
    "何かの決定に同意できなかった時のことを教えてください。",
    "あなたのモチベーションの源泉は何ですか？",
    "どのように管理されるのが好きですか？",
    "最近読んだ本は何ですか？",
    "もしスーパーパワーを持てるとしたら、何を選びますか？",
    "あなたの好きな趣味は何ですか？",
    "自分を3つの言葉で説明してください。",
    "どのようにして整理整頓をしていますか？",
    "楽しみのために何をしますか？",
    "失敗した時のことを教えてください。",
    "あなたのキャリアの目標は何ですか？"
];
const ADMIN_PASSWORD = "admin";
const MAX_QUESTIONS = 200;
const POP_COLORS = [
    '#fecaca',
    '#fed7aa',
    '#fef08a',
    '#d9f99d',
    '#a7f3d0',
    '#bae6fd',
    '#bfdbfe',
    '#ddd6fe',
    '#fbcfe8'
];
}),
"[project]/roulette-app-main/src/app/components/Roulette.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/constants [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
const Roulette = ({ questions, isSpinning, targetQuestion })=>{
    _s();
    const [rotation, setRotation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const itemCount = questions.length || 1;
    const sliceAngle = 360 / itemCount;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Roulette.useEffect": ()=>{
            if (targetQuestion === null) {
                // Reset rotation smoothly when history is cleared
                setRotation(0);
                return;
            }
            const targetIndex = questions.indexOf(targetQuestion);
            if (targetIndex === -1) {
                console.error("Target question not found in display list.");
                return;
            }
            // Calculate the angle to bring the target slice to the top pointer
            const stopAngle = -(targetIndex * sliceAngle);
            // Add extra rotations for effect.
            const spinRounds = 5;
            // Calculate the new rotation value to ensure it always spins forward
            let newRotation = (Math.floor(rotation / 360) + spinRounds) * 360 + stopAngle;
            if (newRotation < rotation) {
                newRotation += 360;
            }
            setRotation(newRotation);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Roulette.useEffect"], [
        targetQuestion
    ]);
    const gradient = `conic-gradient(from ${-sliceAngle / 2}deg, ${questions.map((_, index)=>`${__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POP_COLORS"][index % __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POP_COLORS"].length]} ${index * sliceAngle}deg, ${__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POP_COLORS"][index % __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["POP_COLORS"].length]} ${(index + 1) * sliceAngle}deg`).join(', ')})`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-3 left-1/2 transform -translate-x-1/2 z-20",
                style: {
                    width: 0,
                    height: 0,
                    borderLeft: '15px solid transparent',
                    borderRight: '15px solid transparent',
                    borderTop: '25px solid #ef4444' // red-500
                }
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full h-full",
                style: {
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-full",
                        style: {
                            background: gradient,
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    questions.map((question, index)=>{
                        const angle = index * 360 / itemCount;
                        const rotationAngle = angle + sliceAngle / 2;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-1/2 left-1/2 origin-[0_0] h-[95px] md:h-[120px] w-[40px] md:w-[50px] flex items-center justify-center",
                            style: {
                                transform: `rotate(${rotationAngle}deg) translate(65px) rotate(-90deg)`
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-800 text-xs md:text-sm font-semibold",
                                style: {
                                    writingMode: 'vertical-rl',
                                    textOrientation: 'mixed',
                                    whiteSpace: 'normal',
                                    lineHeight: '1.3'
                                },
                                children: question
                            }, void 0, false, {
                                fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, index, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                            lineNumber: 73,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-full flex items-center justify-center text-center p-2 shadow-inner",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-full border-2 md:border-4 border-gray-200"
                    }, void 0, false, {
                        fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "z-10 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-3xl",
                                role: "img",
                                "aria-label": "roulette wheel",
                                children: "🎡"
                            }, void 0, false, {
                                fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 font-semibold mt-1 text-xs md:text-sm",
                                children: "スタートしてね！"
                            }, void 0, false, {
                                fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/roulette-app-main/src/app/components/Roulette.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Roulette, "WYh/K2yNA26b4nfEdMn4vBVp/HY=");
_c = Roulette;
const __TURBOPACK__default__export__ = Roulette;
var _c;
__turbopack_context__.k.register(_c, "Roulette");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/components/Slot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const Slot = ({ questions, isSpinning, selectedQuestion, onStart, disabled })=>{
    _s();
    const itemHeight = 64; // Corresponds to h-16 in Tailwind
    const slotRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [translateY, setTranslateY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentItems, setCurrentItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const animationListRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [isPulled, setIsPulled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Slot.useEffect": ()=>{
            if (isSpinning) {
                // STARTING THE SPIN
                const shuffled = [
                    ...questions
                ].sort({
                    "Slot.useEffect.shuffled": ()=>Math.random() - 0.5
                }["Slot.useEffect.shuffled"]);
                const extendedList = Array(5).fill(shuffled).flat();
                animationListRef.current = extendedList;
                setCurrentItems(extendedList);
                // Start the animation by setting the final position
                requestAnimationFrame({
                    "Slot.useEffect": ()=>{
                        setTranslateY(-((extendedList.length - 5) * itemHeight));
                    }
                }["Slot.useEffect"]);
            } else if (selectedQuestion) {
                // STOPPING THE SPIN
                const list = animationListRef.current;
                if (list.length > 0) {
                    const baseLength = questions.length;
                    // Look for the question in a middle section for a smoother stop
                    const middleSectionStart = baseLength * 2;
                    let stopIndex = list.indexOf(selectedQuestion, middleSectionStart);
                    if (stopIndex === -1) {
                        stopIndex = list.indexOf(selectedQuestion);
                    }
                    if (stopIndex === -1) {
                        // This is a robust fallback. If the question is somehow not in our
                        // animation list, we just show the result directly.
                        console.error("Selected question not found in animation list. Displaying directly.");
                        setCurrentItems([
                            selectedQuestion
                        ]);
                        setTranslateY(0);
                    } else {
                        // Found it, so calculate the correct final position.
                        const finalPosition = -stopIndex * itemHeight;
                        setTranslateY(finalPosition);
                    }
                } else {
                    // Fallback for when the animation list is empty for some reason
                    setCurrentItems([
                        selectedQuestion
                    ]);
                    setTranslateY(0);
                }
            }
        }
    }["Slot.useEffect"], [
        isSpinning,
        selectedQuestion,
        questions,
        itemHeight
    ]);
    const handleLeverPull = ()=>{
        if (disabled) return;
        setIsPulled(true);
        onStart();
        setTimeout(()=>{
            setIsPulled(false);
        }, 300); // Animation duration
    };
    const showInitialMessage = !isSpinning && !selectedQuestion;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-lg flex items-center justify-center gap-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full max-w-md h-64 md:h-80 flex flex-col items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: slotRef,
                    className: "relative w-full h-16 bg-white rounded-lg border-4 border-blue-400 overflow-hidden shadow-lg flex items-center justify-center",
                    children: [
                        showInitialMessage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center animate-fade-in",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-3xl",
                                    role: "img",
                                    "aria-label": "slot machine",
                                    children: "🎰"
                                }, void 0, false, {
                                    fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 font-semibold mt-1 text-xs md:text-sm",
                                    children: "スタートしてね！"
                                }, void 0, false, {
                                    fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute w-full",
                            style: {
                                transform: `translateY(${translateY}px)`,
                                transition: isSpinning ? 'transform 5s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'transform 0.5s ease-out'
                            },
                            children: currentItems.map((question, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "h-16 flex items-center justify-center text-center p-2 text-md md:text-lg font-semibold text-gray-700",
                                    children: question
                                }, index, false, {
                                    fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                                    lineNumber: 99,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                            lineNumber: 89,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 pointer-events-none",
                            style: {
                                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 70%, rgba(255, 255, 255, 1) 100%)'
                            }
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0 h-48 flex flex-col items-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-8 h-full bg-gray-300 rounded-t-lg relative",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: handleLeverPull,
                        className: `absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-36 bg-gray-500 border-2 border-gray-600 rounded-full cursor-pointer transition-transform duration-200 ease-out ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'} ${isPulled ? 'translate-y-8' : ''}`,
                        style: {
                            transformOrigin: 'top center'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute -top-4 -left-2.5 w-8 h-8 bg-red-500 rounded-full border-2 border-red-700 shadow-md"
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                            lineNumber: 118,
                            columnNumber: 14
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                        lineNumber: 113,
                        columnNumber: 12
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                    lineNumber: 112,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
                lineNumber: 111,
                columnNumber: 8
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/roulette-app-main/src/app/components/Slot.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Slot, "mcqKmHWFKWTCNIDIaD5wwErS5EI=");
_c = Slot;
const __TURBOPACK__default__export__ = Slot;
var _c;
__turbopack_context__.k.register(_c, "Slot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/components/icons.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CloseIcon",
    ()=>CloseIcon,
    "SettingsIcon",
    ()=>SettingsIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const SettingsIcon = ({ className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.43.992a6.759 6.759 0 0 1 0 1.905c-.008.379.137.752.43.992l1.004.827a1.125 1.125 0 0 1 .26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.333.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.759 6.759 0 0 1 0-1.905c.008-.379-.137-.752-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.49l1.217.456c.355.133.75.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/icons.tsx",
                lineNumber: 6,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/components/icons.tsx",
                lineNumber: 7,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/roulette-app-main/src/app/components/icons.tsx",
        lineNumber: 5,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = SettingsIcon;
const CloseIcon = ({ className })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: className,
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M6 18 18 6M6 6l12 12"
        }, void 0, false, {
            fileName: "[project]/roulette-app-main/src/app/components/icons.tsx",
            lineNumber: 13,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/roulette-app-main/src/app/components/icons.tsx",
        lineNumber: 12,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c1 = CloseIcon;
var _c, _c1;
__turbopack_context__.k.register(_c, "SettingsIcon");
__turbopack_context__.k.register(_c1, "CloseIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/components/Modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/components/icons.tsx [app-client] (ecmascript)");
;
;
const Modal = ({ isOpen, onClose, title, children })=>{
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col text-gray-800",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center p-4 border-b border-gray-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold text-blue-600",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/Modal.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onClose,
                            className: "text-gray-500 hover:text-gray-800 transition-colors",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CloseIcon"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/roulette-app-main/src/app/components/Modal.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/Modal.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/roulette-app-main/src/app/components/Modal.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6 overflow-y-auto bg-gray-50 rounded-b-lg",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/components/Modal.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/roulette-app-main/src/app/components/Modal.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/roulette-app-main/src/app/components/Modal.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Modal;
const __TURBOPACK__default__export__ = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/components/AdminPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/components/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/constants [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const AdminPanel = ({ isOpen, onClose, questions, setQuestions })=>{
    _s();
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isAuthenticated, setIsAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newQuestion, setNewQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [editingIndex, setEditingIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingText, setEditingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const handleLogin = (e)=>{
        e.preventDefault();
        if (password === __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ADMIN_PASSWORD"]) {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('パスワードが違います。');
        }
    };
    const handleAddQuestion = ()=>{
        if (newQuestion.trim() && questions.length < __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_QUESTIONS"]) {
            setQuestions((prev)=>[
                    ...prev,
                    newQuestion.trim()
                ]);
            setNewQuestion('');
        }
    };
    const handleEdit = (index)=>{
        setEditingIndex(index);
        setEditingText(questions[index]);
    };
    const handleSaveEdit = (index)=>{
        if (editingText.trim()) {
            const updatedQuestions = [
                ...questions
            ];
            updatedQuestions[index] = editingText.trim();
            setQuestions(updatedQuestions);
            setEditingIndex(null);
            setEditingText('');
        }
    };
    const handleDelete = (index)=>{
        if (window.confirm('この質問を削除してもよろしいですか？')) {
            setQuestions((prev)=>prev.filter((_, i)=>i !== index));
        }
    };
    const renderLogin = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            onSubmit: handleLogin,
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            htmlFor: "password",
                            className: "block text-sm font-medium text-gray-600",
                            children: "パスワード"
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                            lineNumber: 61,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "password",
                            id: "password",
                            value: password,
                            onChange: (e)=>setPassword(e.target.value),
                            className: "mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 p-2"
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                            lineNumber: 62,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                    lineNumber: 60,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-red-500 text-sm",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                    lineNumber: 70,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "submit",
                    className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors",
                    children: "ログイン"
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                    lineNumber: 71,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
            lineNumber: 59,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    const renderAdminView = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-2 text-gray-700",
                            children: [
                                "新しい質問を追加 (",
                                questions.length,
                                "/",
                                __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_QUESTIONS"],
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                            lineNumber: 80,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: newQuestion,
                                    onChange: (e)=>setNewQuestion(e.target.value),
                                    placeholder: "新しい質問を入力",
                                    className: "flex-grow bg-white border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 p-2",
                                    disabled: questions.length >= __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_QUESTIONS"]
                                }, void 0, false, {
                                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                    lineNumber: 82,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddQuestion,
                                    className: "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                                    disabled: questions.length >= __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$constants__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MAX_QUESTIONS"],
                                    children: "追加"
                                }, void 0, false, {
                                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                    lineNumber: 90,
                                    columnNumber: 11
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                            lineNumber: 81,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                    lineNumber: 79,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold mb-2 text-gray-700",
                            children: "質問を管理"
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                            lineNumber: 97,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                            className: "space-y-2 max-h-80 overflow-y-auto pr-2",
                            children: questions.map((q, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                    className: "bg-white p-3 rounded-md flex items-center justify-between gap-2 border border-gray-200",
                                    children: [
                                        editingIndex === index ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: editingText,
                                            onChange: (e)=>setEditingText(e.target.value),
                                            className: "flex-grow bg-gray-50 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800 p-1",
                                            onKeyDown: (e)=>e.key === 'Enter' && handleSaveEdit(index)
                                        }, void 0, false, {
                                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                            lineNumber: 102,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex-grow",
                                            children: q
                                        }, void 0, false, {
                                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                            lineNumber: 110,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 flex-shrink-0",
                                            children: [
                                                editingIndex === index ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleSaveEdit(index),
                                                    className: "text-green-600 hover:text-green-500 transition-colors font-medium",
                                                    children: "保存"
                                                }, void 0, false, {
                                                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                                    lineNumber: 114,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleEdit(index),
                                                    className: "text-yellow-600 hover:text-yellow-500 transition-colors font-medium",
                                                    children: "編集"
                                                }, void 0, false, {
                                                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                                    lineNumber: 116,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>handleDelete(index),
                                                    className: "text-red-600 hover:text-red-500 transition-colors font-medium",
                                                    children: "削除"
                                                }, void 0, false, {
                                                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                                    lineNumber: 118,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                            lineNumber: 112,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, index, true, {
                                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)))
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                            lineNumber: 98,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
                    lineNumber: 96,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
            lineNumber: 78,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        isOpen: isOpen,
        onClose: onClose,
        title: "管理パネル",
        children: isAuthenticated ? renderAdminView() : renderLogin()
    }, void 0, false, {
        fileName: "[project]/roulette-app-main/src/app/components/AdminPanel.tsx",
        lineNumber: 128,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminPanel, "qLl/ThLTnVlPtuxVpleWpjFCY1Q=");
_c = AdminPanel;
const __TURBOPACK__default__export__ = AdminPanel;
var _c;
__turbopack_context__.k.register(_c, "AdminPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/types/index.ts [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '../constants'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/hooks/useLocalStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$ToggleSwitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/components/ToggleSwitch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$Roulette$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/components/Roulette.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$Slot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/components/Slot.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$AdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/components/AdminPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/roulette-app-main/src/app/components/icons.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function Page() {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('app-mode', __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppMode"].Roulette);
    const [questions, setQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('questions', DEFAULT_QUESTIONS);
    const [askedIndexes, setAskedIndexes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])('asked-indexes', []);
    const [isSpinning, setIsSpinning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedQuestion, setSelectedQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [displayQuestions, setDisplayQuestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [targetQuestion, setTargetQuestion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const getAvailableQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Page.useCallback[getAvailableQuestions]": ()=>{
            return questions.map({
                "Page.useCallback[getAvailableQuestions]": (q, i)=>({
                        question: q,
                        index: i
                    })
            }["Page.useCallback[getAvailableQuestions]"]).filter({
                "Page.useCallback[getAvailableQuestions]": (item)=>!askedIndexes.includes(item.index)
            }["Page.useCallback[getAvailableQuestions]"]);
        }
    }["Page.useCallback[getAvailableQuestions]"], [
        questions,
        askedIndexes
    ]);
    const handleStart = ()=>{
        if (isSpinning) return;
        const available = getAvailableQuestions();
        if (available.length === 0) {
            alert("すべての質問が出題されました！「クリア」ボタンでリセットしてください。");
            return;
        }
        setIsSpinning(true);
        setSelectedQuestion(null);
        const finalPick = available[Math.floor(Math.random() * available.length)];
        const displayPool = [
            ...available
        ];
        let tempDisplay = [
            finalPick.question
        ];
        while(tempDisplay.length < 10 && displayPool.length > 0){
            const randomIndex = Math.floor(Math.random() * displayPool.length);
            const randomItem = displayPool[randomIndex];
            if (randomItem && !tempDisplay.includes(randomItem.question)) {
                tempDisplay.push(randomItem.question);
            }
            displayPool.splice(randomIndex, 1);
        }
        const finalDisplayQuestions = tempDisplay.sort(()=>Math.random() - 0.5);
        setDisplayQuestions(finalDisplayQuestions);
        setTargetQuestion(finalPick.question);
        setTimeout(()=>{
            setSelectedQuestion(finalPick.question);
            setAskedIndexes((prev)=>[
                    ...prev,
                    finalPick.index
                ]);
            setIsSpinning(false);
        }, 5000);
    };
    const handleClear = ()=>{
        setAskedIndexes([]);
        setSelectedQuestion(null);
        setTargetQuestion(null);
        alert("履歴がクリアされました。新しいセッションを開始できます。");
    };
    const handleToggleMode = ()=>{
        setMode((prev)=>prev === __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppMode"].Roulette ? __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppMode"].Slot : __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppMode"].Roulette);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const handleKeyDown = {
                "Page.useEffect.handleKeyDown": (event)=>{
                    if (event.key === 'Tab') {
                        event.preventDefault();
                        handleToggleMode();
                    }
                }
            }["Page.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            return ({
                "Page.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                }
            })["Page.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Page.useEffect"], [
        mode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const available = getAvailableQuestions();
            const initialDisplay = [
                ...available.map({
                    "Page.useEffect.initialDisplay": (q)=>q.question
                }["Page.useEffect.initialDisplay"])
            ].sort({
                "Page.useEffect.initialDisplay": ()=>0.5 - Math.random()
            }["Page.useEffect.initialDisplay"]).slice(0, 10);
            setDisplayQuestions(initialDisplay);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Page.useEffect"], [
        questions
    ]);
    const availableCount = getAvailableQuestions().length;
    const totalCount = questions.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center justify-center p-4 font-sans relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setIsAdminPanelOpen(true),
                    disabled: isSpinning,
                    className: "text-gray-500 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$icons$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SettingsIcon"], {
                        className: "w-8 h-8"
                    }, void 0, false, {
                        fileName: "[project]/roulette-app-main/src/app/page.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/page.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/page.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "text-center mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-4xl md:text-5xl font-bold text-gray-800",
                        children: [
                            "質問",
                            mode === __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppMode"].Roulette ? 'ルーレット' : 'スロット'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/roulette-app-main/src/app/page.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-500 mt-2",
                        children: "自己PRの練習や会話のきっかけ作りに！"
                    }, void 0, false, {
                        fileName: "[project]/roulette-app-main/src/app/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/roulette-app-main/src/app/page.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-grow flex flex-col items-center justify-center w-full",
                children: mode === __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$types$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppMode"].Roulette ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$Roulette$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    questions: displayQuestions,
                    isSpinning: isSpinning,
                    targetQuestion: targetQuestion
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/page.tsx",
                    lineNumber: 123,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$Slot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    questions: questions,
                    isSpinning: isSpinning,
                    selectedQuestion: selectedQuestion,
                    onStart: handleStart,
                    disabled: isSpinning || availableCount === 0
                }, void 0, false, {
                    fileName: "[project]/roulette-app-main/src/app/page.tsx",
                    lineNumber: 129,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "w-full max-w-lg mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center mb-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$ToggleSwitch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            mode: mode,
                            onToggle: handleToggleMode
                        }, void 0, false, {
                            fileName: "[project]/roulette-app-main/src/app/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/roulette-app-main/src/app/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleStart,
                                disabled: isSpinning || availableCount === 0,
                                className: "w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30",
                                children: isSpinning ? '回転中...' : 'スタート'
                            }, void 0, false, {
                                fileName: "[project]/roulette-app-main/src/app/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleClear,
                                disabled: isSpinning,
                                className: "w-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-800 font-bold py-3 px-6 rounded-lg text-lg transition-colors",
                                children: "履歴をクリア"
                            }, void 0, false, {
                                fileName: "[project]/roulette-app-main/src/app/page.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/roulette-app-main/src/app/page.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center mt-4 text-gray-500 font-medium",
                        children: [
                            "残り ",
                            availableCount,
                            " / ",
                            totalCount,
                            " 問"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/roulette-app-main/src/app/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/roulette-app-main/src/app/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$components$2f$AdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isOpen: isAdminPanelOpen,
                onClose: ()=>setIsAdminPanelOpen(false),
                questions: questions,
                setQuestions: setQuestions
            }, void 0, false, {
                fileName: "[project]/roulette-app-main/src/app/page.tsx",
                lineNumber: 164,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/roulette-app-main/src/app/page.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, this);
}
_s(Page, "yGIxe6XflKK5VLVHjlmwlwTdIys=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$src$2f$app$2f$hooks$2f$useLocalStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/roulette-app-main/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/roulette-app-main/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/roulette-app-main/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$roulette$2d$app$2d$main$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/roulette-app-main/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/roulette-app-main/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=roulette-app-main_9a0cdc85._.js.map