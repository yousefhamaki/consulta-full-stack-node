import supertest from "supertest";
import MainModel from "../../../app/models/main.models";
import adminModel from "../../../app/models/user/admin.model";
import Admin from "../../../app/types/admin.type";
import Employee from "../../../app/types/employee.type";
import User from "../../../app/types/user.type";
import app from "../../../index";

const request = supertest(app);
const main = new MainModel();
const model = new adminModel();

const admin = {
  email: "admin@admin.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
} as Admin;

const userTest = {
  email: "testuser2@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
  age: "23",
  ip: "127.0.0.1",
} as User;
const options = {
  validation: true,
} as object;

const user = {
  email: "yousefhamaki829@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
  options: JSON.stringify(options),
  salary: 2500,
  job_title: "lawer",
  status: "active",
} as Employee;

const userError = {
  email: "yousefhamaki199@gmail.com",
  name: "yousef hamaki",
  password: "2603hh",
} as Admin;

beforeAll(async () => {
  const res = await model.create(admin);
  admin.id = res.id;

  const res2 = await request.post("/api/admin/login").send(admin);
  admin.token = res2.body.data.token;

  const res3 = await request.post("/api/user/add").send(userTest);
  userTest.id = res3.body.data.id;
  userTest.token = res3.body.data.token;
});

afterAll(async () => {
  await main.delete(admin.id as number, "admins");
  await main.delete(user.id as number, "employees");
  await main.delete(userTest.id as number, "users");
});

describe("POST /api/employee/add", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/employee/add")
      .send(user)
      .set({ Authorization: admin.token });

    user.id = res.body.data.id;
    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
  });
  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/employee/add")
      .send(userError)
      .set({ Authorization: admin.token });

    console.log(res.body);
    expect(res.status).toEqual(412);
  });

  it("returns status code `505`", async () => {
    const res = await request
      .post("/api/employee/add")
      .send(user)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(505);
  });
  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/employee/add")
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(res.body.message).toBe("validation error");
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/employee/add");

    expect(res.status).toEqual(401);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .post("/api/employee/add")
      .set({ Authorization: userTest.token });

    expect(res.status).toEqual(401);
  });
});

describe("POST /api/employee/login", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/employee/login").send(user);

    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
  });

  it("returns status code `404`", async () => {
    const res = await request
      .get("/api/employee/login")
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(404);
  });

  it("returns status code `412`", async () => {
    const res = await request.post("/api/employee/login");

    expect(res.status).toEqual(412);
    expect(res.body.message).toBe("validation error");
  });
});

describe("GET /api/employee/getinfo/:id", function () {
  it("returns status code `401`", async () => {
    const res = await request.get("/api/employee/getinfo/" + user.id);

    expect(res.status).toEqual(401);
  });

  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/employee/getinfo/" + user.id)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
  });
});

describe("PUT /api/admin/me/change/pass", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/employee/me/change/pass")
      .send({
        id: user.id as number,
        oldpassword: user.password,
        newpassword: "Hamaki$2603",
      })
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/employee/me/change/pass")
      .send({
        id: user.id as number,
        oldpassword: user.password,
        newpassword: "Hamaki$2603",
      })
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
  });

  it("returns status code `401`", async () => {
    const res = await request.put("/api/employee/me/change/pass").send({
      id: user.id as number,
      oldpassword: user.password,
      newpassword: "Hamaki$2603",
    });

    expect(res.status).toEqual(401);
  });
  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/employee/me/change/pass")
      .send({ id: user.id as number })
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/employee/me/change/pass")
      .send({})
      .set({ Authorization: user.token });

    expect(res.status).toEqual(401);
  });
});
