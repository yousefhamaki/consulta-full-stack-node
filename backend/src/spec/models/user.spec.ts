import { verifyAcc } from "../../app/mail/sender";
import MainModel from "../../app/models/main.models";
import userModel from "../../app/models/user/user.model";
import User from "../../app/types/user.type";

const user = new userModel();
const mainAction = new MainModel();

const code =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNlZmhhbWFraTJAZ21haWwuY29tIiwiaWQiOjIyLCJpYXQiOjE2Njg2MDMwNjIsImV4cCI6MTY2ODYwMzM2Mn0.l0WX7718bA5lqnpLR45xC9dn_TohaISX_qlRBm4AUQA";
const Newuser = {
  email: "yousefhamaki89@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
  age: "23",
  ip: "127.0.0.1",
} as User;

describe("User Model", () => {
  it("created new user", async () => {
    const res = await user.create(Newuser);
    Newuser.id = res?.id;
    expect(res?.id as number).toBeDefined;
  });

  it("returns user info", async () => {
    const res = (await user.getUser(Newuser.id as number)) as User;
    expect(Number(res.id)).toEqual(Newuser.id as number);
  });

  it("Get all users", async () => {
    const res = await user.getAllUsers(0);

    expect(res.data.length).toBeGreaterThanOrEqual(1);
  });

  it("Get all users", async () => {
    const res = await user.getAllUsers(1);

    expect(res.data).toBeNull;
  });

  it("Change password Successfully", async () => {
    const res = await user.changePass(
      Newuser.password,
      "Hamaki5050",
      Newuser.id as number
    );

    expect(res?.changedRows).toEqual(1);
    expect(res?.affectedRows).toEqual(1);
  });

  it("Change password Error", async () => {
    const res = await user.changePass(
      "hamakei5205",
      "Hamaki5050",
      Newuser.id as number
    );

    expect(res).toBeNull;
  });

  it("Change password Error", async () => {
    const res = await user.changePass("hamakei5205", "Hamaki5050", 5555);

    expect(res).toBeNull;
  });

  it("Save activation code", async () => {
    const res = await user.saveCode(code, Newuser.email);

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("Make user Verified", async () => {
    const res = await user.Verify(Newuser.email);

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("Make Auth Successfully", async () => {
    const res = await user.makeAuth(Newuser.email, Newuser.password);
    expect(res?.id as number).toBeDefined;
  });

  it("Make Auth Error", async () => {
    const res = await user.makeAuth(Newuser.email, "2603");

    expect(res).toBeNull;
  });

  it("Make Auth Error", async () => {
    const res = await user.makeAuth(
      "yousefhamaki2222@gmail.com",
      Newuser.password
    );
    expect(res).toBeNull;
  });

  it("send verification code", async () => {
    const res = await verifyAcc(
      "http://localhost:5000",
      "yousefhamaki2@gmail.com"
    );
    expect(res).toBeNull;
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(Newuser.id as number, "users");
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(9999, "users");
    expect(res.affectedRows).toEqual(0);
  });
});
