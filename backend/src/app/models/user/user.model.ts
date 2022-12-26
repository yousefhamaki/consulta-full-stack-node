import { query } from "../../database/connect";
import User, { Pagination } from "../../types/user.type";
import config from "../../config";
import Accepted from "../../types/accepted.type";
import Tokens from "../../traits/Tokens";

/**
 * @author y.hamaki
 * @since 12/22
 */

class userModel {
  private readonly tokens = new Tokens();

  /**
   * @type Function
   * @param email @type {string}
   * @param pass @type {string}
   * @returns Promise<<User | null>
   */

  async makeAuth(email: string, pass: string): Promise<User | null> {
    try {
      const rows = (await query(
        `SELECT id, password FROM users WHERE email='${email}';`
      )) as User[];

      if (rows.length > 0) {
        const { password: hash } = rows[0];

        if (this.tokens.check(pass, hash)) {
          const user = (await this.getUser(rows[0].id as number)) as User;

          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`unable to login ${email} : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param data @type {User}
   * @returns Promise<User>
   */

  async create(data: User): Promise<User> {
    try {
      const rows = (await query(
        `INSERT INTO users (ip, name, email, password, age, created_at, updated_at)
        VALUES ('${data.ip}', '${data.name}', '${
          data.email
        }', '${this.tokens.MakeHash(data.password)}', '${
          data.age
        }', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
      )) as { insertId: number };

      const user = (await this.getUser(rows.insertId as number)) as User;
      return user;
    } catch (err) {
      throw new Error(`unable to add this user : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param email @type {string}
   * @param table @type {string}
   * @returns Promise<<User | null>
   */

  async checkEmail(email: string, table: string): Promise<boolean> {
    try {
      const rows = (await query(
        `SELECT email FROM ${table} WHERE email='${email}'`
      )) as User[];

      if (rows.length > 0) {
        return true;
      }
      return false;
    } catch (err) {
      throw new Error(`unable to get this user : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param id @type {number}
   * @returns Promise<User>
   */

  async getUser(id: number): Promise<User> {
    try {
      const rows = (await query(
        `SELECT id, name, email, email_verified_at, profile_photo_path, age FROM users WHERE id='${id}'`
      )) as User[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this user : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param code @type {string}
   * @param email @type {string}
   * @returns Promise<<Accepted>
   */

  async saveCode(code: string, email: string): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE users SET code='${code}', updated_at=CURRENT_TIMESTAMP WHERE email='${email}';`
      )) as Accepted;
      return rows;
    } catch (err) {
      throw new Error(`unable to save this code : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param usercode @type {string}
   * @param email @type {string}
   * @returns Promise<<boolean>
   */

  async checkCode(usercode: string, email: string): Promise<boolean> {
    try {
      const rows = (await query(
        `SELECT code FROM users WHERE email='${email}';`
      )) as { code: string }[];

      if (rows.length > 0) {
        if (rows[0].code === usercode) {
          return true;
        }
      }
      return false;
    } catch (err) {
      throw new Error(`your code isnot vailed : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param email @type {string}
   * @returns Promise<<Accepted>
   */

  async Verify(email: string): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE users SET email_verified_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE email='${email}';`
      )) as Accepted;
      return rows;
    } catch (err) {
      throw new Error(`unable to save this code : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param oldpassword @type {string}
   * @param newpassword @type {string}
   * @param id @type {number}
   * @returns Promise<<Accepted | null>
   */

  async changePass(
    oldpassword: string,
    newpassword: string,
    id: number
  ): Promise<Accepted | null> {
    try {
      const password = (await query(
        `SELECT password FROM users WHERE id='${id}';`
      )) as User[];

      if (password.length > 0) {
        const { password: hash } = password[0];

        if (this.tokens.check(oldpassword, hash)) {
          const rows = (await query(
            `UPDATE  users SET password='${this.tokens.MakeHash(
              newpassword
            )}', updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`
          )) as Accepted;

          return rows;
        }
      }

      return null;
    } catch (err) {
      throw new Error(
        `unable to change password of this user : ${(err as Error).message}`
      );
    }
  }

  /**
   * @type Function
   * @param page @type {number}
   * @returns Promise<<Pagination>
   */

  async getAllUsers(page: number): Promise<Pagination> {
    try {
      const rows = (await query(`SELECT count(*) as numRows FROM users`)) as [
        {
          numRows: number;
        }
      ];

      const skip = page * config.perPage;
      const pages = Math.ceil(rows[0].numRows / config.perPage);

      if (page > pages) {
        return {
          pagination: {
            current: page,
            perPage: config.perPage,
            totalPages: pages,
            previous: page > 0 ? page - 1 : undefined,
            next: page < pages - 1 ? page + 1 : undefined,
          },
          data: [null],
          type: "error",
        } as Pagination;
      }

      const users = (await query(
        `SELECT * FROM users ORDER BY ID ASC LIMIT ${skip}, ${config.perPage}`
      )) as [User];

      return {
        pagination: {
          current: page,
          perPage: config.perPage,
          totalPages: pages,
          previous: page > 1 ? page - 1 : undefined,
          next: page < pages - 1 ? page + 1 : undefined,
        },
        data: users,
        type: "success",
      } as Pagination;
    } catch (err) {
      throw new Error(`unable to get users : ${(err as Error).message}`);
    }
  }

  /**
   * @type Function
   * @param id @type {number}
   * @returns Promise<<Accepted>
   */

  async delete(id: number): Promise<Accepted> {
    try {
      const rows = (await query(
        `DELETE FROM users WHERE id='${id}';`
      )) as Accepted;
      return rows;
    } catch (err) {
      throw new Error(`unable to delete this user : ${(err as Error).message}`);
    }
  }
}

export default userModel;
