import menuRouter from "./menu.routes";
import { Router } from "express";

const router = Router();

router.use("/menu", menuRouter);

export default router;
