const authRoutes = require("./authRoutes");
const userSpecificRoutes = require("./userSpecificRoutes");
const salaryInformationRoutes = require("./salaryInformationRoutes")
module.exports = (fastify, _, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  fastify.register(userSpecificRoutes, {
    prefix: "/userSpecificRoutes",
  });
  fastify.register(salaryInformationRoutes, {
    prefix: "/salaryInformation",
  });
  done();
};
