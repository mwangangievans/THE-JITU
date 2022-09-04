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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_js_1 = require("../config/config.js");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidation_js_1 = require("../helpers/userValidation.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const id = (0, uuid_1.v4)();
        const { email, password, name } = req.body;
        const { error, value } = userValidation_js_1.UserSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const check_if_user_exist = yield (yield pool.request().input('user_email', mssql_1.default.VarChar, email).execute('check_user_if_exist')).recordset;
        if (check_if_user_exist[0]) {
            return res.json({ message: 'user with that email already exist' });
        }
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        yield pool.request()
            .input('user_id', mssql_1.default.VarChar, id)
            .input('user_email', mssql_1.default.VarChar, email)
            .input('user_role', mssql_1.default.VarChar, 'user')
            .input('user_name', mssql_1.default.VarChar, name)
            .input('user_password', mssql_1.default.VarChar, hashedpassword)
            .execute('insert_User');
        res.json({ message: 'Registered...' });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const { email, password } = req.body;
        const { error, value } = userValidation_js_1.UserSchema2.validate(req.body);
        if (error) {
            res.json({ Error: error.details[0].message });
        }
        const user_exist = yield (yield pool.request().input('user_email', mssql_1.default.VarChar, email).execute('check_user_if_exist')).recordset;
        if (!user_exist[0]) {
            return res.json({ message: 'User Not found' });
        }
        const valid_password = yield bcrypt_1.default.compare(password, user_exist[0].user_password);
        if (!valid_password) {
            res.json({ message: "invalid password..." });
        }
        const payload = user_exist.map((item) => {
            const { user_password } = item, rest = __rest(item, ["user_password"]);
            return rest;
        });
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.key, { expiresIn: '3600s' });
        return res.json({
            message: "you are logged in",
            token
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
