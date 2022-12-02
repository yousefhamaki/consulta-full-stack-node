import partitionsModel from "../../app/models/menu/partitions.model";
import Partition from "../../app/types/partition.type";

const partition = new partitionsModel();

const data = {
  name: "test partition",
  img: "faiafc.img",
  link: null,
  status: 1,
  relations: [{ id: 1 }, { id: 2 }, { id: 3 }],
} as Partition;

describe("Partitions Model", () => {
  it("created new item in partition", async () => {
    const res = await partition.create(data);
    data.id = res?.insertId;
    expect(res?.affectedRows as number).toBe(data.relations.length);
  });

  it("get all partitions to admin", async () => {
    const res = await partition.getAll("admin");

    expect(res.length).toBeGreaterThan(0);
  });

  it("get all partitions to user", async () => {
    const res = await partition.getAll("user");

    expect(res.length).toBeGreaterThan(0);
  });

  it("get partition by id", async () => {
    const res = await partition.getPartition(data.id as number);

    expect(res.id as number).toBe(data.id as number);
    expect(res.relations.length).toEqual(data.relations.length);
  });

  it("delete partition by id", async () => {
    const res = await partition.delete(data.id as number);

    expect(res.affectedRows as number).toBe(4);
  });
});
