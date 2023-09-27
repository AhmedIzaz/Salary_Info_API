const authRoutes = require("./authRoutes");

module.exports = (fastify, _, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });

  done();
};
