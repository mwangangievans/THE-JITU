"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parcel_router = exports.router = void 0;
const express_1 = require("express");
const userController_js_1 = require("../Controllers/userController.js");
const verifyToken_js_1 = require("../middleware/verifyToken.js");
const parcelController_js_1 = require("../Controllers/parcelController.js");
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
exports.parcel_router = (0, express_1.Router)();
exports.parcel_router.post('/create', parcelController_js_1.createParcel);
exports.parcel_router.get('/show/:id', parcelController_js_1.getSingleParcel);
exports.parcel_router.delete('/delete/:id', parcelController_js_1.delete_parcel);
exports.parcel_router.get('/all-parcels', parcelController_js_1.getAllParcels);
