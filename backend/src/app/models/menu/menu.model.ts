import { query } from "../../database/connect";
// import util from "util";
import MenuEl from "../../types/menu.type";
import InsertType from "../../types/general.type";
import Accepted from "../../types/accepted.type";

class menuModel {
  async create(data: MenuEl): Promise<InsertType> {
    try {
      const rows = (await query(
        `INSERT INTO menu (name, status)
                VALUES ('${data.name}', ${data.status});`
      )) as InsertType;
      return rows;
    } catch (err) {
      throw new Error(`unable to add this item : ${(err as Error).message}`);
    }
  }

  async getMenuItems(): Promise<MenuEl[]> {
    try {
      const menu = (await query(
        `SELECT id, name, status FROM menu`
      )) as MenuEl[];

      return menu;
    } catch (err) {
      throw new Error(`unable to get menu items : ${(err as Error).message}`);
    }
  }

  async getMenuItem(id: number): Promise<MenuEl> {
    try {
      const rows = (await query(
        `SELECT * FROM menu WHERE id='${id}'`
      )) as MenuEl[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this item : ${(err as Error).message}`);
    }
  }

  async updateInfo(data: MenuEl): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  menu SET name='${data.name}', status='${data.status}',
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

export default menuModel;
