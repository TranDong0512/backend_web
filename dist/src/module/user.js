"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    imageU: {
        type: String,
        default: 'https://bookvexe.vn/wp-content/uploads/2023/04/chon-loc-25-avatar-facebook-mac-dinh-chat-nhat_2.jpg'
    },
    phoneNumber: {
        type: String,
        unique: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('user', userSchema);
//# sourceMappingURL=user.js.map