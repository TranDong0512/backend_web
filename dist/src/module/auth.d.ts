import mongoose from 'mongoose';
export declare const Auth: mongoose.Model<{
    userName: string;
    password: string;
    imageU: string;
    phone: string;
    email: string;
    admin: boolean;
    status: boolean;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    userName: string;
    password: string;
    imageU: string;
    phone: string;
    email: string;
    admin: boolean;
    status: boolean;
}>>;
