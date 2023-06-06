"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const authRouter_1 = require("./authRouter");
const usersRouter_1 = require("./usersRouter");
exports.router = (0, express_1.Router)();
exports.router.use('/auth', authRouter_1.AuthRouter);
exports.router.use('/users', usersRouter_1.UsersRouter);
//# sourceMappingURL=router.js.map