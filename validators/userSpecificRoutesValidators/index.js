exports.userSpecificRouteResponseType = {
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "number" },
        username: { type: "string" },
        email: { type: "string" },
      },
    },
    404: {
      type: "string",
    },
  },
};
