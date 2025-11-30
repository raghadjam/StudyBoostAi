"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const extractPDF_js_1 = __importDefault(require("../utils/extractPDF.js"));
const extractDOCX_js_1 = __importDefault(require("../utils/extractDOCX.js"));
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (req.file) {
            const mime = req.file.mimetype;
            if (mime === 'application/pdf') {
                const text = await (0, extractPDF_js_1.default)(req.file.buffer);
                return res.json({ text });
            }
            if (mime ===
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                mime === 'application/msword') {
                const text = await (0, extractDOCX_js_1.default)(req.file.buffer);
                return res.json({ text });
            }
            return res.json({ text: req.file.buffer.toString('utf8') });
        }
        const { text } = req.body;
        return res.json({ text: text || '' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to extract text' });
    }
});
exports.default = router;
