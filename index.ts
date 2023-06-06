import express from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import {router} from "./src/router/router";
import morgan from "morgan";
import {accessLogStream} from './morgan-logger'
import {Auth} from "./src/module/auth";

dotenv.config()

const DB_URL = process.env["MONGO_DB_URL"];

mongoose.connect(DB_URL).then(() => {
    console.log('Connect DB')
}).catch((err) => {
    console.log(err.message)
})
const app = express()

const POST = 3000;
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json());

app.use(async (req: any, res, next) => {
    try {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        const userLogin = req.body;
        if (userLogin) {
            const userFind = await Auth.findOne({
                userName: userLogin.userName
            });
            // Gán thông tin người dùng vào request để sử dụng trong middleware khác
            if (userFind !== null) {
                req.user = userFind.userName;
            } else {
                req.user = ''
            }
        }
        next();
    } catch (error) {
        console.error('Failed to retrieve user information', error);
        next();
    }
});
app.use(async (req: any, res, next) => {
    try {
        let userName = req.user
        if (userName === null || undefined) {
            const nameHeader = req.headers.username
            req.user = nameHeader
        }
        if (userName === '') {
            req.user = req.body.userName
        }
        next()
    } catch (e) {
        console.error('Failed to retrieve user information', e);
        next();
    }
})

// Middleware ghi log với Morgan
app.use(morgan((tokens, req: any, res) => {
    // Lấy thông tin người dùng từ request
    const user = req.user;
    return [
        user,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
}, {
    stream: accessLogStream
}));

app.use('', router)


app.listen(POST, () => {
    console.log('Server running post ' + POST)
})