import FooterForkModel from "../../app/models/footer/footerForkModel";
import FooterModel from "../../app/models/footer/footerModel";
import MainModel from "../../app/models/main.models";
import Accepted from "../../app/types/accepted.type";
import FooterType, {
  FooterForkType,
  FooterUser,
} from "../../app/types/footer.type";

const footer = new FooterModel();
const mainAction = new MainModel();

const footerData = {
  name: "test item",
  status: 1,
} as FooterType;

const update_info = {
  name: "test update",
  status: 0,
} as FooterType;

describe("footer Model", () => {
  it("created new item in footer", async () => {
    const res = await footer.create(footerData);
    footerData.id = res?.insertId;
    update_info.id = res?.insertId;
    expect(res?.insertId as number).toBeDefined;
  });

  it("returns footer item info", async () => {
    const res = (await footer.getFooterItem(
      footerData.id as number
    )) as FooterType;
    expect(Number(res.id)).toEqual(footerData.id as number);
  });

  it("returns footer item info", async () => {
    const res = (await footer.getFooterItems()) as FooterType[];

    expect(Number(res.length)).toBeGreaterThan(0);
  });

  it("returns footer item info for user", async () => {
    const res = (await footer.getFooterUser()) as FooterUser[];

    expect(Number(res.length)).toBeGreaterThan(0);
  });

  it("update footer item info", async () => {
    const res = (await footer.updateInfo(update_info)) as Accepted;

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("update footer item status", async () => {
    const res = (await mainAction.updateStatus(
      0,
      footerData.id as number,
      "footer"
    )) as Accepted;

    expect(res.changedRows).toEqual(0);
    expect(res.affectedRows).toEqual(1);
  });

  it("Delete footer from DB", async () => {
    const res = await mainAction.delete(footerData.id as number, "footer");
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Delete footer from DB", async () => {
    const res = await mainAction.delete(9999, "footer");
    expect(res.affectedRows).toEqual(0);
  });
});

const fork = new FooterForkModel();

const footerForkData = {
  name: "test item",
  status: 1,
} as FooterForkType;

const updateFork_info = {
  name: "test update",
  status: 0,
} as FooterForkType;

describe("footer fork Model", () => {
  beforeAll(async () => {
    const res = await footer.create(footerData);
    footerForkData.footer_id = res.insertId;
    updateFork_info.footer_id = res.insertId;
  });
  afterAll(async () => {
    await mainAction.delete(footerForkData.footer_id as number, "footer");
  });
  it("created new item in footer fork", async () => {
    const res = await fork.create(footerForkData);
    footerForkData.id = res?.insertId;
    updateFork_info.id = res?.insertId;
    expect(res?.insertId as number).toBeDefined;
  });

  it("returns footer fork item info", async () => {
    const res = (await fork.getForkItem(
      footerForkData.id as number
    )) as FooterForkType;
    expect(Number(res.id)).toEqual(footerForkData.id as number);
  });

  it("returns footer fork item info", async () => {
    const res = (await fork.getForkItems()) as FooterForkType[];

    expect(Number(res.length)).toBeGreaterThan(0);
  });

  it("update footer fork item info", async () => {
    const res = (await fork.updateInfo(updateFork_info)) as Accepted;

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("update footer fork item status", async () => {
    const res = (await mainAction.updateStatus(
      0,
      footerForkData.id as number,
      "footer_fork"
    )) as Accepted;

    expect(res.changedRows).toEqual(0);
    expect(res.affectedRows).toEqual(1);
  });

  it("Delete footer fork from DB", async () => {
    const res = await mainAction.delete(
      footerForkData.id as number,
      "footer_fork"
    );
    expect(res.affectedRows as number).toEqual(1);
  });

  it("Delete footer fork from DB", async () => {
    const res = await mainAction.delete(9999, "footer_fork");
    expect(res.affectedRows).toEqual(0);
  });
});
