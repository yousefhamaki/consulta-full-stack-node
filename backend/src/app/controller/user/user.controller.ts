import { Request, Response, NextFunction } from "express";
import JsonReurn from "../../interface/JsonReturn";
import userModel from "../../models/user/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import mailOptions from "../../types/MailOption.type";
import transporter from "../../mail/Gmail";
import MainModel from "../../models/main.models";
import Check from "../../traits/Checks";

class userController {
  private readonly mainModel = new MainModel();
  private readonly models = new userModel();
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
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    //password validation
    const checkPass = await this.check.Password(req.body.password);
    if (checkPass !== false) {
      return res.status(505).json(checkPass);
    }
    //add new user
    try {
      const checkemail = await this.check.Email(req.body.email, "users");
      if (checkemail !== false) {
        return res.status(505).json(checkemail);
      }
      const create = await this.models.create(req.body);
      const token = jwt.sign(
        { create },
        config.secretToken as unknown as string
      );

      return res.json({
        status: "success",
        message: "User created successfully",
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
        req.body.email,
        req.body.password
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
        message: "user is login successfully",
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

  async getUserInfoController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await this.models.getUser(Number(req.params.id));

      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "this user isnot defined",
        });
      }
      return res.status(200).json({
        status: "success",
        message: "Get User info successfully",
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

  async getUsersController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const user = await this.models.getAllUsers(Number(req.query.page) | 1);

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

  async deleteController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const state = await this.mainModel.delete(Number(req.params.id), "users");
      if (state.affectedRows === 1) {
        return res.json({
          status: "success",
          message: "User deleted successfully",
          data: state,
        });
      }
      return res.status(500).json({
        status: "failed",
        message: "This user isnot defined",
        data: state,
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

  async verifyRequestController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const token = jwt.sign(
        { email: req.body.email as string, id: 22 },
        config.secretToken as string,
        {
          expiresIn: "5m",
        }
      );

      await this.models.saveCode(token, req.body.email);

      const mailDetails: mailOptions = {
        to: req.body.email as string,
        subject: "Verify Account",
        html: `<div>
        <h2>Verify your consulta account</h2>
        <a href="${
          config.DomainName +
          "/api/verify/verify." +
          token +
          "/" +
          req.body.email
        }">
          <button>verify</button>
        </a>
      </div>`,
      };
      await transporter.sendMail(mailDetails, function (error, info) {
        if (error) {
          next(error);
        } else {
          return res.json({
            status: "success",
            message: "Check your G-mail acoount",
            data: info,
          });
        }
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

  async verifyResponseController(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      if (await this.models.checkCode(req.params.code, req.params.email)) {
        await this.models.Verify(req.params.email);
        return res.json({
          status: "success",
          message: "User account is verified successfully",
        });
      }

      return res.status(401).json({
        status: "failed",
        message: "User link was ended, please request a new link",
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
        message: "User account is verified successfully",
        data: result,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default userController;
