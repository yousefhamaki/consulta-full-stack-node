"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("../database/connect");
const errorMiddleware = (err, _req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = (yield (0, connect_1.query)(`INSERT INTO failed_jobs (connection, Queue, payload, exception)
         VALUES ('${err.name}', '${_req.baseUrl + " + " + err.stack}', '${err.message}', '${err.status}');`));
    const status = err.status || 500;
    const message = err.message || "oops! some thing went wrong";
    res.status(status).json({ status, message, data: rows });
});
exports.default = errorMiddleware;
