"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const router_1 = require("./src/router/router");
const morgan_1 = __importDefault(require("morgan"));
const morgan_logger_1 = require("./morgan-logger");
const auth_1 = require("./src/module/auth");
dotenv_1.default.config();
const DB_URL = process.env["MONGO_DB_URL"];
mongoose_1.default.connect(DB_URL).then(() => {
    console.log('Connect DB');
}).catch((err) => {
    console.log(err.message);
});
const app = (0, express_1.default)();
const POST = 3000;
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(async (req, res, next) => {
    try {
        const userLogin = req.body;
        if (userLogin) {
            const userFind = await auth_1.Auth.findOne({
                userName: userLogin.userName
            });
            if (userFind !== null) {
                req.user = userFind.userName;
            }
            else {
                req.user = '';
            }
        }
        next();
    }
    catch (error) {
        console.error('Failed to retrieve user information', error);
        next();
    }
});
app.use(async (req, res, next) => {
    try {
        let userName = req.user;
        if (userName === null || undefined) {
            const nameHeader = req.headers.username;
            req.user = nameHeader;
        }
        if (userName === '') {
            req.user = req.body.userName;
        }
        next();
    }
    catch (e) {
        console.error('Failed to retrieve user information', e);
        next();
    }
});
app.use((0, morgan_1.default)((tokens, req, res) => {
    const user = req.user;
    return [
        user,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
}, {
    stream: morgan_logger_1.accessLogStream
}));
app.use('', router_1.router);
app.listen(POST, () => {
    console.log('Server running post ' + POST);
});
//# sourceMappingURL=index.js.map