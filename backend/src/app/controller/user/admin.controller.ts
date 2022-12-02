import { Request, Response, NextFunction } from "express";
import adminModel from "../../models/user/admin.model";
import valiedPassword, { valiedEmail } from "../../traits/valiedPassword";
import jwt from "jsonwebtoken";
import config from "../../config";
import JsonReurn from "../../interface/JsonReturn";
import ARequest from "../../interface/Request.interface";

const admin = new adminModel();

class AdminController {
  async create(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    if (req.user == undefined || req.user.rank !== "admin") {
      return res.status(401).send({ message: "Unable to use this link" });
    }

    const checkPass = await valiedPassword(req.body.password);
    if (checkPass !== false) {
      return res.status(505).json(checkPass);
    }

    //add new user
    try {
      const checkemail = await valiedEmail(req.body.email, "admins");
      if (checkemail !== false) {
        return res.status(505).json(checkemail);
      }

      const create = await admin.create(req.body);

      const token = jwt.sign(
        { create },
        config.secretToken as unknown as string
      );

      return res.json({
        status: "success",
        message: "Admin created successfully",
        data: { ...create, token: "Bearer " + token },
      });
    } catch (err) {
      next(err);
    }
  }

  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const data = await admin.makeAuth(req.body.email, req.body.password);

      if (!data) {
        return res.status(401).json({
          status: "failed",
          message: "email or password is not correct",
        });
      }
      const token = jwt.sign({ data }, config.secretToken as unknown as string);
      return res.status(200).json({
        status: "success",
        message: "Admin is login successfully",
        data: { ...data, token: "Bearer " + token },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAdminInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await admin.getAdmin(Number(req.params.id));

      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "this admin isnot defined",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Get Admin info successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async getAmins(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await admin.getAllAdmins(Number(req.query.page) | 1);

      return res.status(200).json({
        status: "success",
        message: "Users info got successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async changePass(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await admin.changePass(
        req.body.oldpassword,
        req.body.newpassword,
        Number(req.body.id)
      );

      if (result === null) {
        return res.status(412).json({
          status: "failed",
          message: "your password isnot correct",
        });
      }

      return res.json({
        status: "success",
        message: "User account is verified successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AdminController;
