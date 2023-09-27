exports.getDataForResponse = (data) => ({
  user_id: data?.id,
  username: data?.username,
  email: data?.email,
});
