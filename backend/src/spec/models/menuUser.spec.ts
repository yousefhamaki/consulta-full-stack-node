import menuUserModel from "../../app/models/menu/menuUser.model";

const menu = new menuUserModel();

describe("Menu user Model", () => {
  it("get menu for user", async () => {
    const res = await menu.getMenu();

    expect(res[0].data).toBeDefined;
  });
});
