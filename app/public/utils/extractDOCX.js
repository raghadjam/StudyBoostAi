"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = extractDOCX;
const mammoth_1 = __importDefault(require("mammoth"));
async function extractDOCX(buffer) {
    const result = await mammoth_1.default.extractRawText({ buffer });
    return result.value;
}
