import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import ARequest from "../interface/Request.interface";
import adminModel from "../models/user/admin.model";
import employeeModel from "../models/user/employee.model";
import userModel from "../models/user/user.model";
import HandleUnauthError from "./unauth.error";

const user = new userModel();
const admin = new adminModel();
const employee = new employeeModel();

const ValidToken = (req: ARequest, _res: Response, next: NextFunction) => {
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
    return HandleUnauthError(next);
  } catch (err) {
    HandleUnauthError(next);
  }
};

export const isValied = (type: string) => {
  return async (req: ARequest, res: Response, next: NextFunction) => {
    try {
      const userInfo = req.user;
      let data;
      if (type === "user") {
        data = await user.getUser(Number(userInfo?.id));
      } else if (type === "admin") {
        data = await admin.getAdmin(Number(userInfo?.id));
      } else if (type === "employee") {
        data = await employee.getEmployee(Number(userInfo?.id));
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
};

export default ValidToken;
