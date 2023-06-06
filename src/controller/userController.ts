import {Request, Response} from "express";
import {Auth} from "../module/auth";

class UserController {
    getAllUser = async (req: Request, res: Response) => {
        try {
            let allUser = await Auth.find()
            res.status(200).json({
                allUser
            })
        } catch (err) {
            res.status(500).json({
                mess: err.message
            })
        }
    }
    deleteUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let deleteUser = await Auth.findById({_id: id})
            res.status(202).json({
                deleteUser,
                mess: "xoa thanh cong"
            })
        } catch (err) {
            res.status(500).json({
                mess: err.message
            })
        }
    }

    sort = async (req: Request, res: Response) => {
        try {
            let typeSort = req.headers.typesort
            if(typeSort === 'asc'){
                let allUsersAfterSortingASC = await Auth.find().sort(
                    {userName: 1}
                )
                res.status(200).json({
                    allUsersAfterSortingASC
                })
            }
            if(typeSort === 'desc'){
                let allUsersAfterSortingDESC = await Auth.find().sort(
                    {userName: -1}
                )
                res.status(200).json({
                    allUsersAfterSortingDESC
                })
            }

        }catch (err) {
            res.status(500).json({
                mess: err.message
            })
        }
    }

}

export default new UserController()