import MainModel from "../../app/models/main.models";
import adminModel from "../../app/models/user/admin.model";
import Admin from "../../app/types/admin.type";

const admin = new adminModel();
const mainAction = new MainModel();

const Newuser = {
  email: "yousefhamaki89@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
} as Admin;

describe("Admin Model", () => {
  it("created new user", async () => {
    const res = await admin.create(Newuser);
    Newuser.id = res?.id;
    expect(res?.id as number).toBeDefined;
  });

  it("returns user info", async () => {
    const res = (await admin.getAdmin(Newuser.id as number)) as Admin;
    expect(Number(res.id)).toEqual(Newuser.id as number);
  });

  it("Get all users", async () => {
    const res = await admin.getAllAdmins(0);

    expect(res.data.length).toBeGreaterThanOrEqual(1);
  });

  it("Get all users", async () => {
    const res = await admin.getAllAdmins(1);

    expect(res.data).toBeNull;
  });

  it("Change password Successfully", async () => {
    const res = await admin.changePass(
      Newuser.password as string,
      "Hamaki5050",
      Newuser.id as number
    );

    expect(res?.changedRows).toEqual(1);
    expect(res?.affectedRows).toEqual(1);
  });

  it("Change password Error", async () => {
    const res = await admin.changePass(
      "Kdndoadnad",
      "Hamaki5050",
      Newuser.id as number
    );

    expect(res).toBeNull;
  });

  it("Make Auth Successfully", async () => {
    const res = await admin.makeAuth(Newuser.email, Newuser.password as string);
    expect(res?.id as number).toBeDefined;
  });

  it("Make Auth Error", async () => {
    const res = await admin.makeAuth(Newuser.email, "2603");

    expect(res).toBeNull;
  });

  it("Make Auth Error", async () => {
    const res = await admin.makeAuth(
      "yousefhamaki2222@gmail.com",
      Newuser.password as string
    );
    expect(res).toBeNull;
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(Newuser.id as number, "admins");
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(9999, "admins");
    expect(res.affectedRows).toEqual(0);
  });
});
