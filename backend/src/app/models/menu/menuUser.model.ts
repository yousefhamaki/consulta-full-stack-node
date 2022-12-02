import { query } from "../../database/connect";
import {
  MenuDataResult,
  MenuResult,
  MenuUserType,
} from "../../types/menu.type";

class menuUserModel {
  async getMenu(): Promise<MenuResult[]> {
    try {
      const menu = (await query(
        `SELECT menu_forks.id, menu_forks.name, menu_forks.logo as logo, menu.name as menu_name, menu.id as menu_id
        FROM menu_forks
        INNER JOIN menu ON menu.status=1 AND menu.id=menu_forks.menu_id
        WHERE 
        menu_forks.status=1;`
      )) as MenuUserType[];

      return this.designingMenu(menu);
    } catch (err) {
      throw new Error(`unable to get this items : ${(err as Error).message}`);
    }
  }

  private designingMenu(menu: MenuUserType[]): MenuResult[] {
    const unique = [...new Set(menu.map((item) => item.menu_id))];
    const result = [];

    for (let index = 0; index < unique.length; index++) {
      const x = menu.filter((item) => {
        return item.menu_id === unique[index];
      });
      result.push({
        id: unique[index],
        name: x[0].menu_name,
        data: this.removeMain(x),
      });
    }

    return result;
  }

  private removeMain(menu: MenuUserType[]): MenuDataResult[] {
    const result = [];
    for (let index = 0; index < menu.length; index++) {
      result.push({
        id: menu[index].id,
        name: menu[index].name,
        logo: menu[index].logo,
      });
    }
    return result;
  }
}

export default menuUserModel;
