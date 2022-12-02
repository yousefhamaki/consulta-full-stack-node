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
exports.verifyAcc = void 0;
const config_1 = __importDefault(require("../config"));
const Gmail_1 = __importDefault(require("./Gmail"));
const mail = (options) => {
    options.from = config_1.default.EmailGmail;
    const result = {
        status: "waiting",
        data: {},
    };
    Gmail_1.default.sendMail(options, function (error, info) {
        if (error) {
            result.status = "failed";
            result.data = error;
        }
        else {
            result.status = "success";
            result.data = info;
        }
    });
    return result;
};
const verifyAcc = (_link, to) => __awaiter(void 0, void 0, void 0, function* () {
    const result = {
        status: "waiting",
        data: {},
    };
    const from = config_1.default.EmailGmail;
    const mailDetails = {
        from: from,
        to: to,
        subject: "Verify Account",
        text: "hello",
    };
    yield Gmail_1.default.sendMail(mailDetails, function (error, info) {
        if (error) {
            result.status = "failed";
            result.data = error;
            return result;
        }
        else {
            result.status = "success";
            result.data = info;
            return result;
        }
    });
});
exports.verifyAcc = verifyAcc;
exports.default = mail;
