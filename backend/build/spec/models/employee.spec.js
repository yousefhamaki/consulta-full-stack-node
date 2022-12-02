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
const main_models_1 = __importDefault(require("../../app/models/main.models"));
const admin_model_1 = __importDefault(require("../../app/models/user/admin.model"));
const employee_model_1 = __importDefault(require("../../app/models/user/employee.model"));
const employee = new employee_model_1.default();
const admin = new admin_model_1.default();
const mainAction = new main_models_1.default();
const adminUser = {
    email: "yousefhamaki80@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
};
const options = {
    validation: true,
};
const Newuser = {
    email: "yousefhamaki89@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
    options: JSON.stringify(options),
    salary: 2500,
    job_title: "lawer",
    status: "active",
};
describe("Employee Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield admin.create(adminUser);
        Newuser.admin_id = res === null || res === void 0 ? void 0 : res.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mainAction.delete(Newuser.admin_id, "admins");
    }));
    it("created new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.create(Newuser);
        Newuser.id = res === null || res === void 0 ? void 0 : res.id;
        expect(res === null || res === void 0 ? void 0 : res.id).toBeDefined;
    }));
    it("returns user info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield employee.getEmployee(Newuser.id));
        expect(Number(res.id)).toEqual(Newuser.id);
    }));
    it("Get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.getEmployees(0);
        expect(res.data.length).toEqual(1);
    }));
    it("Get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.getEmployees(1);
        expect(res.data).toBeNull;
    }));
    it("Change password Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.changePass("Hamaki5050", Newuser.id);
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("Change password Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.changePass("Hamaki5050", 800);
        expect(res.changedRows).toEqual(0);
        expect(res.affectedRows).toEqual(0);
    }));
    it("Make Auth Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.makeAuth(Newuser.email, Newuser.password);
        expect(res === null || res === void 0 ? void 0 : res.id).toBeDefined;
    }));
    it("Make Auth Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.makeAuth(Newuser.email, "2603");
        expect(res).toBeNull;
    }));
    it("Make Auth Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield employee.makeAuth("yousefhamaki2222@gmail.com", Newuser.password);
        expect(res).toBeNull;
    }));
    it("Delete user from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(Newuser.id, "employees");
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete user from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(9999, "employees");
        expect(res.affectedRows).toEqual(0);
    }));
});
