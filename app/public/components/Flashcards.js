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
exports.default = Flashcards;
const react_1 = __importStar(require("react"));
function Flashcards({ cards }) {
    const [i, setI] = (0, react_1.useState)(0);
    if (!cards || cards.length === 0)
        return null;
    return (react_1.default.createElement("div", { style: { marginTop: 24 } },
        react_1.default.createElement("h3", null, "Flashcards"),
        react_1.default.createElement("div", { style: { border: '1px solid #eee', padding: 12 } },
            react_1.default.createElement("div", null, cards[i]),
            react_1.default.createElement("div", { style: { marginTop: 8 } },
                react_1.default.createElement("button", { onClick: () => setI((i + 1) % cards.length) }, "Next"),
                react_1.default.createElement("button", { onClick: () => setI((i - 1 + cards.length) % cards.length), style: { marginLeft: 8 } }, "Prev")))));
}
