import supertest from "supertest";
import MainModel from "../../../app/models/main.models";
import User from "../../../app/types/user.type";
import app from "../../../index";

const request = supertest(app);
const main = new MainModel();

const user = {
  email: "yousefhamaki19@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
  age: "23",
  ip: "127.0.0.1",
} as User;

const userError = {
  email: "yousefhamaki199@gmail.com",
  name: "yousef hamaki",
  password: "2603hh",
  age: "23",
  ip: "127.0.0.1",
} as User;

describe("POST /api/user/add", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/user/add").send(user);

    user.id = res.body.data.id;
    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
  });
  it("returns status code `505`", async () => {
    const res = await request.post("/api/user/add").send(userError);

    expect(res.status).toEqual(505);
  });

  it("returns status code `505`", async () => {
    const res = await request.post("/api/user/add").send(user);

    expect(res.status).toEqual(505);
  });
  it("returns status code `412`", async () => {
    const res = await request.post("/api/user/add");

    expect(res.status).toEqual(412);
    expect(res.body.message).toBe("validation error");
  });
  //   it("Send E-mail to user to verify acc", async () => {
  //     const res = await request
  //       .post("/api/user/verify")
  //       .send({ email: "yousefhamaki2@gmail.com" });
  //
  //     expect(res.body.data.accepted[0]).toEqual("yousefhamaki2@gmail.com");
  //   });
});

describe("POST /api/user/login", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/user/login").send(user);

    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
  });
  it("returns status code `404`", async () => {
    const res = await request.get("/api/user/login").send({});
    expect(res.status).toEqual(404);
  });
  it("returns status code `412`", async () => {
    const res = await request.post("/api/user/login");

    expect(res.status).toEqual(412);
    expect(res.body.message).toBe("validation error");
  });
});

describe("GET /api/user/getinfo/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request.get("/api/user/getinfo/" + user.id);

    expect(res.status).toEqual(200);
  });
});

describe("PUT /api/user/change/pass", function () {
  afterAll(async () => {
    await main.delete(user.id as number, "users");
  });
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/user/change/pass")
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
      .put("/api/user/change/pass")
      .send({
        id: user.id as number,
        oldpassword: user.password,
        newpassword: "Hamaki$2603",
      })
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
  });

  it("returns status code `401`", async () => {
    const res = await request.put("/api/user/change/pass").send({
      id: user.id as number,
      oldpassword: user.password,
      newpassword: "Hamaki$2603",
    });

    expect(res.status).toEqual(401);
  });
  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/user/change/pass")
      .send({})
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
  });
});

describe("GET /api/user/getinfo/:id", function () {
  it("returns status code `404`", async () => {
    const res = await request.get("/api/user/getinfo/" + user.id);

    expect(res.status).toEqual(404);
  });
});
