"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../module/auth");
class UserController {
    constructor() {
        this.getAllUser = async (req, res) => {
            try {
                let allUser = await auth_1.Auth.find();
                res.status(200).json({
                    allUser
                });
            }
            catch (err) {
                res.status(500).json({
                    mess: err.message
                });
            }
        };
        this.deleteUser = async (req, res) => {
            try {
                let id = req.params.id;
                let deleteUser = await auth_1.Auth.findById({ _id: id });
                res.status(202).json({
                    deleteUser,
                    mess: "xoa thanh cong"
                });
            }
            catch (err) {
                res.status(500).json({
                    mess: err.message
                });
            }
        };
        this.sort = async (req, res) => {
            try {
                let typeSort = req.headers.typesort;
                if (typeSort === 'asc') {
                    let allUsersAfterSortingASC = await auth_1.Auth.find().sort({ userName: 1 });
                    res.status(200).json({
                        allUsersAfterSortingASC
                    });
                }
                if (typeSort === 'desc') {
                    let allUsersAfterSortingDESC = await auth_1.Auth.find().sort({ userName: -1 });
                    res.status(200).json({
                        allUsersAfterSortingDESC
                    });
                }
            }
            catch (err) {
                res.status(500).json({
                    mess: err.message
                });
            }
        };
    }
}
exports.default = new UserController();
//# sourceMappingURL=userController.js.map