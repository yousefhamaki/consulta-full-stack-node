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
const sender_1 = require("../../app/mail/sender");
const main_models_1 = __importDefault(require("../../app/models/main.models"));
const user_model_1 = __importDefault(require("../../app/models/user/user.model"));
const user = new user_model_1.default();
const mainAction = new main_models_1.default();
const code = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNlZmhhbWFraTJAZ21haWwuY29tIiwiaWQiOjIyLCJpYXQiOjE2Njg2MDMwNjIsImV4cCI6MTY2ODYwMzM2Mn0.l0WX7718bA5lqnpLR45xC9dn_TohaISX_qlRBm4AUQA";
const Newuser = {
    email: "yousefhamaki89@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
    age: "23",
    ip: "127.0.0.1",
};
describe("User Model", () => {
    it("created new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.create(Newuser);
        Newuser.id = res === null || res === void 0 ? void 0 : res.id;
        expect(res === null || res === void 0 ? void 0 : res.id).toBeDefined;
    }));
    it("returns user info", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = (yield user.getUser(Newuser.id));
        expect(Number(res.id)).toEqual(Newuser.id);
    }));
    it("Get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.getAllUsers(0);
        expect(res.data.length).toBeGreaterThanOrEqual(1);
    }));
    it("Get all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.getAllUsers(1);
        expect(res.data).toBeNull;
    }));
    it("Change password Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.changePass(Newuser.password, "Hamaki5050", Newuser.id);
        expect(res === null || res === void 0 ? void 0 : res.changedRows).toEqual(1);
        expect(res === null || res === void 0 ? void 0 : res.affectedRows).toEqual(1);
    }));
    it("Change password Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.changePass("hamakei5205", "Hamaki5050", Newuser.id);
        expect(res).toBeNull;
    }));
    it("Change password Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.changePass("hamakei5205", "Hamaki5050", 5555);
        expect(res).toBeNull;
    }));
    it("Save activation code", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.saveCode(code, Newuser.email);
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("Make user Verified", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.Verify(Newuser.email);
        expect(res.changedRows).toEqual(1);
        expect(res.affectedRows).toEqual(1);
    }));
    it("Make Auth Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.makeAuth(Newuser.email, Newuser.password);
        expect(res === null || res === void 0 ? void 0 : res.id).toBeDefined;
    }));
    it("Make Auth Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.makeAuth(Newuser.email, "2603");
        expect(res).toBeNull;
    }));
    it("Make Auth Error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield user.makeAuth("yousefhamaki2222@gmail.com", Newuser.password);
        expect(res).toBeNull;
    }));
    it("send verification code", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, sender_1.verifyAcc)("http://localhost:5000", "yousefhamaki2@gmail.com");
        expect(res).toBeNull;
    }));
    it("Delete user from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(Newuser.id, "users");
        expect(res.affectedRows).toEqual(1);
    }));
    it("Delete user from DB", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield mainAction.delete(9999, "users");
        expect(res.affectedRows).toEqual(0);
    }));
});
