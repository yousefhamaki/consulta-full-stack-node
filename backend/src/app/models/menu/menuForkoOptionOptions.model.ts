import { query } from "../../database/connect";
import InsertType from "../../types/general.type";
// import util from "util";
import { MenuforkOptionOption } from "../../types/menu.type";
import config from "../../config";
import { Pagination } from "../../types/user.type";
import Accepted from "../../types/accepted.type";

class menuForkOptionOptionsModel {
  async create(data: MenuforkOptionOption): Promise<InsertType> {
    try {
      const rows = (await query(
        `INSERT INTO menu_fork_option_options (option_id, name, price, \`order\`, status)
                VALUES (${data.option_id}, '${data.name}', ${data.price},
                 '${data.order}',${data.status});`
      )) as InsertType;
      return rows;
    } catch (err) {
      throw new Error(`unable to add this option : ${(err as Error).message}`);
    }
  }

  async getMenuItems(): Promise<MenuforkOptionOption[]> {
    try {
      const menu = (await query(
        `SELECT id, name FROM menu_fork_option_options`
      )) as MenuforkOptionOption[];

      return menu;
    } catch (err) {
      throw new Error(`unable to get this items : ${(err as Error).message}`);
    }
  }

  async getValiedMenuItems(page: number): Promise<Pagination> {
    try {
      const rows = (await query(
        `SELECT count(*) as numRows FROM menu_fork_option_options WHERE status=1`
      )) as [
        {
          numRows: number;
        }
      ];

      const skip = (page - 1) * config.perPage;
      const pages = Math.ceil(rows[0].numRows / config.perPage);

      if (page - 1 > pages) {
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

      const menu = (await query(
        `SELECT id, name FROM menu_fork_option_options WHERE status=1 ORDER BY name ASC LIMIT ${skip}, ${config.perPage}`
      )) as MenuforkOptionOption[];

      return {
        pagination: {
          current: page,
          perPage: config.perPage,
          totalPages: pages,
          previous: page > 1 ? page - 1 : undefined,
          next: page < pages - 1 ? page + 1 : undefined,
        },
        data: menu,
        type: "success",
      } as Pagination;
    } catch (err) {
      throw new Error(`unable to get this items : ${(err as Error).message}`);
    }
  }

  async getMenuItem(id: number): Promise<MenuforkOptionOption> {
    try {
      const rows = (await query(
        `SELECT * FROM menu_fork_option_options WHERE id='${id}'`
      )) as MenuforkOptionOption[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this item : ${(err as Error).message}`);
    }
  }

  async updateInfo(data: MenuforkOptionOption): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  menu_fork_option_options SET option_id='${data.option_id}', name='${data.name}',
        price='${data.price}', \`order\`=${data.order},
         status='${data.status}', updated_at=CURRENT_TIMESTAMP
         WHERE id='${data.id}'`
      )) as Accepted;

      return rows;
    } catch (err) {
      throw new Error(
        `unable to change info of this item : ${(err as Error).message}`
      );
    }
  }
}

export default menuForkOptionOptionsModel;
