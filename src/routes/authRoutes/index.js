const { notLoggedIn } = require("../../../middlewares/authMiddlewares");

const {
  loginReqRespValidator,
  loginReqValidator,
} = require("../../../validators/authValidators");
const {
  loginController,
  signupController,
} = require("../../controllers/authController");

module.exports = (fastify, _, done) => {
  fastify.addSchema(loginReqValidator);

  fastify.post(
    "/login",
    {
      schema: loginReqRespValidator,
      preHandler: [notLoggedIn],
    },
    loginController
  );
  fastify.post(
    "/signup",
    {
      schema: {
        body: {
          $ref: "loginReqBody",
        },
      },
      preHandler: [notLoggedIn],
    },
    signupController
  );

  done();
};
