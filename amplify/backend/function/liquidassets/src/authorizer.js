"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const AWS = require("aws-sdk");
const authorize = async (req, res, next) => {
    try {
        const IDP_REGEX = /.*\/.*,(.*)\/(.*):CognitoSignIn:(.*)/;
        const authProvider = req.apiGateway.event.requestContext.identity
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
        req.user = user;
        console.info(req.user);
        next();
    }
    catch (error) {
        console.log(error);
        next(error);
    }
};
exports.authorize = authorize;
