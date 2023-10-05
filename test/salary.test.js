require("dotenv").config({ path: ".env.test" });
const fastify = require("fastify")();
const request = require("supertest");
const {
  salaryGetWithParamsController,
  salaryGetWithQueryController,
  salaryCreateWithQueryParamsController,
} = require("../src/controllers/salaryController");
const {
  salaryGetWithParamsValidator,
  salaryGetWithQueryValidator,
  salaryCreateWithQueryValidator,
  salaryCreateWithParamsValidator,
} = require("../validators/salaryInformationValidators");

beforeAll(async () => {
  await fastify.register(require("@fastify/formbody"));
  fastify.get(
    "/salaryInformation/get-with-params/:userId",
    { schema: salaryGetWithParamsValidator },
    salaryGetWithParamsController
  );
  fastify.get(
    "/salaryInformation/get-with-query",
    { schema: salaryGetWithQueryValidator },
    salaryGetWithQueryController
  );
  fastify.post(
    "/create-with-params/:userId/:amount",
    {
      schema: salaryCreateWithParamsValidator,
    },
    salaryCreateWithQueryParamsController
  );
  fastify.post(
    "/create-with-query",
    {
      schema: salaryCreateWithQueryValidator,
    },
    salaryCreateWithQueryParamsController
  );
  await fastify.ready();
});

afterAll(async () => {
  await fastify.close();
});

describe("Salary information with params test", () => {
  it("Should return valid salary information", async () => {
    const response = await request(fastify.server).get(
      "/salaryInformation/get-with-params/10"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user_id: expect.any(Number),
        amount: expect.any(Number),
      })
    );
  });

  it("should return 500 with missing user id", async () => {
    const response = await request(fastify.server).get(
      "/salaryInformation/get-with-params/-10"
    );
    expect(response.status).toBe(500);
  });

  it("should return 400 with invalid params", async () => {
    const response = await request(fastify.server).get(
      "/salaryInformation/get-with-params/invalid-params"
    );
    expect(response.status).toBe(400);
  });
});

describe("Salary Information with query parameters", () => {
  it("Should return valid salary information", async () => {
    const response = await request(fastify.server).get(
      "/salaryInformation/get-with-query?userId=10"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        user_id: expect.any(Number),
        amount: expect.any(Number),
      })
    );
  });

  it("should return 500 with missing user id", async () => {
    const response = await request(fastify.server).get(
      "/salaryInformation/get-with-query?userId=-10"
    );
    expect(response.status).toBe(500);
  });

  it("should return 400 without query params or invalid query ", async () => {
    const response = await request(fastify.server).get(
      "/salaryInformation/get-with-query"
    );
    expect(response.status).toBe(400);
  });
});


