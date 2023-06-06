"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const { verifyToken, } = require("../middleware/middlewareController");
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post('/register', authController_1.default.register);
exports.AuthRouter.post('/login', authController_1.default.login);
exports.AuthRouter.post('/logout', verifyToken, authController_1.default.logOut);
exports.AuthRouter.put('/status', authController_1.default.checkStatus);
exports.AuthRouter.post('/refresh', authController_1.default.requestRefreshToken);
//# sourceMappingURL=authRouter.js.map