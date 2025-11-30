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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UploadArea;
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
function UploadArea({ onExtract }) {
    const [file, setFile] = (0, react_1.useState)(null);
    const [text, setText] = (0, react_1.useState)('');
    const submit = async () => {
        const form = new FormData();
        if (file)
            form.append('file', file);
        else
            form.append('text', text);
        try {
            const resp = await axios_1.default.post('http://localhost:5000/upload', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
                timeout: 60000
            });
            onExtract(resp.data.text || '');
        }
        catch (err) {
            console.error(err);
            alert('Upload failed. See console.');
        }
    };
    return (react_1.default.createElement("div", { style: { border: '1px solid #ddd', padding: 12 } },
        react_1.default.createElement("div", null,
            react_1.default.createElement("textarea", { placeholder: "Paste text here (or upload a PDF/DOCX)", rows: 6, style: { width: '100%' }, value: text, onChange: (e) => setText(e.target.value) })),
        react_1.default.createElement("div", { style: { marginTop: 8 } },
            react_1.default.createElement("input", { type: "file", onChange: (e) => setFile(e.target.files?.[0] || null) })),
        react_1.default.createElement("div", { style: { marginTop: 8 } },
            react_1.default.createElement("button", { onClick: submit }, "Upload / Use Text"))));
}
