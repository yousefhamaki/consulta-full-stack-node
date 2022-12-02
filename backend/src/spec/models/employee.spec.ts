import MainModel from "../../app/models/main.models";
import adminModel from "../../app/models/user/admin.model";
import employeeModel from "../../app/models/user/employee.model";
import Admin from "../../app/types/admin.type";
import Employee from "../../app/types/employee.type";

const employee = new employeeModel();
const admin = new adminModel();
const mainAction = new MainModel();

const adminUser = {
  email: "yousefhamaki80@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
} as Admin;

const options = {
  validation: true,
} as object;

const Newuser = {
  email: "yousefhamaki89@gmail.com",
  name: "yousef hamaki",
  password: "Yousef2603$",
  options: JSON.stringify(options),
  salary: 2500,
  job_title: "lawer",
  status: "active",
} as Employee;

describe("Employee Model", () => {
  beforeAll(async () => {
    const res = await admin.create(adminUser);
    Newuser.admin_id = res?.id as number;
  });
  afterAll(async () => {
    await mainAction.delete(Newuser.admin_id, "admins");
  });
  it("created new user", async () => {
    const res = await employee.create(Newuser);
    Newuser.id = res?.id;
    expect(res?.id as number).toBeDefined;
  });

  it("returns user info", async () => {
    const res = (await employee.getEmployee(Newuser.id as number)) as Admin;
    expect(Number(res.id)).toEqual(Newuser.id as number);
  });

  it("Get all users", async () => {
    const res = await employee.getEmployees(0);

    expect(res.data.length).toEqual(1);
  });

  it("Get all users", async () => {
    const res = await employee.getEmployees(1);

    expect(res.data).toBeNull;
  });

  it("Change password Successfully", async () => {
    const res = await employee.changePass("Hamaki5050", Newuser.id as number);

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("Change password Error", async () => {
    const res = await employee.changePass("Hamaki5050", 800);

    expect(res.changedRows).toEqual(0);
    expect(res.affectedRows).toEqual(0);
  });

  it("Make Auth Successfully", async () => {
    const res = await employee.makeAuth(Newuser.email, Newuser.password);
    expect(res?.id as number).toBeDefined;
  });

  it("Make Auth Error", async () => {
    const res = await employee.makeAuth(Newuser.email, "2603");

    expect(res).toBeNull;
  });

  it("Make Auth Error", async () => {
    const res = await employee.makeAuth(
      "yousefhamaki2222@gmail.com",
      Newuser.password as string
    );
    expect(res).toBeNull;
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(Newuser.id as number, "employees");
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(9999, "employees");
    expect(res.affectedRows).toEqual(0);
  });
});
