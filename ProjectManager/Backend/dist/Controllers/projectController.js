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
exports.getAllProjects = exports.delete_project = exports.updateProject = exports.createProject = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_js_1 = require("../config/config.js");
const uuid_1 = require("uuid");
const userValidation_js_1 = require("../helpers/userValidation.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const id = (0, uuid_1.v4)();
        const { project_name, project_description, completion_date } = req.body;
        const { error, value } = userValidation_js_1.ProjectSchema.validate(req.body);
        if (error) {
            return res.json({ error: error.details[0].message });
        }
        yield pool.request()
            .input('project_id', mssql_1.default.VarChar, id)
            .input('Assigned_to', mssql_1.default.VarChar, "0a059010-7a1b-4309-b895-2fc535751959")
            .input('project_name', mssql_1.default.VarChar, project_name)
            .input('project_description', mssql_1.default.VarChar, project_description)
            .input('completion_date', mssql_1.default.DateTime, completion_date)
            .input('Is_completed', mssql_1.default.Bit, false)
            .execute('create_project');
        res.json({ message: "project successfully registered..." });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const { project_name, project_description, completion_date } = req.body;
        const project_to_update = yield pool.request().input('id', mssql_1.default.VarChar, id).execute('get_single_project');
        if (!project_to_update.recordset[0]) {
            return res.json({ message: "Project with that id does not exist..." });
        }
        yield pool.request()
            .input('id', mssql_1.default.VarChar, id)
            .input('name', mssql_1.default.VarChar, project_name)
            .input('description', mssql_1.default.VarChar, project_description)
            .input('date', mssql_1.default.Date, completion_date)
            .execute('updateProject');
        res.json({ message: "user successfully updated....." });
    }
    catch (error) {
        res.json({ error });
    }
});
exports.updateProject = updateProject;
const delete_project = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const project_to_update = yield pool.request().input('id', mssql_1.default.VarChar, id).execute('get_single_project');
        if (!project_to_update.recordset[0]) {
            return res.json({ message: "Project with that id does not exist..." });
        }
        else {
            yield pool.request().input('id', mssql_1.default.VarChar, id).execute('deleteProject');
            res.json({ message: "project successfully deleted...." });
        }
    }
    catch (error) {
        res.json({ error });
    }
});
exports.delete_project = delete_project;
// get all projects in the database
const getAllProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("gettiong... the projects...........");
        const pool = yield mssql_1.default.connect(config_js_1.sqlConfig);
        const projects = yield pool.request().execute('get_all_Projects');
        // console.log(projects);
        if (!projects.recordset[0]) {
            return res.json({ message: "You have no Projects available" });
        }
        const { recordset } = projects;
        return res.json(recordset);
    }
    catch (error) {
        return res.json({ error });
    }
});
exports.getAllProjects = getAllProjects;
