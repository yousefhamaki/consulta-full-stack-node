import { Router } from "express";
import userRouter from "./user.routes";
import adminRouter from "./admin.routes";
import QueryMiddleware from "../../../middleware/Query.middleware";
import adminRequest from "../../../requests/user/admin.request";
import employeeRouter from "./employee.routes";
import { admin } from "../../../controller/user";
import AuthorizationMiddleWare from "../../../middleware/Authorization.middleware";

const router = Router();
const requests = new adminRequest();
const checkQuery = new QueryMiddleware();
const Authorization = new AuthorizationMiddleWare();

//users
router.use("/user", userRouter);
router.post(
  "/admin/login",
  checkQuery.Query(requests.login),
  admin.loginController
); //tested
router.use(
  "/admin",
  Authorization.ValidToken,
  Authorization.isValied("admin"),
  adminRouter
);
router.use("/employee", employeeRouter);

export default router;
