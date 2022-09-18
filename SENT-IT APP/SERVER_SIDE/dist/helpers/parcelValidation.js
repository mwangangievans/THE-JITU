"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParcelSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ParcelSchema = joi_1.default.object({
    Cost: joi_1.default.string().required(),
    Receiver: joi_1.default.string().required(),
    Sender: joi_1.default.string().required(),
    deliverde_notify: joi_1.default.boolean().required(),
    destination: joi_1.default.string().required(),
    dispatch_notify: joi_1.default.boolean().required(),
    is_deleted: joi_1.default.boolean().required(),
    is_delived: joi_1.default.boolean().required(),
    is_dispatched: joi_1.default.boolean().required(),
    lat: joi_1.default.required(),
    logi: joi_1.default.required(),
    parcel_no: joi_1.default.number().required(),
    time_Dispatched: joi_1.default.string().required(),
    weight: joi_1.default.string().required(),
});
