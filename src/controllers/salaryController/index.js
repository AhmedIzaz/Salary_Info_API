const db = require("../../../db");

exports.salaryInformationController = async (request, reply) => {
  try {
    const payload = {};
    const userId = +(request?.userId || 0);
    const [selfSalary] = await db
      .promise()
      .query(
        `SELECT user.user_type, COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.id=${userId}`
      );
    const userType = selfSalary?.[0]?.user_type;
    payload.yourSalary = selfSalary?.[0]?.amount;
    if (userType < 4) {
      const [secondStepEmployee] = await db
        .promise()
        .query(
          `SELECT user.id, user.username,COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user=${userId}`
        );
      if (userType <= 2) {
        const secondStepEmpIdSet = secondStepEmployee
          .map((item) => item.id)
          .join(",");
        const [thirdStepEmployee] = await db
          .promise()
          .query(
            `SELECT user.id, user.username,COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user in (${secondStepEmpIdSet})`
          );
        if (userType == 1) {
          payload.yourSupervisorsSalary = secondStepEmployee;
          payload.yourTeamLeadsSalary = thirdStepEmployee;
          const teamLeadsIdSet = thirdStepEmployee
            .map((item) => item.id)
            .join(",");
          const [developersSalary] = await db
            .promise()
            .query(
              `SELECT user.id, user.username,COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON user.id=salary.user_id WHERE user.upper_level_user in (${teamLeadsIdSet})`
            );
          payload.yourDevelopersSalary = developersSalary;
        } else if (userType == 2) {
          payload.yourTeamLeadsSalary = secondStepEmployee;
          payload.yourDevelopersSalary = thirdStepEmployee;
        }
      } else if (userType == 3)
        payload.yourDevelopersSalary = secondStepEmployee;
    }

    return reply.send(payload).status(200);
  } catch (error) {
    return reply.send(error?.message).status(500);
  }
};
