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
exports.isValied = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const admin_model_1 = __importDefault(require("../models/user/admin.model"));
const employee_model_1 = __importDefault(require("../models/user/employee.model"));
const user_model_1 = __importDefault(require("../models/user/user.model"));
const unauth_error_1 = __importDefault(require("./unauth.error"));
const user = new user_model_1.default();
const admin = new admin_model_1.default();
const employee = new employee_model_1.default();
const ValidToken = (req, _res, next) => {
    try {
        const auth = req.headers.authorization;
        if (auth !== undefined) {
            const authData = auth.split(" ");
            const authType = authData[0].toLowerCase();
            const token = authData[1];
            if (token && authType === "bearer") {
                const check = jsonwebtoken_1.default.verify(token, config_1.default.secretToken);
                if (check) {
                    req.user = check.data;
                    return next();
                }
            }
        }
        return (0, unauth_error_1.default)(next);
    }
    catch (err) {
        (0, unauth_error_1.default)(next);
    }
};
const isValied = (type) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userInfo = req.user;
            let data;
            if (type === "user") {
                data = yield user.getUser(Number(userInfo === null || userInfo === void 0 ? void 0 : userInfo.id));
            }
            else if (type === "admin") {
                data = yield admin.getAdmin(Number(userInfo === null || userInfo === void 0 ? void 0 : userInfo.id));
            }
            else if (type === "employee") {
                data = yield employee.getEmployee(Number(userInfo === null || userInfo === void 0 ? void 0 : userInfo.id));
            }
            if ((data === null || data === void 0 ? void 0 : data.id) && (data === null || data === void 0 ? void 0 : data.id) === (userInfo === null || userInfo === void 0 ? void 0 : userInfo.id)) {
                data.rank = type;
                req.user = data;
                return next();
            }
            else {
                return res.status(401).send({ message: "Unable to use this link" });
            }
        }
        catch (err) {
            return res.status(401).send({ message: "Unable to use this link" });
        }
    });
};
exports.isValied = isValied;
exports.default = ValidToken;
