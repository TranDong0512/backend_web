import { Request, Response } from "express";
declare class UserController {
    getAllUser: (req: Request, res: Response) => Promise<void>;
    deleteUser: (req: Request, res: Response) => Promise<void>;
    sort: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
