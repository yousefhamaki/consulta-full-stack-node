import { Router } from "express";
import userRequest from "../../../requests/user/user.request";
import QueryMiddleware from "../../../middleware/Query.middleware";
import { user } from "../../../controller/user";
import AuthorizationMiddleWare from "../../../middleware/Authorization.middleware";

const router = Router();
const requests = new userRequest();
const checkQuery = new QueryMiddleware();
const Authorization = new AuthorizationMiddleWare();

router.post("/login", checkQuery.Query(requests.login), user.loginController); //tested
router.post("/add", checkQuery.Query(requests.add), user.createController); //tested

router.put(
  "/change/pass",
  Authorization.ValidToken,
  Authorization.isValied("user"),
  checkQuery.Query(requests.changePass),
  user.changePassController
); //tested

router.post(
  "/verify/request",
  Authorization.ValidToken,
  Authorization.isValied("user"),
  checkQuery.Query(requests.verify),
  user.verifyRequestController
);
router.get("/verify/response/:code/:email", user.verifyResponseController);

router.post(
  "/all",
  Authorization.ValidToken,
  Authorization.isValied("admin"),
  user.getUsersController
);
router.delete(
  "/delete/:id",
  Authorization.ValidToken,
  Authorization.isValied("admin"),
  user.deleteController
);

router.get("/getinfo/:id", user.getUserInfoController); //tested

export default router;
