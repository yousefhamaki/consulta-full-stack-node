"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../config"));
const util_1 = __importDefault(require("util"));
const DB_info = {
    host: config_1.default.DB_HOST,
    port: Number(config_1.default.DB_PORT),
    user: config_1.default.DB_USERNAME,
    password: config_1.default.DB_PASSWORD,
    database: config_1.default.DB_DATABASE,
};
const db = mysql_1.default.createConnection(DB_info);
exports.query = util_1.default.promisify(db.query).bind(db);
exports.default = db;
