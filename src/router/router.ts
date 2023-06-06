import {Router} from "express";
import {AuthRouter} from "./authRouter";
import {UsersRouter} from "./usersRouter";

export const router = Router()

router.use('/auth', AuthRouter)
router.use('/users', UsersRouter)