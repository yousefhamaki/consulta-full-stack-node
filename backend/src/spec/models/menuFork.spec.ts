import MainModel from "../../app/models/main.models";
import menuModel from "../../app/models/menu/menu.model";
import menuForksModel from "../../app/models/menu/menuForks.model";
import Accepted from "../../app/types/accepted.type";
import MenuEl, { Menufork } from "../../app/types/menu.type";

const menu = new menuForksModel();
const main = new menuModel();
const mainAction = new MainModel();

const menuData = {
  name: "test item",
  content: "",
  logo: null,
  status: 1,
} as Menufork;

const menuMainData = {
  name: "test item",
  status: 1,
} as MenuEl;

const update_info = {
  name: "test update",
  status: 0,
} as Menufork;

describe("Menu forks Model", () => {
  beforeAll(async () => {
    const res = await main.create(menuMainData);
    menuData.menu_id = res?.insertId;
    update_info.menu_id = res?.insertId;
  });

  afterAll(async () => {
    await mainAction.delete(menuData.menu_id, "menu");
  });
  it("created new item in menu forks", async () => {
    const res = await menu.create(menuData);
    menuData.id = res?.insertId;
    update_info.id = res?.insertId;
    expect(res?.insertId as number).toBeDefined;
  });

  it("returns menu fork item info", async () => {
    const res = (await menu.getMenuItem(menuData.id as number)) as MenuEl;
    expect(Number(res.id)).toEqual(menuData.id as number);
  });

  it("returns menu fork item info", async () => {
    const res = (await menu.getMenuItems()) as MenuEl[];

    expect(Number(res.length)).toBeGreaterThan(0);
  });

  it("update menu fork item info", async () => {
    const res = (await menu.updateInfo(update_info)) as Accepted;

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("update menu fork item status", async () => {
    const res = (await mainAction.updateStatus(
      0,
      menuData.id as number,
      "menu_forks"
    )) as Accepted;

    expect(res.changedRows).toEqual(0);
    expect(res.affectedRows).toEqual(1);
  });

  it("Delete menu fork item from DB", async () => {
    const res = await mainAction.delete(menuData.id as number, "menu_forks");
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Delete menu fork item from DB", async () => {
    const res = await mainAction.delete(9999, "menu_forks");
    expect(res.affectedRows).toEqual(0);
  });
});
