import config from "../../app/config";
import lawModel from "../../app/models/law/law.model";
import MainModel from "../../app/models/main.models";
import Accepted from "../../app/types/accepted.type";
import LawType from "../../app/types/law.type";

const law = new lawModel();
const mainAction = new MainModel();

const data = {
  law_name: "test law name",
  content: "test law content",
  file: "null",
} as LawType;

const updateInfo = {
  law_name: "test law name update",
  content: "test law content update",
  file: "null",
} as LawType;

describe("Testing Law Model", () => {
  it("expect New law created", async () => {
    const res = await law.create(data);
    data.id = res.insertId;
    updateInfo.id = res.insertId;
    expect(res.insertId).toBeDefined;
  });

  it("expect get law info", async () => {
    const res = await law.getLawItem(data.id as number);

    expect(res.id as number).toEqual(data.id as number);
  });

  it("update law item info", async () => {
    const res = (await law.updateInfo(updateInfo)) as Accepted;

    expect(res.changedRows).toEqual(1);
    expect(res.affectedRows).toEqual(1);
  });

  it("expect get laws info in paginate", async () => {
    const res = await law.getAllLaw(1);

    expect(res.pagination.current as number).toEqual(1);
    expect(res.pagination.perPage as number).toEqual(config.perPage);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it("expect get laws info in paginate", async () => {
    const res = await law.getAllLaw(2);

    expect(res.pagination.current as number).toEqual(2);
    expect(res.pagination.perPage as number).toEqual(config.perPage);
    expect(res.data.length).toBeGreaterThan(0);
  });

  it("Delete law from DB", async () => {
    const res = await mainAction.delete(data.id as number, "law");
    expect(res.affectedRows as number).toEqual(1);
  });
});
