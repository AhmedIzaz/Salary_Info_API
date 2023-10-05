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

const salaryCreateWithParamsQueryBodyType = {
  type: "object",
  properties: {
    fromData: {
      type: "string",
    },
  },
  required: ["fromData"],
};

const salaryGetWithQueryParamsValidator = {
  type: "object",
  properties: {
    userId: {
      type: "number",
    },
  },
  required: ["userId"],
};

const salaryCreateWithQueryOrParamsValidator = {
  type: "object",
  properties: {
    userId: salaryGetWithQueryParamsValidator?.properties?.userId,
    amount: {
      type: "number",
      errorMessage: { type: "Amount must be a number" },
    },
  },
  required: ["userId", "amount"],
  errorMessage: {
    required: {
      userId: "User Id is required",
      amount: "Amount is required",
    },
  },
};

const salaryCreateWithQueryParamResValidator = {
  200: {
    type: "string",
  },
  500: {
    type: "string",
  },
  403: {
    type: "string",
  },
};

const salaryGetWithQueryParamResValidator = {
  500: {
    type: "string",
  },
  403: {
    type: "string",
  },
  200: {
    type: "object",
    properties: {
      user_id: { type: "number" },
      amount: { type: "number" },
    },
  },
};

exports.salaryCreateWithParamsValidator = {
  params: salaryCreateWithQueryOrParamsValidator,
  body: salaryCreateWithParamsQueryBodyType,
  response: salaryCreateWithQueryParamResValidator,
};

exports.salaryCreateWithQueryValidator = {
  querystring: salaryCreateWithQueryOrParamsValidator,
  body: salaryCreateWithParamsQueryBodyType,
  response: salaryCreateWithQueryParamResValidator,
};

exports.salaryGetWithParamsValidator = {
  params: salaryGetWithQueryParamsValidator,
  response: salaryGetWithQueryParamResValidator,
};
exports.salaryGetWithQueryValidator = {
  querystring: salaryGetWithQueryParamsValidator,
  response: salaryGetWithQueryParamResValidator,
};
