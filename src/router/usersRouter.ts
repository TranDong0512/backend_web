import {Router} from "express";
import userController from "../controller/userController";

const {
    verifyToken,
    verifyTokenAndUserAuthorization,
} = require("../middleware/middlewareController");

export const UsersRouter = Router()
UsersRouter.get('/sort', verifyToken, userController.sort)
UsersRouter.get('/', verifyToken, userController.getAllUser)
UsersRouter.delete('/:id', verifyTokenAndUserAuthorization, userController.deleteUser)
