exports.handler = async (event) => {
  const publicKey = fs.readFileSync(__dirname + "/keys/public.pub");

  const { authorizationToken } = event;

  const result = await jwt.verify(authorizationToken, publicKey);
  const response = {
    isAuthorized: result && result.foo && result.foo === "bar",
  };
  return response;
};
