import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import JsonReurn from "../../interface/JsonReturn";
import ARequest from "../../interface/Request.interface";
import employeeModel from "../../models/user/employee.model";
import Check from "../../traits/Checks";

class employeeController {
  private readonly models = new employeeModel();
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
      const checkemail = await this.check.Email(req.body.email, "employees");
      if (checkemail !== false) {
        return res.status(505).json(checkemail);
      }

      req.body.admin_id = req.user.id;
      const create = await this.models.create(req.body);

      const token = jwt.sign(
        { create },
        config.secretToken as unknown as string
      );

      return res.json({
        status: "success",
        message: "Employee created successfully",
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
      const data = await this.models.makeAuth(
        req.body.email as string,
        req.body.password as string
      );

      if (!data) {
        return res.status(401).json({
          status: "failed",
          message: "email or password is not correct",
        });
      }
      const token = jwt.sign({ data }, config.secretToken as unknown as string);
      return res.status(200).json({
        status: "success",
        message: "Employee is login successfully",
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
  async getEmployeeInfoController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await this.models.getEmployee(Number(req.params.id));

      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "this employee isnot defined",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Get employee info successfully",
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
  async getEmployeesController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await this.models.getEmployees(Number(req.query.page) | 1);

      return res.status(200).json({
        status: "success",
        message: "Employees info got successfully",
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
      const result = await this.models.changePass(
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

export default employeeController;
