import { Router } from "express";
import Query from "../../../middleware/Query.middleware";
import { selfData } from "../../../middleware/Authorization.middleware";
import employeeController from "../../../controller/user/employee.controller";
import employeeRequest from "../../../requests/user/employee.request";
import ValidToken, {
  isValied,
} from "../../../middleware/ValidateToken.middleware";

const router = Router();
const controller = new employeeController();
const requests = new employeeRequest();

router.post("/login", Query(requests.login), controller.login); //tested
router.post(
  "/add",
  ValidToken,
  isValied("admin"),
  Query(requests.add),
  controller.create
); //tested

router.put(
  "/me/change/pass",
  ValidToken,
  isValied("employee"),
  selfData,
  Query(requests.changePass),
  controller.changePass
); //tested

router.post("/all", ValidToken, isValied("admin"), controller.getEmployees);

router.get("/getinfo/:id", ValidToken, controller.getEmployeeInfo); //tested

export default router;
