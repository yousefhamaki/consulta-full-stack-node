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
    email: "testuser2@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
    age: "23",
    ip: "127.0.0.1",
};
const options = {
    validation: true,
};
const user = {
    email: "yousefhamaki829@gmail.com",
    name: "yousef hamaki",
    password: "Yousef2603$",
    options: JSON.stringify(options),
    salary: 2500,
    job_title: "lawer",
    status: "active",
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
    yield main.delete(user.id, "employees");
    yield main.delete(userTest.id, "users");
}));
describe("POST /api/employee/add", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/employee/add")
            .send(user)
            .set({ Authorization: admin.token });
        user.id = res.body.data.id;
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/employee/add")
            .send(userError)
            .set({ Authorization: admin.token });
        console.log(res.body);
        expect(res.status).toEqual(412);
    }));
    it("returns status code `505`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/employee/add")
            .send(user)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(505);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/employee/add")
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(412);
        expect(res.body.message).toBe("validation error");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/employee/add");
        expect(res.status).toEqual(401);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/employee/add")
            .set({ Authorization: userTest.token });
        expect(res.status).toEqual(401);
    }));
});
describe("POST /api/employee/login", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/employee/login").send(user);
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
    }));
    it("returns status code `404`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/employee/login")
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(404);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/employee/login");
        expect(res.status).toEqual(412);
        expect(res.body.message).toBe("validation error");
    }));
});
describe("GET /api/employee/getinfo/:id", function () {
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/employee/getinfo/" + user.id);
        expect(res.status).toEqual(401);
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/employee/getinfo/" + user.id)
            .set({ Authorization: admin.token });
        expect(res.status).toEqual(200);
    }));
});
describe("PUT /api/admin/me/change/pass", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/employee/me/change/pass")
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
            .put("/api/employee/me/change/pass")
            .send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        })
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.put("/api/employee/me/change/pass").send({
            id: user.id,
            oldpassword: user.password,
            newpassword: "Hamaki$2603",
        });
        expect(res.status).toEqual(401);
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/employee/me/change/pass")
            .send({ id: user.id })
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/employee/me/change/pass")
            .send({})
            .set({ Authorization: user.token });
        expect(res.status).toEqual(401);
    }));
});
