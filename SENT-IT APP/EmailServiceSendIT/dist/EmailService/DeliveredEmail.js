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
const ejs_1 = __importDefault(require("ejs"));
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
const Config_1 = require("../Config/Config");
dotenv_1.default.config();
const db_1 = __importDefault(require("../DatabaseHelpers/db"));
const db = new db_1.default();
const Email_1 = __importDefault(require("../Helpers/Email"));
const DeliveredEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
    console.log("delivered.....");
    const parcels = yield (yield db.exec("sent_delivered_mails")).recordset;
    console.log(parcels);
    for (let parcel of parcels) {
        ejs_1.default.renderFile('templates/DeliveredEmail.ejs', { senderName: parcel.sender_name, receiverName: parcel.receiver_name, parcelOrigin: parcel.destination, deliveryDate: parcel.time_Dispatched, parcelDestination: parcel.destination }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: parcel.receiver_email,
                subject: "Your Parcel Has Been Delivered",
                html: data,
                attachments: [
                    {
                        filename: 'task.txt',
                        content: `Order summary for a package from : ${parcel.sender_name}`
                    }
                ]
            };
            try {
                yield (0, Email_1.default)(messageoption);
                yield db.exec("reset_delivered_notify", { parcel_no: parcel.parcel_no });
                console.log('Delivered Email is Sent');
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = DeliveredEmail;
