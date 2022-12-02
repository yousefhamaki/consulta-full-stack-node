import MainModel from "../../app/models/main.models";
import menuModel from "../../app/models/menu/menu.model";
import Accepted from "../../app/types/accepted.type";
import MenuEl from "../../app/types/menu.type";

const menu = new menuModel();
const mainAction = new MainModel();

const menuData = {
  name: "test item",
  status: 1,
} as MenuEl;

const update_info = {
  name: "test update",
  status: 0,
} as MenuEl;

describe("Menu Model", () => {
  it("created new item in menu", async () => {
    const res = await menu.create(menuData);
    menuData.id = res?.insertId;
    update_info.id = res?.insertId;
    expect(res?.insertId as number).toBeDefined;
  });

  it("returns menu item info", async () => {
    const res = (await menu.getMenuItem(menuData.id as number)) as MenuEl;
    expect(Number(res.id)).toEqual(menuData.id as number);
  });

  it("returns menu item info", async () => {
    const res = (await menu.getMenuItems()) as MenuEl[];

    expect(Number(res.length)).toBeGreaterThan(0);
  });

  it("update menu item info", async () => {
    const res = (await menu.updateInfo(update_info)) as Accepted;

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("update menu item status", async () => {
    const res = (await mainAction.updateStatus(
      0,
      menuData.id as number,
      "menu"
    )) as Accepted;

    expect(res.changedRows).toEqual(0);
    expect(res.affectedRows).toEqual(1);
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(menuData.id as number, "menu");
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Delete user from DB", async () => {
    const res = await mainAction.delete(9999, "menu");
    expect(res.affectedRows).toEqual(0);
  });
});
