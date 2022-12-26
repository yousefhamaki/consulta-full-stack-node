import { Request, Response, NextFunction } from "express";
import validReturn from "../requests/reutrnRequest";
import QueryCheck from "../traits/CheckQuery";
import Validator, { ErrorMessages } from "validatorjs";

class QueryMiddleware {
  private readonly checkQuery = new QueryCheck();
  /**
   * @author y.hamaki
   * @type middleware
   * @param required @type {{ [key: string]: string }} the needs params and rules to pass this functions
   * @returns Response<JsonReturn> | void
   */
  Query(required: { [key: string]: string }) {
    return (req: Request, res: Response, next: NextFunction) => {
      /* request query handler */
      let data = req.method === "GET" ? req.params : req.body;

      if (req.method === "DELETE") {
        data = req.params;
      }
      const requestInfo: string[] = this.checkQuery.check(data, required);
      if (requestInfo.length > 0) {
        return res.status(412).json(validReturn(requestInfo));
      } else {
        return next();
      }
    };
  }

  async validation(
    body: {
      [key: string]: string | qs.ParsedQs | string[] | qs.ParsedQs[];
    },
    rules: { [key: string]: string },
    customMessages: ErrorMessages,
    next: NextFunction
  ) {
    const validation = new Validator(body, rules, customMessages);
    if (validation.passes()) {
      return next();
    } else {
      return validation.errors;
    }
  }
}

export default QueryMiddleware;
