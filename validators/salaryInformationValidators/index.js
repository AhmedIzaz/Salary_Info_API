exports.salaryCreateReqRespValidator = {
  body: {
    type: "object",
    properties: {
      id: { type: "integer" },
      amount: { type: "integer" },
    },
    required: ["id", "amount"],
  },
};
