const { isLoggedIn } = require("../../../middlewares/authMiddlewares");
const {
  salaryInformationController,
} = require("../../controllers/salaryController");

module.exports = (fastify, _, done) => {
  // hook for middleware is the request of user is authenticated or not
  fastify.addHook("preHandler", isLoggedIn);

    // controllers for handle the request
  fastify.get("/", salaryInformationController);
  done();
};
