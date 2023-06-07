"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const md5_1 = __importDefault(require("md5"));
const modelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cc: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    photos: [String],
}, { timestamps: true });
modelSchema.methods.setPassword = function setPassword(password) {
    this.password = (0, md5_1.default)(password);
};
exports.default = (0, mongoose_1.model)("Model", modelSchema);
