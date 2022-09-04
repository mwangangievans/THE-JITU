"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.project_router = exports.router = void 0;
const express_1 = require("express");
const userController_js_1 = require("../Controllers/userController.js");
const projectController_js_1 = require("../Controllers/projectController.js");
const verifyToken_js_1 = require("../middleware/verifyToken.js");
exports.router = (0, express_1.Router)();
// auth routers
exports.router.post('/login', userController_js_1.loginUser);
exports.router.post('/signup', userController_js_1.registerUser);
exports.router.get('/check-user', verifyToken_js_1.VerifyToken, userController_js_1.checkUser);
// user routers
exports.router.get('/all-users', userController_js_1.getAllUsers);
exports.router.get('/:id', userController_js_1.getSingleUser);
exports.router.put('/edit/:id', userController_js_1.updateuser);
exports.router.delete('/delete/:id', userController_js_1.deleteUser);
// project routers
exports.project_router = (0, express_1.Router)();
exports.project_router.post('/create', projectController_js_1.createProject);
exports.project_router.patch('/edit/:id', projectController_js_1.updateProject);
exports.project_router.delete('/delete/:id', projectController_js_1.delete_project);
exports.project_router.get('/all-projects', projectController_js_1.getAllProjects);
