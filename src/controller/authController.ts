import {Request, Response} from "express";
import {Auth} from "../module/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import authController from "./authController";


class AuthController {

    register = async (req: Request, res: Response, next) => {
        try {
            let user = req.body;
            const userFind = await Auth.findOne({
                userName: user.userName
            })
            if (userFind) {
                res.status(400).json({
                    mess: "Tai khoan da ton tai",
                })
            }
            const emailFind = await Auth.findOne({
                email: user.email
            })
            if (emailFind && emailFind.email === user.email) {
                res.status(400).json({
                    mess: "Email da ton tai",
                })
            }
            const phoneFind = await Auth.findOne({
                phone: user.phone
            })
            if (phoneFind && phoneFind.phone === user.phone) {
                res.status(400).json({
                    mess: "So dien thoai da duoc su dung ",
                })
            } else {
                await bcrypt.hash(user.password, 10, async (err, hash) => {
                    if (err) {
                        console.log('ma hoa mat khau khong thanh cong')
                    } else {
                        user.password = hash;
                        await Auth.create(user)
                        res.status(200).json({
                            mess: 'Tao tai khoan thanh cong'
                        })
                    }
                })
            }
        } catch (err) {
            res.status(500).json(err.message)
        }
    }

    generateAccessToken = (userFind) => {
        return jwt.sign({
                id: userFind._id,
                admin: userFind.admin
            },
            process.env["JWT_ACCESS_KEY"],
            {expiresIn: "30000s"}
        )
    }

    refreshToken = (userFind) => {
        return jwt.sign({
                id: userFind._id,
                admin: userFind.admin
            },
            process.env["JWT_REFRESH_TOKEN"],
            {expiresIn: "30h"}
        )
    }


    login = async (req: Request, res: Response, check) => {
        try {
            const user = req.body
            const userFind = await Auth.findOne({
                userName: user.userName
            })
            if (!userFind) {
                res.json({
                    mess: 'Wrong Username',
                })
            } else {
                await bcrypt.compare((user.password).toString(), (userFind.password).toString(), async function (err, compare) {
                    if (err) {
                        res.status(404).json({
                            mess: err.message,
                        })
                    } else {
                        const accessToken = await authController.generateAccessToken(userFind)
                        const refreshToken = await authController.refreshToken(userFind)
                        res.cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            secure: false,
                            path: '/',
                            sameSite: 'strict'
                        })
                        userFind.password = undefined
                        return res.status(200).json({
                            userFind,
                            accessToken,
                        })
                    }
                });
            }
        } catch (err) {
            res.status(404).json(err)
        }
    }
    checkStatus = async (req: Request, res: Response) => {
        try {
            const user = req.body
            console.log(user)
            const userFind = await Auth.findOneAndUpdate(
                {userName: user.userName}, {status: true}
            )
            return res.status(200).json({
                userFind
            })
        } catch (err) {
            console.log(err)
        }
    }

    logOut = async (req: Request, res: Response) => {

        res.clearCookie("refreshToken");
        res.status(200).json("Logged out successfully!");
    }

    requestRefreshToken = async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(401).json('Ban chua dang nhap')
        // if(!refreshTokenArray.includes(refreshToken)){
        //     return res.status(403).json('Token lac danh ???')
        // }
        jwt.verify(refreshToken, process.env["JWT_REFRESH_TOKEN"], (err, user) => {
            if (err) {
                console.log(err.message)
            }
            const newAccessToken = authController.generateAccessToken(user)
            const newRefreshToken = authController.refreshToken(user)
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict'
            })
            res.status(200).json({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
            })
        })

    }
}

export default new AuthController()