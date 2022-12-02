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
exports.valiedEmail = void 0;
const user_model_1 = __importDefault(require("../models/user/user.model"));
const checkPass_1 = __importDefault(require("./checkPass"));
const models = new user_model_1.default();
const valiedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const validpass = yield (0, checkPass_1.default)(password);
    if (validpass.length < 3) {
        return {
            status: "failed",
            message: "validation error",
            data: {
                type: "password",
                info: validpass,
            },
        };
    }
    return false;
});
const valiedEmail = (email, table) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield models.checkEmail(email, table)) {
        return {
            status: "failed",
            message: "validation error",
            data: {
                type: "email",
                info: "your E-mail is not available",
            },
        };
    }
    return false;
});
exports.valiedEmail = valiedEmail;
exports.default = valiedPassword;
