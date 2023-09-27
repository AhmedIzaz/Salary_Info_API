const bcrypt = require("bcrypt");
const db = require("../../../../db");
module.exports = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const [user] = await db
      .promise()
      .query(`SELECT * FROM user WHERE email=${email}`);
    if (!user) return reply.code(409).send("User dont exists");
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) return reply.code(401).send("Unauthorized Access");
    const token = jwt.sign(
      {
        userId: user?.id,
        email: user?.email,
        username: user?.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600,
      }
    );
    return reply.code(200).send({
      message: "Login successfull",
      token,
    });
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};
