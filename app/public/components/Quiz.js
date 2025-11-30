"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Quiz;
const react_1 = __importStar(require("react"));
function Quiz({ quizBlocks, onFinish }) {
    const [questions, setQuestions] = (0, react_1.useState)([]);
    const [index, setIndex] = (0, react_1.useState)(0);
    const [streak, setStreak] = (0, react_1.useState)(Number(localStorage.getItem('streak') || 0));
    const [wrongItems, setWrongItems] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        // naive parser for quiz blocks
        const parsed = quizBlocks.map((block) => {
            const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
            // q: first non-empty line
            const q = lines[0] || '';
            // options: find lines starting with A) B) C) D)
            const opts = lines.filter(l => /^[A-D]\)/i.test(l)).map(l => l.replace(/^[A-D]\)\s*/i, ''));
            // correct: line containing "Answer:" or "Answer"
            let correct = 'A';
            const ansLine = lines.find(l => /Answer:/i.test(l) || /^Answer/i.test(l));
            if (ansLine) {
                const m = ansLine.match(/[A-D]/i);
                if (m)
                    correct = m[0].toUpperCase();
            }
            else {
                // fallback: if options exist, default to A
                correct = 'A';
            }
            return { q, opts: opts.length ? opts : ['Option 1', 'Option 2', 'Option 3', 'Option 4'], correct };
        });
        setQuestions(parsed);
        setIndex(0);
    }, [quizBlocks]);
    if (!questions || questions.length === 0)
        return null;
    const current = questions[index];
    function answer(choiceLabel) {
        if (choiceLabel === current.correct) {
            const ns = streak + 1;
            setStreak(ns);
            localStorage.setItem('streak', String(ns));
        }
        else {
            setStreak(0);
            localStorage.setItem('streak', '0');
            setWrongItems(prev => [...prev, current.q]);
        }
        if (index + 1 < questions.length) {
            setIndex(index + 1);
        }
        else {
            onFinish(wrongItems);
        }
    }
    return (react_1.default.createElement("div", { style: { marginTop: 24 } },
        react_1.default.createElement("h3", null, "Quiz"),
        react_1.default.createElement("div", null,
            "Streak: ",
            streak),
        react_1.default.createElement("div", { style: { border: '1px solid #eee', padding: 12, marginTop: 8 } },
            react_1.default.createElement("div", { style: { fontWeight: 600 } }, current.q),
            react_1.default.createElement("div", { style: { marginTop: 8 } }, current.opts.map((o, idx) => {
                const label = String.fromCharCode(65 + idx);
                return (react_1.default.createElement("div", { key: idx, style: { marginBottom: 6 } },
                    react_1.default.createElement("button", { onClick: () => answer(label) },
                        label,
                        ") ",
                        o)));
            })))));
}
