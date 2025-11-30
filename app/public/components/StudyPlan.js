"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StudyPlan;
const react_1 = __importDefault(require("react"));
function StudyPlan({ plan }) {
    if (!plan)
        return null;
    return (react_1.default.createElement("div", { style: { marginTop: 24 } },
        react_1.default.createElement("h3", null, "Personalized Study Plan"),
        react_1.default.createElement("pre", { style: { whiteSpace: 'pre-wrap' } }, plan)));
}
