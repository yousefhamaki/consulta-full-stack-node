import { Response, NextFunction } from "express";
import ARequest from "../interface/Request.interface";
import adminModel from "../models/user/admin.model";
import employeeModel from "../models/user/employee.model";
import Admin from "../types/admin.type";
import Employee from "../types/employee.type";

const model = new adminModel();
const employee = new employeeModel();

export const isAdmin = async (
  req: ARequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await model.getAdmin(Number(req.body.id));
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
};

export const isEmployee = async (
  req: ARequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const admin = await employee.getEmployee(Number(req.body.id));
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
};

export const selfData = async (
  req: ARequest,
  res: Response,
  next: NextFunction
) => {
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
};
