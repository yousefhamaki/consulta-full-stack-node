import { Router } from "express";
import QueryMiddleware from "../../../middleware/Query.middleware";
import adminRequest from "../../../requests/user/admin.request";
import AuthorizationMiddleWare from "../../../middleware/Authorization.middleware";
import { admin } from "../../../controller/user";

const router = Router();
const requests = new adminRequest();
const checkQuery = new QueryMiddleware();
const Authorization = new AuthorizationMiddleWare();

router.post("/login", checkQuery.Query(requests.login), admin.loginController); //tested
router.post(
  "/add/newadmin",
  checkQuery.Query(requests.add),
  admin.createController
); //tested

router.put(
  "/me/change/pass",
  Authorization.selfData,
  checkQuery.Query(requests.changePass),
  admin.changePassController
); //tested

router.post("/all", admin.getAdminInfoController);

router.get("/getinfo/:id", admin.getAdminInfoController); //tested

export default router;
