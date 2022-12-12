import { query } from "../../database/connect";
import HashPass from "../../traits/HashPass";
import { Pagination } from "../../types/user.type";
import config from "../../config";
import Accepted from "../../types/accepted.type";
import Employee from "../../types/employee.type";

class employeeModel {
  async create(data: Employee): Promise<Employee> {
    try {
      const rows = (await query(
        `INSERT INTO employees (admin_id, name, email, options, password,
             salary, job_title, status, created_at, updated_at)
                VALUES ('${data.admin_id}', '${data.name}', '${data.email}', '${
          data.options
        }', '${HashPass.MakeHash(data.password)}', '${data.salary}', '${
          data.job_title
        }', '${data.status}', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
      )) as { insertId: number };

      const user = (await this.getEmployee(
        rows.insertId as number
      )) as Employee;
      return user;
    } catch (err) {
      throw new Error(
        `unable to add this employees : ${(err as Error).message}`
      );
    }
  }

  async makeAuth(email: string, pass: string): Promise<Employee | null> {
    try {
      const rows = (await query(
        `SELECT password FROM employees WHERE email='${email}';`
      )) as Employee[];

      if (rows.length > 0) {
        const { password: hash } = rows[0];

        if (HashPass.check(pass, hash)) {
          const q = `SELECT id, name, email FROM employees WHERE email='${email}';`;
          const result = (await query(q)) as Employee[];

          return result[0];
        }
      }
      return null;
    } catch (err) {
      throw new Error(`unable to login ${email} : ${(err as Error).message}`);
    }
  }

  async getEmployee(id: number): Promise<Employee> {
    try {
      const rows = (await query(
        `SELECT id, name, email, img FROM employees WHERE id='${id}'`
      )) as Employee[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this admin : ${(err as Error).message}`);
    }
  }

  async getEmployees(page: number): Promise<Pagination> {
    try {
      const rows = (await query(
        `SELECT count(*) as numRows FROM employees`
      )) as [
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
        `SELECT * FROM employees ORDER BY ID DESC LIMIT ${skip}, ${config.perPage}`
      )) as [Employee];

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
      throw new Error(`unable to get employees : ${(err as Error).message}`);
    }
  }

  async changePass(
    oldpassword: string,
    newpassword: string,
    id: number
  ): Promise<Accepted | null> {
    try {
      const password = (await query(
        `SELECT password FROM employees WHERE id='${id}';`
      )) as Employee[];

      if (password.length > 0) {
        const { password: hash } = password[0];

        if (HashPass.check(oldpassword, hash)) {
          const rows = (await query(
            `UPDATE  employees SET password='${HashPass.MakeHash(
              newpassword
            )}', updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`
          )) as Accepted;

          return rows;
        }
      }

      return null;
    } catch (err) {
      throw new Error(
        `unable to change password of this employees : ${
          (err as Error).message
        }`
      );
    }
  }
}

export default employeeModel;
