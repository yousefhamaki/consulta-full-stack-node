import { Router } from "express";
import userRequest from "../../../requests/user/user.request";
import userController from "../../../controller/user/user.controller";
import Query from "../../../middleware/Query.middleware";
import ValidToken, {
  isValied,
} from "../../../middleware/ValidateToken.middleware";

const router = Router();
const controller = new userController();
const requests = new userRequest();

router.post("/login", Query(requests.login), controller.login); //tested
router.post("/add", Query(requests.add), controller.create); //tested

router.put(
  "/change/pass",
  ValidToken,
  isValied("user"),
  Query(requests.changePass),
  controller.changePass
); //tested

router.post(
  "/verify/request",
  ValidToken,
  isValied("user"),
  Query(requests.verify),
  controller.verifyRequest
);
router.get("/verify/response/:code/:email", controller.verifyResponse);

router.post("/all", ValidToken, isValied("admin"), controller.getUsers);
router.delete("/delete/:id", ValidToken, isValied("admin"), controller.delete);

router.get("/getinfo/:id", controller.getUserInfo); //tested

export default router;
