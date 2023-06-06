"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessLogStream = void 0;
const fs_1 = __importDefault(require("fs"));
exports.accessLogStream = fs_1.default.createWriteStream('access.log', { flags: 'a' });
//# sourceMappingURL=morgan-logger.js.map