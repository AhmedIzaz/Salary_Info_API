const bcrypt = require("bcrypt");
const db = require("../../../db");
const jwt = require("jsonwebtoken");

exports.signupController = async (req, reply) => {
  try {
    const { email, username, password, user_type, upper_level_user } = req.body;
    const [userExist] = await db
      .promise()
      .query(`SELECT * FROM user WHERE email='${email}'`);

    if (userExist?.length > 0)
      return reply.code(409).send("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query(
        `INSERT INTO user (email, username, password, user_type, upper_level_user) VALUES ('${email}', '${
          username || null
        }','${hashedPassword}',${user_type || null},${
          upper_level_user || null
        })`
      );
    return reply.code(201).send("User created successfully");
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};

exports.loginController = async (request, reply) => {
  try {
    const { email, password } = request.body;
    const [user] = await db
      .promise()
      .query(`SELECT * FROM user WHERE email='${email}' LIMIT 1`);
    if (user?.length <= 0) return reply.code(409).send("User dont exists");
    const passwordMatched = await bcrypt.compare(password, user?.[0]?.password);
    if (!passwordMatched) return reply.code(401).send("Unauthorized Access");
    const token = jwt.sign(
      {
        userId: user?.[0]?.id,
        email: user?.[0]?.email,
        username: user?.[0]?.username,
        isSuperUser: user?.[0]?.user_type == 1,
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
