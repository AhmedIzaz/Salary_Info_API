const db = require("../../../db");
const { getDataForResponse } = require("../../../utils");

exports.managementController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(
        `SELECT * FROM user WHERE id='${request?.userId}' AND user_type=1`
      );
    if (data?.length <= 0)
      return reply
        .status(404)
        .send("You are not allowed to access managment api");
    return reply.send(getDataForResponse(data?.[0]));
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};

exports.supervisorAndAboveController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(
        `SELECT * FROM user WHERE id='${request?.userId}' AND user_type in (1, 2)`
      );
    if (data?.length <= 0)
      return reply
        .status(404)
        .send("You are not allowed to access Supervisor api");
    return reply.send(getDataForResponse(data?.[0]));
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};

exports.teamLeadAndAboveController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(
        `SELECT * FROM user WHERE id='${request?.userId}' AND user_type in (1, 2, 3)`
      );
    if (data?.length <= 0)
      return reply
        .status(404)
        .send("You are not allowed to access team leads api");
    return reply.send(getDataForResponse(data?.[0]));
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};

exports.everyOneController = async (request, reply) => {
  try {
    const [data] = await db
      .promise()
      .query(`SELECT * FROM user WHERE id='${request?.userId}'`);
    if (data?.length <= 0) return reply.status(404).send("Data Not Found");
    return reply.send(getDataForResponse(data?.[0]));
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};
