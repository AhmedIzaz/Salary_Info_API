const authRoutes = require("./authRoutes");
const userSpecificRoutes = require("./userSpecificRoutes");
module.exports = (fastify, _, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });
  fastify.register(userSpecificRoutes, {
    prefix: "/userSpecificRoutes",
  });

  done();
};
