const db = require("../../../../db");
const bcrypt = require("bcrypt");
module.exports = async (req, reply) => {
  try {
    const { email, username, password, user_type, upper_level_user } = req.body;
    const userExist = await db
      .promise()
      .query(`SELECT * FROM user WHERE email=${email}`);
    if (userExist) return reply.code(409).send("User already exists");
    const hashedPassword = await bcrypt.hash(password, 10);
    await db
      .promise()
      .query(
        `INSERT INTO user (email, username, password, user_type, upper_level_user) VALUES (${email}, ${username},${hashedPassword},${user_type},${upper_level_user})`
      );
    return reply.code(201).send("User created successfully");
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};
