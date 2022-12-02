import supertest from "supertest";
import MainModel from "../../../app/models/main.models";
import adminModel from "../../../app/models/user/admin.model";
import Admin from "../../../app/types/admin.type";
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
  email: "testuser@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
  age: "23",
  ip: "127.0.0.1",
} as User;

const user = {
  email: "yousefhamaki19@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
} as Admin;

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
  await main.delete(user.id as number, "admins");
  await main.delete(userTest.id as number, "users");
});

describe("POST /api/admin/add", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/admin/add/newadmin")
      .send(user)
      .set({ Authorization: admin.token });

    user.id = res.body.data.id;
    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
  });
  it("returns status code `505`", async () => {
    const res = await request
      .post("/api/admin/add/newadmin")
      .send(userError)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(505);
  });

  it("returns status code `505`", async () => {
    const res = await request
      .post("/api/admin/add/newadmin")
      .send(user)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(505);
  });
  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/admin/add/newadmin")
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(412);
    expect(res.body.message).toBe("validation error");
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/admin/add/newadmin");

    expect(res.status).toEqual(401);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .post("/api/admin/add/newadmin")
      .set({ Authorization: userTest.token });

    expect(res.status).toEqual(401);
  });
});

describe("POST /api/admin/login", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/admin/login").send(user);

    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/admin/login").send({});
    expect(res.status).toEqual(401);
  });

  it("returns status code `404`", async () => {
    const res = await request
      .get("/api/admin/login")
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(404);
  });

  it("returns status code `412`", async () => {
    const res = await request.post("/api/admin/login");

    expect(res.status).toEqual(412);
    expect(res.body.message).toBe("validation error");
  });
});

describe("GET /api/admin/getinfo/:id", function () {
  it("returns status code `401`", async () => {
    const res = await request.get("/api/admin/getinfo/" + user.id);

    expect(res.status).toEqual(401);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .get("/api/admin/getinfo/" + user.id)
      .set({ Authorization: userTest.token });

    expect(res.status).toEqual(401);
  });

  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/admin/getinfo/" + user.id)
      .set({ Authorization: admin.token });

    expect(res.status).toEqual(200);
  });
});

describe("PUT /api/admin/me/change/pass", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/admin/me/change/pass")
      .send({
        id: user.id as number,
        oldpassword: user.password,
        newpassword: "Hamaki$2603",
      })
      .set({ Authorization: user.token });

    console.log(res.body);
    expect(res.status).toEqual(200);
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/admin/me/change/pass")
      .send({
        id: user.id as number,
        oldpassword: user.password,
        newpassword: "Hamaki$2603",
      })
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
  });

  it("returns status code `401`", async () => {
    const res = await request.put("/api/admin/me/change/pass").send({
      id: user.id as number,
      oldpassword: user.password,
      newpassword: "Hamaki$2603",
    });

    expect(res.status).toEqual(401);
  });
  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/admin/me/change/pass")
      .send({ id: user.id as number })
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
  });

  it("returns status code `401`", async () => {
    const res = await request
      .put("/api/admin/me/change/pass")
      .send({})
      .set({ Authorization: user.token });

    expect(res.status).toEqual(401);
  });
});
