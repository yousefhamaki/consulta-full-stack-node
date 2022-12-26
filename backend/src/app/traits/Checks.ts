import JsonReurn from "../interface/JsonReturn";
import userModel from "../models/user/user.model";
import QueryCheck from "./CheckQuery";

/**
 * @author y.hamaki
 * @since 12/22
 */

class Check {
  private readonly models = new userModel();
  private readonly standard = {
    string: "ABCDEFGHIKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    hash: "!@#$%^&*()_+={}?><':;\"|/-",
  };
  public Query = new QueryCheck();

  /**
   * @author y.hamaki
   * @type Function
   * @param email @type {string}
   * * @param table @type {string}
   * @returns Promise<JsonReurn | false>
   */

  async Email(email: string, table: string): Promise<JsonReurn | false> {
    if (await this.models.checkEmail(email, table)) {
      return {
        status: "failed",
        message: "validation error",
        data: {
          type: "email",
          info: "your E-mail is not available",
        },
      };
    }
    return false;
  }

  /**
   * @author y.hamaki
   * @type Function
   * @param password @type {string}
   * @returns Promise<JsonReurn | false>
   */

  async Password(password: string): Promise<JsonReurn | false> {
    const validpass = await this.checkPass(password);
    if (validpass.length < 3) {
      return {
        status: "failed",
        message: "validation error",
        data: {
          type: "password",
          info: validpass,
        },
      };
    }
    return false;
  }

  /**
   * @author y.hamaki
   * @type Function
   * @param pass @type {string}
   * @returns Promise<string[]>
   */

  private async checkPass(pass: string): Promise<string[]> {
    const string = await this.loop(this.standard.string, pass, "string");
    const number = await this.loop(this.standard.number, pass, "number");
    const hash = await this.loop(this.standard.hash, pass, "hash");

    const check = [string, number, hash];
    for (let index = 0; index < check.length; index++) {
      if (check[index] === "") {
        check.splice(index, 1);
      }
    }
    return check;
  }

  /**
   * @author y.hamaki
   * @type Function
   * @param el @type {string}
   * @param pass @type {string}
   * @param type @type {string}
   * @returns string
   */

  private loop(el: string, pass: string, type: string): string {
    const check = el.split("");
    for (let i = 0; i < check.length; i++) {
      const element = el[i];
      if (pass.split("").indexOf(element) > -1) {
        return type;
      }
    }
    return "";
  }
}

export default Check;
