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
const Email_1 = __importDefault(require("../Helpers/Email"));
const db_1 = __importDefault(require("../DatabaseHelpers/db"));
const db = new db_1.default();
const WelcomeEmail = () => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield mssql_1.default.connect(Config_1.sqlConfig);
    const users = yield (yield db.exec("welcom_mail")).recordset;
    console.log(users);
    for (let user of users) {
        ejs_1.default.renderFile("templates/WelcomeEmail.ejs", { name: user.name }, (error, data) => __awaiter(void 0, void 0, void 0, function* () {
            let messageoption = {
                from: process.env.EMAIL,
                to: user.email,
                subject: "Welcome To SendIT, Thanks for Signing Up!",
                html: data,
                attachments: [
                    {
                        filename: "user.text",
                        content: `Welcome email: ${user.name}`,
                    },
                ],
            };
            try {
                yield (0, Email_1.default)(messageoption);
                console.log(user.user_id);
                yield db.exec("reset_welcom_mail", { user_id: user.user_id });
                console.log("Welcome Email Sent");
            }
            catch (error) {
                console.log(error);
            }
        }));
    }
});
exports.default = WelcomeEmail;
