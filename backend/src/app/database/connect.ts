import mysql from "mysql";
import config from "../config";
import util from "util";

const DB_info: mysql.ConnectionConfig = {
  //   connectionLimit: 10,
  host: config.DB_HOST,
  port: Number(config.DB_PORT),
  user: config.DB_USERNAME as string,
  password: config.DB_PASSWORD as string,
  database: config.DB_DATABASE as string,
};

const db = mysql.createConnection(DB_info);

export const query = util.promisify(db.query).bind(db);

export default db;
