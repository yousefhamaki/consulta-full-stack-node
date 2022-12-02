import { query } from "../../database/connect";
import Accepted from "../../types/accepted.type";
import FooterType, {
  FooterFork,
  FooterUser,
  FooterUserType,
} from "../../types/footer.type";
import InsertType from "../../types/general.type";

class FooterModel {
  async create(data: FooterType): Promise<InsertType> {
    try {
      const rows = (await query(
        `INSERT INTO footer (name, status)
                    VALUES ('${data.name}', ${data.status});`
      )) as InsertType;
      return rows;
    } catch (err) {
      throw new Error(`unable to add this item : ${(err as Error).message}`);
    }
  }

  async getFooterItems(): Promise<FooterType[]> {
    try {
      const menu = (await query(
        `SELECT id, name, status FROM footer`
      )) as FooterType[];

      return menu;
    } catch (err) {
      throw new Error(`unable to get footer items : ${(err as Error).message}`);
    }
  }

  async getFooterItem(id: number): Promise<FooterType> {
    try {
      const rows = (await query(
        `SELECT * FROM footer WHERE id='${id}'`
      )) as FooterType[];

      return rows[0];
    } catch (err) {
      throw new Error(`unable to get this item : ${(err as Error).message}`);
    }
  }

  async updateInfo(data: FooterType): Promise<Accepted> {
    try {
      const rows = (await query(
        `UPDATE  footer SET name='${data.name}', status='${data.status}',
         updated_at=CURRENT_TIMESTAMP WHERE id='${data.id}'`
      )) as Accepted;

      return rows;
    } catch (err) {
      throw new Error(
        `unable to change info of this item : ${(err as Error).message}`
      );
    }
  }

  async getFooterUser(): Promise<FooterUser[]> {
    try {
      const rows = (await query(
        `SELECT footer_fork.id, footer_fork.name, footer.name as footer_name,
         footer_fork.footer_id as footer_id
            FROM footer_fork
            INNER JOIN footer ON footer.status=1 AND footer.id=footer_fork.footer_id
            WHERE 
            footer_fork.status=1;`
      )) as FooterUserType[];

      return this.designinFooter(rows);
    } catch (err) {
      throw new Error(`unable to get Footer items : ${(err as Error).message}`);
    }
  }

  private designinFooter(footer: FooterUserType[]): FooterUser[] {
    const unique = [...new Set(footer.map((item) => item.footer_id))];
    const result = [];

    for (let index = 0; index < unique.length; index++) {
      const x = footer.filter((item) => {
        return item.footer_id === unique[index];
      });
      result.push({
        id: unique[index],
        name: x[0].footer_name,
        data: this.removeMain(x),
      });
    }

    return result;
  }

  private removeMain(menu: FooterUserType[]): FooterFork[] {
    const result = [];
    for (let index = 0; index < menu.length; index++) {
      result.push({
        id: menu[index].id,
        name: menu[index].name,
      });
    }
    return result;
  }
}

export default FooterModel;
