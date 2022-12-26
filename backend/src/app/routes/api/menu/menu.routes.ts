import { Router } from "express";
import menuController from "../../../controller/menu/menu.controller";

const router = Router();
const controller = new menuController();

router.get("/", controller.getMenuController);

export default router;
