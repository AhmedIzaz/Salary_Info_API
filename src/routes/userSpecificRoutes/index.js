const { isLoggedIn } = require("../../../middlewares/authMiddlewares");
const {
  managementController,
  everyOneController,
  teamLeadAndAboveController,
  supervisorAndAboveController,
} = require("../../controllers/userSpecificController");

module.exports = (fastify, _, done) => {
  fastify.get(
    "/management",
    {
      preHandler: [isLoggedIn],
    },
    managementController
  );
  fastify.get(
    "/supervisorAndAbove",
    {
      preHandler: [isLoggedIn],
    },
    supervisorAndAboveController
  );
  fastify.get(
    "/teamLeadAndAbove",
    {
      preHandler: [isLoggedIn],
    },
    teamLeadAndAboveController
  );
  fastify.get(
    "/everyOne",
    {
      preHandler: [isLoggedIn],
    },
    everyOneController
  );
  done();
};
