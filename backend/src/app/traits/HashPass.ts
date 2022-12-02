import config from "../config";
import bcrypt from "bcrypt";

exports.MakeHash = (pass: string): string => {
  const rounds = parseInt(config.pacryptRounds as string, 10);
  return bcrypt.hashSync(`${config.pcryptPass}${pass}`, rounds);
};

exports.check = (pass: string, hash: string): boolean => {
  return bcrypt.compareSync(`${config.pcryptPass}${pass}`, hash);
};

exports.verifyIsExpired = function isTokenExpired(token: string) {
  const expiry = JSON.parse(atob(token.split(".")[1])).exp;
  return Math.floor(new Date().getTime() / 1000) >= expiry;
};
export default exports;
