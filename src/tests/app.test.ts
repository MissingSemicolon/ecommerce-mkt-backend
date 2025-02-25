import request from "supertest";
import app from "../app";

describe("Testando API", () => {
  it("Deve responder com status 200 na rota principal", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "API Running");
  });
});
