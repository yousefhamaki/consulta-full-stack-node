import config from "../config";
import bcrypt from "bcrypt";

class Tokens {
  /**
   * @author y.hamaki
   * @type Function
   * @param pass @type {string}
   * @returns string
   */
  MakeHash(pass: string): string {
    const rounds = parseInt(config.pacryptRounds as string, 10);
    return bcrypt.hashSync(`${config.pcryptPass}${pass}`, rounds);
  }

  /**
   * @author y.hamaki
   * @type Function
   * @param pass @type {string}
   * * @param hash @type {string}
   * @returns boolean
   */

  check(pass: string, hash: string): boolean {
    return bcrypt.compareSync(`${config.pcryptPass}${pass}`, hash);
  }

  /**
   * @author y.hamaki
   * @type Function
   * @param token @type {string}
   * @returns boolean
   */

  isTokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}

export default Tokens;
