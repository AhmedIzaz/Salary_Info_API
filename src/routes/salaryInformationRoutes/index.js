const { isLoggedIn } = require("../../../middlewares/authMiddlewares");
const {
  salaryCreateReqRespValidator,
} = require("../../../validators/salaryInformationValidators");
const {
  salaryInformationController,
  createSalaryInfo,
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
  done();
};
