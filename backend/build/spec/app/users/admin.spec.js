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
const admin_model_1 = __importDefault(require("../../../app/models/user/admin.model"));
const index_1 = __importDefault(require("../../../index"));
const request = (0, supertest_1.default)(index_1.default);
const main = new main_models_1.default();
const model = new admin_model_1.default();
const admin = {
    email: "admin@admin.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
};
const userTest = {
    email: "testuser@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
    age: "23",
    ip: "127.0.0.1",
};
const user = {
    email: "yousefhamaki19@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
};
const userError = {
    email: "yousefhamaki199@gmail.com",
    name: "yousef hamaki",
    password: "2603hh",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield model.create(admin);
    admin.id = res.id;
    const res2 = yield request.post("/api/admin/login").send(admin);
    admin.token = res2.body.data.token;
    const res3 = yield request.post("/api/user/add").send(userTest);
    userTest.id = res3.body.data.id;
    userTest.token = res3.body.data.token;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield main.delete(admin.id, "admins");
    yield main.delete(user.id, "admins");
    yield main.delete(userTest.id, "users");
}));
describe("POST /api/admin/add", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/admin/add/newadmin")
            .send(user)
            .set({ Authorization: admin.token });
        user.id = res.body.data.id;
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
    }));
    it("returns status code `505`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/admin/add/newadmin")
            .send(userError)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(505);
    }));
    it("returns status code `505`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/admin/add/newadmin")
            .send(user)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(505);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/admin/add/newadmin")
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(res.body.message).toBe("validation error");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/admin/add/newadmin");
        expect(res.status).toEqual(401);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/admin/add/newadmin")
            .set({ Authorization: userTest.token });
        expect(res.status).toEqual(401);
    }));
});
describe("POST /api/admin/login", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/admin/login").send(user);
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/admin/login").send({});
        expect(res.status).toEqual(401);
    }));
    it("returns status code `404`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/admin/login")
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(404);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/admin/login");
        expect(res.status).toEqual(412);
        expect(res.body.message).toBe("validation error");
    }));
});
describe("GET /api/admin/getinfo/:id", function () {
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/admin/getinfo/" + user.id);
        expect(res.status).toEqual(401);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/admin/getinfo/" + user.id)
            .set({ Authorization: userTest.token });
        expect(res.status).toEqual(401);
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/admin/getinfo/" + user.id)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
    }));
});
describe("PUT /api/admin/me/change/pass", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/admin/me/change/pass")
            .send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        })
            .set({ Authorization: user.token });
        console.log(res.body);
        expect(res.status).toEqual(200);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/admin/me/change/pass")
            .send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        })
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.put("/api/admin/me/change/pass").send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        });
        expect(res.status).toEqual(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/admin/me/change/pass")
            .send({ id: user.id })
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/admin/me/change/pass")
            .send({})
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
    }));
});
