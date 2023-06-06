import {Router} from "express";
import AuthController from "../controller/authController";


const {
    verifyToken,
} = require("../middleware/middlewareController");
export const AuthRouter = Router()
AuthRouter.post('/register', AuthController.register)
AuthRouter.post('/login', AuthController.login)
AuthRouter.post('/logout', verifyToken, AuthController.logOut)

AuthRouter.put('/status', AuthController.checkStatus)

AuthRouter.post('/refresh', AuthController.requestRefreshToken)