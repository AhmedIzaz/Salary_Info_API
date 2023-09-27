const { isLoggedIn } = require("../../../middlewares/authMiddlewares");
const {
  userSpecificRouteResponseType,
} = require("../../../validators/userSpecificRoutesValidators");
const {
  managementController,
  everyOneController,
  teamLeadAndAboveController,
  supervisorAndAboveController,
} = require("../../controllers/userSpecificController");

module.exports = (fastify, _, done) => {
  // hook for middleware is the request of user is authenticated or not
  fastify.addHook("preHandler", isLoggedIn);

  // controllers for handle the request
  fastify.get(
    "/management",
    { schema: userSpecificRouteResponseType },
    managementController
  );
  fastify.get(
    "/supervisorAndAbove",
    { schema: userSpecificRouteResponseType },
    supervisorAndAboveController
  );
  fastify.get(
    "/teamLeadAndAbove",
    { schema: userSpecificRouteResponseType },
    teamLeadAndAboveController
  );
  fastify.get(
    "/everyOne",
    { schema: userSpecificRouteResponseType },
    everyOneController
  );
  done();
};
