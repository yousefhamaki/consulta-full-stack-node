import { query } from "../database/connect";
import Accepted from "../types/accepted.type";

class MainModel {
  async delete(id: number, tableName: string): Promise<Accepted> {
    try {
      const rows = (await query(
        `DELETE FROM ${tableName} WHERE id='${id}';`
      )) as Accepted;
      return rows;
    } catch (err) {
      throw new Error(`unable to delete this id : ${(err as Error).message}`);
    }
  }

  async updateStatus(
    status: number,
    id: number,
    tableName: string
  ): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  ${tableName} SET status='${status}',
             updated_at=CURRENT_TIMESTAMP WHERE id='${id}'`
      )) as Accepted;

      return rows;
    } catch (err) {
      throw new Error(
        `unable to change status of this item : ${(err as Error).message}`
      );
    }
  }
}

export default MainModel;
