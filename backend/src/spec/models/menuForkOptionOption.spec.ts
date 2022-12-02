import MainModel from "../../app/models/main.models";
import menuModel from "../../app/models/menu/menu.model";
import MenuForkOptionModel from "../../app/models/menu/menuForkForks.model";
import menuForkOptionOptionsModel from "../../app/models/menu/menuForkoOptionOptions.model";
import menuForksModel from "../../app/models/menu/menuForks.model";
import Accepted from "../../app/types/accepted.type";
// import Accepted from "../../app/types/accepted.type";
import MenuEl, {
  Menufork,
  MenuforkOption,
  MenuforkOptionOption,
} from "../../app/types/menu.type";
import { Pagination } from "../../app/types/user.type";

const menu = new menuForksModel();
const main = new menuModel();
const option = new MenuForkOptionModel();
const options = new menuForkOptionOptionsModel();
const mainAction = new MainModel();

const optionO = {
  name: "option option",
  status: 1,
  order: 1,
  price: 150,
} as MenuforkOptionOption;

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
  price: 15,
  order: 1,
  status: 0,
} as MenuforkOptionOption;

describe("Menu fork options Model", () => {
  beforeAll(async () => {
    const res = await main.create(menuMainData);
    menuData.menu_id = res?.insertId;

    const res2 = await menu.create(menuData);
    menuData.id = res2?.insertId;
    optionData.fork_id = res2?.insertId;

    const res3 = await option.create(optionData);
    optionData.id = res3?.insertId;
    optionO.option_id = res3?.insertId;
    update_info.option_id = res3?.insertId;
  });

  afterAll(async () => {
    await mainAction.delete(optionData.id as number, "menu_fork_options");
    await mainAction.delete(menuData.id as number, "menu_forks");
    await mainAction.delete(menuData.menu_id, "menu");
  });

  it("created new item in menu forks", async () => {
    const res = await options.create(optionO);
    optionO.id = res?.insertId;
    update_info.id = res?.insertId;
    expect(res?.insertId as number).toBeDefined;
  });

  it("returns menu fork options item info", async () => {
    const res = (await options.getMenuItem(
      optionO.id as number
    )) as MenuforkOptionOption;
    expect(Number(res.id)).toEqual(optionO.id as number);
  });

  it("returns menu fork options items info", async () => {
    const res = (await options.getMenuItems()) as MenuforkOptionOption[];

    expect(Number(res.length)).toBeGreaterThan(0);
  });

  it("returns valied menu fork options items info", async () => {
    const res = (await option.getValiedMenuItems(1)) as Pagination;

    expect(Number(res.pagination.current)).toEqual(1);
    expect(Number(res.data.length)).toBeLessThan(16);
  });

  it("update menu fork options item info", async () => {
    const res = (await options.updateInfo(update_info)) as Accepted;

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("update menu fork options item status", async () => {
    const res = (await mainAction.updateStatus(
      0,
      optionO.id as number,
      "menu_fork_option_options"
    )) as Accepted;

    expect(res.changedRows).toEqual(0);
    expect(res.affectedRows).toEqual(1);
  });

  it("Delete menu fork options item from DB", async () => {
    const res = await mainAction.delete(
      optionO.id as number,
      "menu_fork_option_options"
    );
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Error Delete menu fork options item from DB", async () => {
    const res = await mainAction.delete(9999, "menu_fork_option_options");
    expect(res.affectedRows).toEqual(0);
  });
});
