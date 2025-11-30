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
        const { wrongItems, contextText } = req.body;
        const prompt = `
You are an educational coach.

The student got these items wrong:
${JSON.stringify(wrongItems, null, 2)}

Use the provided material to produce a short 3-step study plan for each wrong item.
Material:
${(contextText || '').slice(0, 15000)}
`;
        const plan = await callHF(prompt, HF_TOKEN);
        res.json({ plan });
    }
    catch (err) {
        console.error(err?.response?.data || err?.message || err);
        res.status(500).json({ error: 'Study plan generation failed' });
    }
});
exports.default = router;
