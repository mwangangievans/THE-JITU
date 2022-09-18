"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const router_js_1 = require("./Routers/router.js");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_2.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)());
app.use('/user', router_js_1.router);
app.use('/parcel', router_js_1.parcel_router);
app.listen(5000, () => {
    console.log("server is running");
});
