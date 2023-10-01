const db = require("../../../db");

exports.managementController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM user WHERE id=? AND user_type=1`, [
        request?.userId,
      ]);
    if (data?.length <= 0)
      return reply
        .status(404)
        .send("You are not allowed to access managment api");
    return reply.send(data?.[0]);
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};

exports.supervisorAndAboveController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM user WHERE id= AND user_type in (1, 2)`, [
        request?.userId,
      ]);
    if (data?.length <= 0)
      return reply
        .status(404)
        .send("You are not allowed to access Supervisor api");
    return reply.send(data?.[0]);
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};

exports.teamLeadAndAboveController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM user WHERE id=? AND user_type in (1, 2, 3)`, [
        request?.userId,
      ]);
    if (data?.length <= 0)
      return reply
        .status(404)
        .send("You are not allowed to access team leads api");
    return reply.send(data?.[0]);
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};

exports.everyOneController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM user WHERE id=?`, [request?.userId]);
    if (data?.length <= 0) return reply.status(404).send("Data Not Found");
    return reply.status(200).send(data?.[0]);
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};
