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
exports.selfData = exports.isEmployee = exports.isAdmin = void 0;
const admin_model_1 = __importDefault(require("../models/user/admin.model"));
const employee_model_1 = __importDefault(require("../models/user/employee.model"));
const model = new admin_model_1.default();
const employee = new employee_model_1.default();
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield model.getAdmin(Number(req.body.id));
        req.user = admin;
        req.user.rank = "admin";
        if (Number(admin.id) === Number(req.body.id)) {
            return next();
        }
        else {
            res.status(401).send({ message: "Unable to use this link" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.isAdmin = isAdmin;
const isEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield employee.getEmployee(Number(req.body.id));
        req.user = admin;
        req.user.rank = "employee";
        if (Number(admin.id) === Number(req.body.id)) {
            return next();
        }
        else {
            res.status(401).send({ message: "Unable to use this link" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.isEmployee = isEmployee;
const selfData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.method === "POST" || req.method === "PUT" ? req.body : req.params;
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.id) === data.id) {
        return next();
    }
    return res.status(401).send({ message: "Authorization Failed" });
});
exports.selfData = selfData;
