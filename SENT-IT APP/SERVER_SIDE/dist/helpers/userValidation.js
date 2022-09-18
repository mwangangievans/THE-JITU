"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchema = exports.UserSchema2 = exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8),
    name: joi_1.default.string().required(),
    phone: joi_1.default.string().required()
});
exports.UserSchema2 = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8),
});
exports.ProjectSchema = joi_1.default.object({
    project_name: joi_1.default.string().required(),
    project_description: joi_1.default.string().required(),
    completion_date: joi_1.default.date().required()
});
