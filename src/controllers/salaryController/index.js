const db = require("../../../db");

exports.salaryInformationController = async (request, reply) => {
  try {
    const payload = {};
    const userId = request?.id;
    const [selfSalary] = await db
      .promise()
      .query(
        `SELECT user.user_type, salary.amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.id='${userId}'`
      );
    const userType = selfSalary?.[0]?.user_type;
    payload.yourSalary = selfSalary?.[0]?.amount;

    if (userType == 1) {
      const [supervisorsSalary] = await db
        .promise()
        .query(
          `SELECT user.id, user.username, salary.amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user='${userId}'`
        );
      payload.yourSupervisorsSalary = supervisorsSalary;
      const supervisorsIdSet = supervisorsSalary
        .map((item) => item.id)
        .join(",");
      const [teamLeadsSalary] = await db
        .promise()
        .query(
          `SELECT user.id, user.username, salary.amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user in ('${supervisorsIdSet}')`
        );
      payload.yourTeamLeadsSalary = teamLeadsSalary;
      const teamLeadsIdSet = supervisorsSalary.map((item) => item.id).join(",");
      const [developersSalary] = await db
        .promise()
        .query(
          `SELECT user.id, user.username, salary.amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user in ('${teamLeadsIdSet}')`
        );
      payload.yourDevelopersSalary = developersSalary;
    }

    if (userType == 2) {
      const [teamLeadsSalary] = await db
        .promise()
        .query(
          `SELECT user.username, salary.amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user='${userId}'`
        );
      payload.yourTeamLeadsSalary = teamLeadsSalary;
    }
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};
