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
const supertest_1 = __importDefault(require("supertest"));
const main_models_1 = __importDefault(require("../../../app/models/main.models"));
const index_1 = __importDefault(require("../../../index"));
const request = (0, supertest_1.default)(index_1.default);
const main = new main_models_1.default();
const user = {
    email: "yousefhamaki19@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
    age: "23",
    ip: "127.0.0.1",
};
const userError = {
    email: "yousefhamaki199@gmail.com",
    name: "yousef hamaki",
    password: "2603hh",
    age: "23",
    ip: "127.0.0.1",
};
describe("POST /api/user/add", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/add").send(user);
        user.id = res.body.data.id;
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
    }));
    it("returns status code `505`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/add").send(userError);
        expect(res.status).toEqual(505);
    }));
    it("returns status code `505`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/add").send(user);
        expect(res.status).toEqual(505);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/add");
        expect(res.status).toEqual(412);
        expect(res.body.message).toBe("validation error");
    }));
});
describe("POST /api/user/login", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user);
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
    }));
    it("returns status code `404`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/login").send({});
        expect(res.status).toEqual(404);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login");
        expect(res.status).toEqual(412);
        expect(res.body.message).toBe("validation error");
    }));
});
describe("GET /api/user/getinfo/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/getinfo/" + user.id);
        expect(res.status).toEqual(200);
    }));
});
describe("PUT /api/user/change/pass", function () {
    afterAll(() => __awaiter(this, void 0, void 0, function* () {
        yield main.delete(user.id, "users");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/pass")
            .send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        })
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/pass")
            .send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        })
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.put("/api/user/change/pass").send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        });
        expect(res.status).toEqual(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/pass")
            .send({})
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
    }));
});
describe("GET /api/user/getinfo/:id", function () {
    it("returns status code `404`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/user/getinfo/" + user.id);
        expect(res.status).toEqual(404);
    }));
});
