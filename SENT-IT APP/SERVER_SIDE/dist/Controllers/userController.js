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
exports.checkUser = exports.updateuser = exports.deleteUser = exports.getSingleUser = exports.getAllUsers = exports.loginUser = exports.registerUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_js_1 = require("../config/config.js");
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userValidation_js_1 = require("../helpers/userValidation.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DB_1 = __importDefault(require("../databaseHelper/DB"));
const db = new DB_1.default();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = (0, uuid_1.v4)();
        console.log(req.body);
        const user_role = "user";
        const is_sent = "0";
        const { email, password, name, phone } = req.body;
        const { error, value } = userValidation_js_1.UserSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        const check_if_user_exist = (yield db.exec("check_user_if_exist", { email })).recordset;
        if (check_if_user_exist[0]) {
            return res
                .status(409)
                .json({ message: "user with that email already exist" });
        }
        else {
            const hashedpassword = yield bcrypt_1.default.hash(password, 10);
            yield db.exec("InsertUpdate", {
                user_id,
                email,
                phone,
                hashedpassword,
                user_role,
                is_sent,
                name,
            });
            res
                .status(200)
                .json({
                message: "Registered...Redirecting to login page....",
            });
        }
    }
    catch (error) {
        return res.json({ error });
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
        const user_exist = (yield db.exec("check_user_if_exist", { email })).recordset;
        if (!user_exist[0]) {
            return res.status(401).json({ message: "User Not found" });
        }
        console.log(password);
        const valid_password = yield bcrypt_1.default.compare(password, user_exist[0].hashedpassword);
        if (!valid_password) {
            res.status(401).json({ message: "invalid details" });
        }
        const payload = user_exist.map((item) => {
            const { hashedpassword } = item, rest = __rest(item, ["hashedpassword"]);
            return rest;
        });
        //, { expiresIn: '3600s' }
        const token = jsonwebtoken_1.default.sign(payload[0], process.env.key);
        return res
            .status(200)
            .json({ message: "you are logged in", token: token });
    }
    catch (error) {
        console.log(error);
    }
});
exports.loginUser = loginUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = (yield db.exec("get_all_users")).recordset;
        if (!users) {
            res.json({ message: "no users in the database" });
        }
        console.log(users);
        return res.json(users);
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.params.id;
        console.log(user_id);
        const single_user = (yield db.exec("get_single_user", { user_id })).recordset;
        if (!single_user) {
            res.json({ message: "user not found!!" });
        }
        else {
            console.log(single_user);
            res.json(single_user);
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.getSingleUser = getSingleUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const delete_user = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("get_single_user");
        if (!delete_user.recordset[0]) {
            res.json({ message: "user with that id does not exist..." });
        }
        else {
            yield pool.request().input("id", mssql_1.default.VarChar, id).execute("deleteUser");
            res.json({ message: "user successfully deleted...." });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.deleteUser = deleteUser;
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const { user_name, user_email, role } = req.body;
        const user_to_update = yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .execute("get_single_user");
        if (!user_to_update.recordset[0]) {
            return res.json({ message: "user with that id does not exist..." });
        }
        yield pool
            .request()
            .input("id", mssql_1.default.VarChar, id)
            .input("user_email", mssql_1.default.VarChar, user_email)
            .input("role", mssql_1.default.VarChar, role)
            .input("user_name", mssql_1.default.VarChar, user_name)
            .execute("updateUser");
        res.json({ message: "user successfully updated....." });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateuser = updateuser;
const checkUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.info) {
        res.json({
            user_name: req.info.user_name,
            role: req.info.user_role,
            user_email: req.info.user_email,
        });
    }
});
exports.checkUser = checkUser;
