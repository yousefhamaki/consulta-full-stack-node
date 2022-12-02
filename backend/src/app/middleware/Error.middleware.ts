import { NextFunction, Request, Response } from "express";
import { query } from "../database/connect";
import Error from "../interface/Error.interface";
import InsertType from "../types/general.type";

const errorMiddleware = async (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  const rows = (await query(
    `INSERT INTO failed_jobs (connection, Queue, payload, exception)
         VALUES ('${err.name}', '${_req.baseUrl + " + " + err.stack}', '${
      err.message
    }', '${err.status}');`
  )) as InsertType;

  const status = err.status || 500;
  const message = err.message || "oops! some thing went wrong";

  res.status(status).json({ status, message, data: rows });
};

export default errorMiddleware;
