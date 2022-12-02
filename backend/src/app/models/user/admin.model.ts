import { query } from "../../database/connect";
import HashPass from "../../traits/HashPass";
import Admin from "../../types/admin.type";
import { Pagination } from "../../types/user.type";
import config from "../../config";
import Accepted from "../../types/accepted.type";

class adminModel {
  async create(data: Admin): Promise<Admin> {
    try {
      const rows = (await query(
        `INSERT INTO admins (name, email, password, created_at, updated_at)
            VALUES ('${data.name}', '${data.email}', '${HashPass.MakeHash(
          data.password
        )}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
      )) as { insertId: number };

      const user = (await this.getAdmin(rows.insertId as number)) as Admin;
      return user;
    } catch (err) {
      throw new Error(`unable to add this admin : ${(err as Error).message}`);
    }
  }

  async makeAuth(email: string, pass: string): Promise<Admin | null> {
    try {
      const rows = (await query(
        `SELECT id, password FROM admins WHERE email='${email}';`
      )) as Admin[];

      if (rows.length > 0) {
        const { password: hash } = rows[0];

        if (HashPass.check(pass, hash)) {
          const user = (await this.getAdmin(rows[0].id as number)) as Admin;
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`unable to login ${email} : ${(err as Error).message}`);
    }
  }

  async getAdmin(id: number): Promise<Admin> {
    try {
      const rows = (await query(
        `SELECT id, name, email, img FROM admins WHERE id='${id}'`
      )) as Admin[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this admin : ${(err as Error).message}`);
    }
  }

  async getAllAdmins(page: number): Promise<Pagination> {
    try {
      const rows = (await query(`SELECT count(*) as numRows FROM admins`)) as [
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
        `SELECT * FROM admins ORDER BY ID DESC LIMIT ${skip}, ${config.perPage}`
      )) as [Admin];

      return {
        pagination: {
          current: page,
          perPage: config.perPage,
          totalPages: pages,
          previous: page > 0 ? page - 1 : undefined,
          next: page < pages - 1 ? page + 1 : undefined,
        },
        data: users,
        type: "success",
      } as Pagination;
    } catch (err) {
      throw new Error(`unable to get users : ${(err as Error).message}`);
    }
  }

  async changePass(
    oldpassword: string,
    newpassword: string,
    id: number
  ): Promise<Accepted | null> {
    try {
      const password = (await query(
        `SELECT password FROM admins WHERE id='${id}';`
      )) as Admin[];

      if (password.length > 0) {
        const { password: hash } = password[0];

        if (HashPass.check(oldpassword, hash)) {
          const rows = (await query(
            `UPDATE  admins SET password='${HashPass.MakeHash(
              newpassword
            )}', updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`
          )) as Accepted;

          return rows;
        }
      }

      return null;
    } catch (err) {
      throw new Error(
        `unable to change password of this admin : ${(err as Error).message}`
      );
    }
  }
}

export default adminModel;
