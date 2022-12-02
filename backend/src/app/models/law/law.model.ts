import config from "../../config";
import { query } from "../../database/connect";
import Accepted from "../../types/accepted.type";
import InsertType from "../../types/general.type";
import LawType from "../../types/law.type";
import { Pagination } from "../../types/user.type";

class lawModel {
  async create(data: LawType): Promise<InsertType> {
    try {
      const rows = (await query(
        `INSERT INTO law (law_name, file, content)
             VALUES ('${data.law_name}', '${data.file}', '${data.content}');`
      )) as InsertType;

      return rows;
    } catch (err) {
      throw new Error(`unable to add this item : ${(err as Error).message}`);
    }
  }

  async updateInfo(data: LawType): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  law SET law_name='${data.law_name}', file='${data.file}',
        content='${data.content}',
         updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`
      )) as Accepted;

      return rows;
    } catch (err) {
      throw new Error(
        `unable to change info of this law : ${(err as Error).message}`
      );
    }
  }

  async getAllLaw(page: number): Promise<Pagination> {
    try {
      const rows = (await query(`SELECT count(*) as numRows FROM law`)) as [
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
        `SELECT id, law_name, file FROM law ORDER BY law_name ASC LIMIT ${skip}, ${config.perPage}`
      )) as [LawType];

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
      throw new Error(`unable to get Law items : ${(err as Error).message}`);
    }
  }

  async getLawItem(id: number): Promise<LawType> {
    try {
      const law = (await query(
        `SELECT * FROM law WHERE id='${id}'`
      )) as LawType[];

      return law[0];
    } catch (err) {
      throw new Error(`unable to get law item : ${(err as Error).message}`);
    }
  }
}

export default lawModel;
