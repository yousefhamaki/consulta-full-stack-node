import MainModel from "../../app/models/main.models";
import menuModel from "../../app/models/menu/menu.model";
import MenuForkOptionModel from "../../app/models/menu/menuForkForks.model";
import menuForksModel from "../../app/models/menu/menuForks.model";
import Accepted from "../../app/types/accepted.type";
// import Accepted from "../../app/types/accepted.type";
import MenuEl, { Menufork, MenuforkOption } from "../../app/types/menu.type";
import { Pagination } from "../../app/types/user.type";

const menu = new menuForksModel();
const main = new menuModel();
const option = new MenuForkOptionModel();
const mainAction = new MainModel();

const optionData = {
  name: "option",
  status: 1,
  content: "asfcsad",
  file: "vdsvsd",
  order: 0,
} as MenuforkOption;
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
  content: "fdfqw",
  file: "afadfd",
  order: 1,
  status: 0,
} as MenuforkOption;

describe("Menu fork options Model", () => {
  beforeAll(async () => {
    const res = await main.create(menuMainData);
    menuData.menu_id = res?.insertId;

    const res2 = await menu.create(menuData);
    menuData.id = res2?.insertId;
    update_info.fork_id = res2?.insertId;
    optionData.fork_id = res2?.insertId;
  });

  afterAll(async () => {
    await mainAction.delete(menuData.id as number, "menu_forks");
    await mainAction.delete(menuData.menu_id, "menu");
  });

  it("created new item in menu forks", async () => {
    const res = await option.create(optionData);
    optionData.id = res?.insertId;
    update_info.id = res?.insertId;
    expect(res?.insertId as number).toBeDefined;
  });

  it("returns menu fork options item info", async () => {
    const res = (await option.getMenuItem(
      optionData.id as number
    )) as MenuforkOption;
    expect(Number(res.id)).toEqual(optionData.id as number);
  });

  it("returns menu fork options items info", async () => {
    const res = (await option.getMenuItems()) as MenuforkOption[];

    expect(Number(res.length)).toBeGreaterThan(0);
  });

  it("returns valied menu fork options items info", async () => {
    const res = (await option.getValiedMenuItems(1)) as Pagination;

    expect(Number(res.pagination.current)).toEqual(1);
    expect(Number(res.data.length)).toBeLessThan(16);
  });

  it("update menu fork options item info", async () => {
    const res = (await option.updateInfo(update_info)) as Accepted;

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("update menu fork options item status", async () => {
    const res = (await mainAction.updateStatus(
      0,
      optionData.id as number,
      "menu_fork_options"
    )) as Accepted;

    expect(res.changedRows).toEqual(0);
    expect(res.affectedRows).toEqual(1);
  });

  it("Delete menu fork options item from DB", async () => {
    const res = await mainAction.delete(
      optionData.id as number,
      "menu_fork_options"
    );
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Error Delete menu fork options item from DB", async () => {
    const res = await mainAction.delete(9999, "menu_fork_options");
    expect(res.affectedRows).toEqual(0);
  });
});
