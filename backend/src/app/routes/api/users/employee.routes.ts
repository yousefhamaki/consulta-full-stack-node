import { Router } from "express";
import QueryMiddleware from "../../../middleware/Query.middleware";
import AuthorizationMiddleWare from "../../../middleware/Authorization.middleware";
import employeeRequest from "../../../requests/user/employee.request";
import { employee } from "../../../controller/user";

const router = Router();
const requests = new employeeRequest();
const checkQuery = new QueryMiddleware();
const Authorization = new AuthorizationMiddleWare();

router.post(
  "/login",
  checkQuery.Query(requests.login),
  employee.loginController
); //tested
router.post(
  "/add",
  Authorization.ValidToken,
  Authorization.isValied("admin"),
  checkQuery.Query(requests.add),
  employee.createController
); //tested

router.put(
  "/me/change/pass",
  Authorization.ValidToken,
  Authorization.isValied("employee"),
  Authorization.selfData,
  checkQuery.Query(requests.changePass),
  employee.changePassController
); //tested

router.post(
  "/all",
  Authorization.ValidToken,
  Authorization.isValied("admin"),
  employee.getEmployeesController
);

router.get(
  "/getinfo/:id",
  Authorization.ValidToken,
  employee.getEmployeeInfoController
); //tested

export default router;
