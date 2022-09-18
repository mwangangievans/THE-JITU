"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllParcels = exports.delete_parcel = exports.getSingleParcel = exports.createParcel = void 0;
const DB_1 = __importDefault(require("../databaseHelper/DB"));
const db = new DB_1.default();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const parcelValidation_js_1 = require("../helpers/parcelValidation.js");
const createParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Cost, Receiver, Sender, deliverde_notify, destination, dispatch_notify, is_deleted, is_delived, is_dispatched, lat, logi, parcel_no, time_Dispatched, weight } = req.body;
        const { error, value } = parcelValidation_js_1.ParcelSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const check_if_parcel_exist = (yield db.exec("get_single_parcel", { parcel_no })).recordset;
        yield db.exec("InsertUpdateParcel", { Cost, Receiver, Sender, deliverde_notify, destination, dispatch_notify, is_deleted, is_delived, is_dispatched, lat, logi, parcel_no, time_Dispatched, weight });
        if (check_if_parcel_exist.length === 0) {
            return res.json({ message: "Parcel successfully Created..." });
        }
        else {
            return res.json({ message: "Parcel successfully updated..." });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createParcel = createParcel;
const getSingleParcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parcel_no = req.params.id;
        const single_user = (yield db.exec("get_single_parcel", { parcel_no })).recordset;
        if (single_user.length === 0) {
            return res.json({ message: "Parcel not found!!" });
        }
        else {
            return res.json(single_user);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getSingleParcel = getSingleParcel;
//   export const deleteParcels: RequestHandler = async (req, res) => {
//     try {
//         const parcel_no = req.params.id;
//         const Parcels: Parcel[] = (
//             await db.exec("deleteParcel",{parcel_no})
//           ).recordset;
//         if (Parcels.length===0) {   
//             return  res.json({ message: "no Parcels in the database" });
//         }else{
//             return res.json(Parcels);
//         }
//       } catch (error) {
//         res.json({ error });
//       }
// }
const delete_parcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parcel_no = req.params.id;
        const single_user = (yield db.exec("get_single_parcel", { parcel_no })).recordset;
        if (single_user.length === 0) {
            return res.json({ message: "Parcel with that id does not exist..." });
        }
        else {
            yield db.exec("deleteParcel", { parcel_no });
            return res.json({ message: "parcel successfully deleted...." });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.delete_parcel = delete_parcel;
const getAllParcels = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Parcels = (yield db.exec("get_all_parcels")).recordset;
        if (Parcels.length === 0) {
            return res.json({ message: "no Parcels in the database" });
        }
        else {
            return res.json(Parcels);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getAllParcels = getAllParcels;
