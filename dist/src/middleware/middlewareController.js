"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { validationResult, check } = require('express-validator');
const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(" ")[1];
        jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid!");
            }
            if (user) {
                req.userFind = user;
                next();
            }
        });
    }
    else {
        res.status(401).json("You're not authenticated");
    }
};
const verifyTokenAndUserAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        }
        else {
            res.status(403).json("You're not allowed to do that!");
        }
    });
};
module.exports = {
    verifyToken,
    verifyTokenAndUserAuthorization,
};
//# sourceMappingURL=middlewareController.js.map