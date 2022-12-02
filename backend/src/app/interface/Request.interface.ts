import User from "../types/user.type";
import { Request } from "express";
import Admin from "../types/admin.type";
import Employee from "../types/employee.type";

interface ARequest extends Request {
  user?: User | Admin | Employee;
}

export default ARequest;
