import { Request, Response, NextFunction } from "express";
import adminModel from "../../models/user/admin.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import JsonReurn from "../../interface/JsonReturn";
import ARequest from "../../interface/Request.interface";
import Check from "../../traits/Checks";

class AdminController {
  private readonly model = new adminModel();
  private readonly check = new Check();

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async createController(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    if (req.user == undefined || req.user.rank !== "admin") {
      return res.status(401).send({ message: "Unable to use this link" });
    }

    const checkPass = await this.check.Password(req.body.password);
    if (checkPass !== false) {
      return res.status(505).json(checkPass);
    }

    //add new user
    try {
      const checkemail = await this.check.Email(req.body.email, "admins");
      if (checkemail !== false) {
        return res.status(505).json(checkemail);
      }

      const create = await this.model.create(req.body);

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

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async loginController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const data = await this.model.makeAuth(req.body.email, req.body.password);

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

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async getAdminInfoController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await this.model.getAdmin(Number(req.params.id));

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

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async getAminsController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await this.model.getAllAdmins(Number(req.query.page) | 1);

      return res.status(200).json({
        status: "success",
        message: "Users info got successfully",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @author y.hamaki
   * @type controller
   * @param req @type {import ARequest from "../../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async changePassController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const result = await this.model.changePass(
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
        message: "Password changed successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AdminController;
