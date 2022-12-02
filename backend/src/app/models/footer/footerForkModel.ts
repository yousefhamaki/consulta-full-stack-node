import { query } from "../../database/connect";
import Accepted from "../../types/accepted.type";
import { FooterForkType } from "../../types/footer.type";
import InsertType from "../../types/general.type";

class FooterForkModel {
  async create(data: FooterForkType): Promise<InsertType> {
    try {
      const rows = (await query(
        `INSERT INTO footer_fork (name, footer_id, content, status)
         VALUES ('${data.name}', '${data.footer_id}', '${data.content}', ${data.status});`
      )) as InsertType;

      return rows;
    } catch (err) {
      throw new Error(`unable to add this item : ${(err as Error).message}`);
    }
  }

  async getForkItems(): Promise<FooterForkType[]> {
    try {
      const menu = (await query(
        `SELECT id, name, status FROM footer_fork`
      )) as FooterForkType[];

      return menu;
    } catch (err) {
      throw new Error(`unable to get footer items : ${(err as Error).message}`);
    }
  }

  async getForkItem(id: number): Promise<FooterForkType> {
    try {
      const rows = (await query(
        `SELECT * FROM footer_fork WHERE id='${id}'`
      )) as FooterForkType[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this item : ${(err as Error).message}`);
    }
  }

  async updateInfo(data: FooterForkType): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  footer_fork SET name='${data.name}', footer_id='${data.footer_id}',
            content='${data.content}', status='${data.status}',
           updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`
      )) as Accepted;

      return rows;
    } catch (err) {
      throw new Error(
        `unable to change info of this item : ${(err as Error).message}`
      );
    }
  }
}

export default FooterForkModel;
