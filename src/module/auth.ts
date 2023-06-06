import mongoose, {Schema,model} from 'mongoose'
import e from "express";


const userSchema = new Schema({
    userName:  {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required:true,
        minlength:8
    },
    imageU: {
        type: String,
        default: 'https://bookvexe.vn/wp-content/uploads/2023/04/chon-loc-25-avatar-facebook-mac-dinh-chat-nhat_2.jpg'
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 9,
        maxlength: 15
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },
    admin: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: false
    }
},
    {timestamps: true})
 export const Auth = mongoose.model('users',userSchema)
