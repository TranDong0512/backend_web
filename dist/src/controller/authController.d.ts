import { Request, Response } from "express";
declare class AuthController {
    register: (req: Request, res: Response, next: any) => Promise<void>;
    generateAccessToken: (userFind: any) => any;
    refreshToken: (userFind: any) => any;
    login: (req: Request, res: Response, check: any) => Promise<void>;
    checkStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    logOut: (req: Request, res: Response) => Promise<void>;
    requestRefreshToken: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
declare const _default: AuthController;
export default _default;
