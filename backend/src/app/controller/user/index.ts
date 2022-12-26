import AdminController from "./admin.controller";
import employeeController from "./employee.controller";
import userController from "./user.controller";

export const admin = new AdminController();
export const user = new userController();
export const employee = new employeeController();
