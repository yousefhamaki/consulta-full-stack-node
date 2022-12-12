import supertest from "supertest";
import app from "../../..";

const request = supertest(app);

describe("GET /api/menu", function () {
  it("returns status code `200`", async () => {
    const res = await request.get("/api/menu");

    console.log(res.body);
    expect(res.status).toEqual(200);
  });
});
