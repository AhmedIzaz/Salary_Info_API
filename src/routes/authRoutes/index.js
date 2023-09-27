const { notLoggedIn } = require("../../middlewares/authMiddlewares");
const loginController = require("../../controllers/authController/loginController");
const signupController = require("../../controllers/authController/signupController");
const {
  loginReqRespValidator,
  loginReqValidator,
} = require("../../validators/authValidators");
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
