"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
const HF_MODEL = process.env.HF_MODEL || 'bigscience/bloom-560m';
async function callHF(prompt, token) {
    const res = await axios_1.default.post(`https://api-inference.huggingface.co/models/${HF_MODEL}`, { inputs: prompt, options: { wait_for_model: true } }, { headers: { Authorization: `Bearer ${token}` }, timeout: 120000 });
    if (res.data) {
        if (Array.isArray(res.data) && res.data[0]?.generated_text)
            return res.data[0].generated_text;
        if (res.data.generated_text)
            return res.data.generated_text;
        if (typeof res.data === 'string')
            return res.data;
        return JSON.stringify(res.data);
    }
    return '';
}
router.post('/', async (req, res) => {
    const HF_TOKEN = process.env.HF_TOKEN;
    if (!HF_TOKEN)
        return res.status(500).json({ error: 'HF_TOKEN missing' });
    try {
        const { text } = req.body;
        const safeText = (text || '').trim().slice(0, 25000);
        const prompt = `
You are an educational assistant.

Material:
${safeText}

Deliverables:
1) SUMMARY: A short, clear summary (3-6 sentences).
2) FLASHCARDS: Exactly five flashcards. One per line, format "Q: ... | A: ..."
3) QUIZ: Exactly five multiple-choice questions. For each question include:
Q#: question text
A) option A
B) option B
C) option C
D) option D
Answer: <A/B/C/D>

Output using the labels SUMMARY:, FLASHCARDS:, QUIZ:
`;
        const output = await callHF(prompt, HF_TOKEN);
        res.json({ output });
    }
    catch (err) {
        console.error(err?.response?.data || err?.message || err);
        res.status(500).json({ error: 'AI processing failed' });
    }
});
exports.default = router;
