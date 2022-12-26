import { Router } from "express";
import usersRouter from "./api/users/";
import menuRouter from "./api/menu/";

const router = Router();

//users
router.use(usersRouter);

//menu routes
router.use(menuRouter);

export default router;
