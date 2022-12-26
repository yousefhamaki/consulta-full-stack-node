import { NextFunction, Request, Response } from "express";
import { query } from "../database/connect";
import Error, { ErrorReturn } from "../interface/Error.interface";
import InsertType from "../types/general.type";

class ErrorMiddleWare {
  /**
   * @author y.hamaki
   * @type middleware
   * @param err @type {import Error from "../interface/Error.interface";}
   * @param req @type {import { Request } from "express";}
   * @param res @type {import { Response } from "express";}
   * @returns Promise<Response<ErrorReturn>>
   */

  async HandleErrors(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
  ): Promise<Response<ErrorReturn>> {
    const rows = await this.saveError(err, req.baseUrl);

    return res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || "oops! some thing went wrong",
      data: rows,
    });
  }

  /**
   * @author y.hamaki
   * @type middleware
   * @param info @type {import Error from "../interface/Error.interface";}
   * @param baseUrl @type string
   * @returns Promise<InsertType>
   */

  private async saveError(info: Error, baseUrl: string): Promise<InsertType> {
    const rows = (await query(
      `INSERT INTO failed_jobs (connection, Queue, payload, exception)
           VALUES ('${info.name}', '${baseUrl + " + " + info.stack}', '${
        info.message
      }', '${info.status}');`
    )) as InsertType;

    return rows;
  }
}

export default ErrorMiddleWare;
