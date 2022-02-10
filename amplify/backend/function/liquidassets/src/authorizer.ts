import * as AWS from "aws-sdk";

interface User {
  name?: string;
  email?: string;
  sub?: string;
}
export const authorize = async (req, res, next) => {
  try {
    const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
    const authProvider =
      req.apiGateway.event.requestContext.identity
        .cognitoAuthenticationProvider;
    const [, , , userId] = authProvider.match(IDP_REGEX);

    const cognito = new AWS.CognitoIdentityServiceProvider();
    const listUsersResponse = await cognito
      .listUsers({
        UserPoolId: process.env.AUTH_LIQUID_USERPOOLID,
        Filter: `sub = "${userId}"`,
        Limit: 1,
      })
      .promise();
    const user = listUsersResponse.Users[0];
    const userDetails: User = user.Attributes.reduce((acc, attribute) => {
      acc[attribute.Name] = attribute.Value;
      return acc;
    }, {});
    req.user = userDetails;
    req.tenant = userDetails.email.split("@")[1];
    next();
  } catch (error) {
    next(error);
  }
};
