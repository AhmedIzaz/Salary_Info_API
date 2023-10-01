const db = require("../../../db");

exports.createSalaryInfo = async (request, reply) => {
  try {
    const { id, amount } = request?.body;
    const [userInfo] = await db
      .promise()
      .query(`SELECT upper_level_user FROM user WHERE id=?`, [id]);
    const isPermitted =
      request?.userType === 1 ||
      userInfo?.[0]?.upper_level_user === request?.userId ||
      false;
    if (!isPermitted)
      return reply
        .status(403)
        .send("You are not allowed to assign salary for this user");

    await db.promise().query(`DELETE FROM salary WHERE user_id=?`, [id]);
    await db
      .promise()
      .query(`INSERT INTO salary (user_id, amount) value (?, ?);`, [
        id,
        amount,
      ]);
    return reply.status(200).send("Salary created successfully");
  } catch (err) {
    return reply.send(err?.message).status(500);
  }
};

exports.salaryInformationController = async (request, reply) => {
  try {
    const payload = {};
    const userId = +(request?.userId || 0);
    const [selfSalary] = await db
      .promise()
      .query(
        `SELECT user.user_type, COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.id=?`,
        [userId]
      );
    const userType = selfSalary?.[0]?.user_type;
    payload.yourSalary = selfSalary?.[0]?.amount;
    if (userType < 4) {
      const [secondStepEmployee] = await db
        .promise()
        .query(
          `SELECT user.id, user.username,COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user=?`,
          [userId]
        );
      if (userType <= 2) {
        const secondStepEmpIdSet = secondStepEmployee.map((item) => item.id);
        const [thirdStepEmployee] = await db
          .promise()
          .query(
            `SELECT user.id, user.username,COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON salary.user_id=user.id WHERE user.upper_level_user in (?)`,
            [secondStepEmpIdSet]
          );
        if (userType == 1) {
          payload.yourSupervisorsSalary = secondStepEmployee;
          payload.yourTeamLeadsSalary = thirdStepEmployee;
          const teamLeadsIdSet = thirdStepEmployee.map((item) => item.id);
          const [developersSalary] = await db
            .promise()
            .query(
              `SELECT user.id, user.username,COALESCE(salary.amount,0) as amount FROM user LEFT JOIN salary ON user.id=salary.user_id WHERE user.upper_level_user in (?)`,
              [teamLeadsIdSet]
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
