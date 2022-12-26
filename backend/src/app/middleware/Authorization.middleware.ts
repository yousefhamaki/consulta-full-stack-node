import { Response, NextFunction } from "express";
import ARequest from "../interface/Request.interface";
import adminModel from "../models/user/admin.model";
import employeeModel from "../models/user/employee.model";
import userModel from "../models/user/user.model";
import Admin from "../types/admin.type";
import Employee from "../types/employee.type";
import Error from "../interface/Error.interface";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

class AuthorizationMiddleWare {
  private readonly model = new adminModel();
  private readonly employee = new employeeModel();
  private readonly user = new userModel();

  /**
   * @author y.hamaki
   * @type middleware
   * @param req @type {import ARequest from "../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */
  async isAdmin(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<unknown> | void> {
    try {
      const admin = await this.model.getAdmin(Number(req.body.id));
      req.user = admin;
      (req.user as Admin).rank = "admin";
      if (Number(admin.id) === Number(req.body.id)) {
        return next();
      } else {
        res.status(401).send({ message: "Unable to use this link" });
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @author y.hamaki
   * @type middleware
   * @param req @type {import ARequest from "../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async isEmployee(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<unknown> | void> {
    try {
      const admin = await this.employee.getEmployee(Number(req.body.id));
      req.user = admin;
      (req.user as Employee).rank = "employee";
      if (Number(admin.id) === Number(req.body.id)) {
        return next();
      } else {
        res.status(401).send({ message: "Unable to use this link" });
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * @author y.hamaki
   * @type middleware
   * @param req @type {import ARequest from "../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns Promise<Response<JsonReurn> | void>
   */

  async selfData(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<unknown> | void> {
    const data =
      req.method === "POST" || req.method === "PUT" ? req.body : req.params;
    const user = req.user;

    // if (req.method === "PUT" && req.originalUrl === "/api/user/change") {
    //   if (user?.id === req.body.id) {
    //     return next();
    //   }
    // }

    if (user?.id === data.id) {
      return next();
    }
    return res.status(401).send({ message: "Authorization Failed" });
  }

  /**
   * @author y.hamaki
   * @type middleware
   * @param type @type { string }
   * @returns Promise<Response<JsonReurn> | void>
   */

  isValied(type: string) {
    return async (req: ARequest, res: Response, next: NextFunction) => {
      try {
        const userInfo = req.user;
        let data;
        if (type === "user") {
          data = await this.user.getUser(Number(userInfo?.id));
        } else if (type === "admin") {
          data = await this.model.getAdmin(Number(userInfo?.id));
        } else if (type === "employee") {
          data = await this.employee.getEmployee(Number(userInfo?.id));
        }
        if (data?.id && data?.id === userInfo?.id) {
          data.rank = type;
          req.user = data;
          return next();
        } else {
          return res.status(401).send({ message: "Unable to use this link" });
        }
      } catch (err) {
        return res.status(401).send({ message: "Unable to use this link" });
      }
    };
  }

  /**
   * @author y.hamaki
   * @type middleware
   * @param req @type {import ARequest from "../interface/Request.interface";}
   * @param res @type {import { Response } from "express";}
   * @param next @type {import { NextFunction } from "express";}
   * @returns void
   */

  ValidToken(req: ARequest, _res: Response, next: NextFunction): void {
    try {
      const auth = req.headers.authorization as string;

      if (auth !== undefined) {
        const authData = auth.split(" ");
        const authType = authData[0].toLowerCase();
        const token = authData[1];

        if (token && authType === "bearer") {
          const check: JwtPayload = jwt.verify(
            token,
            config.secretToken as string
          ) as JwtPayload;
          if (check) {
            req.user = check.data;

            return next();
          }
        }
      }
      return this.HandleUnauthError(next);
    } catch (err) {
      this.HandleUnauthError(next);
    }
  }

  private HandleUnauthError(next: NextFunction): void {
    const err: Error = new Error("error Auth: please try again");

    err.status = 401;
    next(err);
  }
}

export default AuthorizationMiddleWare;
