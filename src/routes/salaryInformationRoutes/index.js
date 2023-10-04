const { isLoggedIn } = require("../../../middlewares/authMiddlewares");
const {
  salaryCreateReqRespValidator,
  salaryCreateWithParamsValidator,
  salaryCreateWithQueryValidator,
  salaryGetWithParamsValidator,
  salaryGetWithQueryValidator,
} = require("../../../validators/salaryInformationValidators");
const {
  salaryInformationController,
  createSalaryInfo,
  salaryCreateWithQueryParamsController,
  salaryGetWithQueryParamsController,
} = require("../../controllers/salaryController");

module.exports = (fastify, _, done) => {
  // hook for middleware is the request of user is authenticated or not
  fastify.addHook("preHandler", isLoggedIn);

  // controllers for handle the request
  fastify.get("/", salaryInformationController);
  fastify.post(
    "/create",
    { schema: salaryCreateReqRespValidator },
    createSalaryInfo
  );
  fastify.post(
    "/create-with-params/:userId/:amount",
    {
      schema: salaryCreateWithParamsValidator,
    },
    salaryCreateWithQueryParamsController
  );
  fastify.get(
    "/get-with-params/:userId/:amount",
    {
      schema: salaryGetWithParamsValidator,
    },
    salaryGetWithQueryParamsController
  );
  fastify.post(
    "/create-with-query",
    {
      schema: salaryCreateWithQueryValidator,
    },
    salaryCreateWithQueryParamsController
  );
  fastify.get(
    "/get-with-query",
    {
      schema: salaryGetWithQueryValidator,
    },
    salaryGetWithQueryParamsController
  );
  done();
};
