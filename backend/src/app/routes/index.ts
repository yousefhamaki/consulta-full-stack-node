import { Router } from "express";
import userRouter from "./api/users/user.routes";
import adminRouter from "./api/users/admin.routes";
import ValidToken, { isValied } from "../middleware/ValidateToken.middleware";
import Query from "../middleware/Query.middleware";
import adminRequest from "../requests/user/admin.request";
import AdminController from "../controller/user/admin.controller";
import employeeRouter from "./api/users/employee.routes";
import menuRouter from "./api/menu/menu.routes";

const router = Router();
const requests = new adminRequest();
const controller = new AdminController();

//users
router.use("/user", userRouter);
router.post("/admin/login", Query(requests.login), controller.login); //tested
router.use("/admin", ValidToken, isValied("admin"), adminRouter);
router.use("/employee", employeeRouter);

//menu routes

router.use("/menu", menuRouter);

export default router;
