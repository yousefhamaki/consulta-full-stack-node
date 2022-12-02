import { query } from "../../database/connect";
// import util from "util";
import { Menufork } from "../../types/menu.type";
import InsertType from "../../types/general.type";
import Accepted from "../../types/accepted.type";

class menuForksModel {
  async create(data: Menufork): Promise<InsertType> {
    try {
      const rows = (await query(
        `INSERT INTO menu_forks (menu_id, name, content, logo, status)
                VALUES ('${data.menu_id}', '${data.name}', 
                '${data.content}', '${data.logo}', ${data.status});`
      )) as InsertType;
      return rows;
    } catch (err) {
      throw new Error(`unable to add this fork : ${(err as Error).message}`);
    }
  }

  async getMenuItems(): Promise<Menufork[]> {
    try {
      const menu = (await query(
        `SELECT id, name FROM menu_forks`
      )) as Menufork[];

      return menu;
    } catch (err) {
      throw new Error(`unable to get menu items : ${(err as Error).message}`);
    }
  }

  async getMenuItem(id: number): Promise<Menufork> {
    try {
      const rows = (await query(
        `SELECT * FROM menu_forks WHERE id='${id}'`
      )) as Menufork[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this item : ${(err as Error).message}`);
    }
  }

  async updateInfo(data: Menufork): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  menu_forks SET menu_id='${data.menu_id}', name='${data.name}', status='${data.status}',
        updated_at=CURRENT_TIMESTAMP
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

export default menuForksModel;
