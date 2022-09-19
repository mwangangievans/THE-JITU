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
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const WelcomeEmailService_1 = __importDefault(require("./EmailService/WelcomeEmailService"));
const OnTransitEmailService_1 = __importDefault(require("./EmailService/OnTransitEmailService"));
const DeliveredEmail_1 = __importDefault(require("./EmailService/DeliveredEmail"));
const app = (0, express_1.default)();
const run = () => {
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("delivered.....11");
        console.log('cron is running.....22');
        yield (0, WelcomeEmailService_1.default)();
        yield (0, OnTransitEmailService_1.default)();
        yield (0, DeliveredEmail_1.default)();
    }));
};
run();
app.listen(3000, () => {
    console.log('Email service is running.........................1');
});
