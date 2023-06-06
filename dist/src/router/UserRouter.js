"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.post('/register', userController_1.default.register);
exports.UserRouter.post('/login', userController_1.default.login);
//# sourceMappingURL=AuthRouter.js.map