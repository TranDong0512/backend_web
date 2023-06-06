"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../module/auth");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authController_1 = __importDefault(require("./authController"));
class AuthController {
    constructor() {
        this.register = async (req, res, next) => {
            try {
                let user = req.body;
                const userFind = await auth_1.Auth.findOne({
                    userName: user.userName
                });
                if (userFind) {
                    res.status(400).json({
                        mess: "Tai khoan da ton tai",
                    });
                }
                const emailFind = await auth_1.Auth.findOne({
                    email: user.email
                });
                if (emailFind && emailFind.email === user.email) {
                    res.status(400).json({
                        mess: "Email da ton tai",
                    });
                }
                const phoneFind = await auth_1.Auth.findOne({
                    phone: user.phone
                });
                if (phoneFind && phoneFind.phone === user.phone) {
                    res.status(400).json({
                        mess: "So dien thoai da duoc su dung ",
                    });
                }
                else {
                    await bcrypt_1.default.hash(user.password, 10, async (err, hash) => {
                        if (err) {
                            console.log('ma hoa mat khau khong thanh cong');
                        }
                        else {
                            user.password = hash;
                            await auth_1.Auth.create(user);
                            res.status(200).json({
                                mess: 'Tao tai khoan thanh cong'
                            });
                        }
                    });
                }
            }
            catch (err) {
                res.status(500).json(err.message);
            }
        };
        this.generateAccessToken = (userFind) => {
            return jsonwebtoken_1.default.sign({
                id: userFind._id,
                admin: userFind.admin
            }, process.env["JWT_ACCESS_KEY"], { expiresIn: "30000s" });
        };
        this.refreshToken = (userFind) => {
            return jsonwebtoken_1.default.sign({
                id: userFind._id,
                admin: userFind.admin
            }, process.env["JWT_REFRESH_TOKEN"], { expiresIn: "30h" });
        };
        this.login = async (req, res, check) => {
            try {
                const user = req.body;
                const userFind = await auth_1.Auth.findOne({
                    userName: user.userName
                });
                if (!userFind) {
                    res.json({
                        mess: 'Wrong Username',
                    });
                }
                else {
                    await bcrypt_1.default.compare((user.password).toString(), (userFind.password).toString(), async function (err, compare) {
                        if (err) {
                            res.status(404).json({
                                mess: err.message,
                            });
                        }
                        else {
                            const accessToken = await authController_1.default.generateAccessToken(userFind);
                            const refreshToken = await authController_1.default.refreshToken(userFind);
                            res.cookie('refreshToken', refreshToken, {
                                httpOnly: true,
                                secure: false,
                                path: '/',
                                sameSite: 'strict'
                            });
                            userFind.password = undefined;
                            return res.status(200).json({
                                userFind,
                                accessToken,
                            });
                        }
                    });
                }
            }
            catch (err) {
                res.status(404).json(err);
            }
        };
        this.checkStatus = async (req, res) => {
            try {
                const user = req.body;
                console.log(user);
                const userFind = await auth_1.Auth.findOneAndUpdate({ userName: user.userName }, { status: true });
                return res.status(200).json({
                    userFind
                });
            }
            catch (err) {
                console.log(err);
            }
        };
        this.logOut = async (req, res) => {
            res.clearCookie("refreshToken");
            res.status(200).json("Logged out successfully!");
        };
        this.requestRefreshToken = async (req, res) => {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken)
                return res.status(401).json('Ban chua dang nhap');
            jsonwebtoken_1.default.verify(refreshToken, process.env["JWT_REFRESH_TOKEN"], (err, user) => {
                if (err) {
                    console.log(err.message);
                }
                const newAccessToken = authController_1.default.generateAccessToken(user);
                const newRefreshToken = authController_1.default.refreshToken(user);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict'
                });
                res.status(200).json({
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                });
            });
        };
    }
}
exports.default = new AuthController();
//# sourceMappingURL=authController.js.map