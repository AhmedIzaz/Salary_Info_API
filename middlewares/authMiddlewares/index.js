const jwt = require("jsonwebtoken");
exports.isLoggedIn = (req, reply, done) => {
  try {
    if (req.headers.authorization) {
      const loggedIn = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY,
        {
          ignoreExpiration: false,
        }
      );
      if (loggedIn) {
        req.userId = loggedIn?.userId;
        req.isSuperUser = loggedIn?.isSuperUser;
        return done();
      }
    }
    throw new Error("Unauthorized");
  } catch (err) {
    return reply.code(401).send({ message: "Unauthorized" });
  }
};

exports.notLoggedIn = (req, reply, done) => {
  try {
    if (req.headers.authorization) {
      const notExpired = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET_KEY,
        {
          ignoreExpiration: false,
        }
      );
      if (notExpired) reply.code(401).send({ message: "Already Looged In" });
    }
    done();
  } catch (err) {
    done();
  }
};
