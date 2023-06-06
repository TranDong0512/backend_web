"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRouter = void 0;
const express_1 = require("express");
const userController_1 = __importDefault(require("../controller/userController"));
const { verifyToken, verifyTokenAndUserAuthorization, } = require("../middleware/middlewareController");
exports.UsersRouter = (0, express_1.Router)();
exports.UsersRouter.get('/sort', verifyToken, userController_1.default.sort);
exports.UsersRouter.get('/', verifyToken, userController_1.default.getAllUser);
exports.UsersRouter.delete('/:id', verifyTokenAndUserAuthorization, userController_1.default.deleteUser);
//# sourceMappingURL=usersRouter.js.map