import { Router } from "express";
import Query from "../../../middleware/Query.middleware";
import AdminController from "../../../controller/user/admin.controller";
import adminRequest from "../../../requests/user/admin.request";
import { selfData } from "../../../middleware/Authorization.middleware";

const router = Router();
const controller = new AdminController();
const requests = new adminRequest();

router.post("/login", Query(requests.login), controller.login); //tested
router.post("/add/newadmin", Query(requests.add), controller.create); //tested

router.put(
  "/me/change/pass",
  selfData,
  Query(requests.changePass),
  controller.changePass
); //tested

router.post("/all", controller.getAdminInfo);

router.get("/getinfo/:id", controller.getAdminInfo); //tested

export default router;
