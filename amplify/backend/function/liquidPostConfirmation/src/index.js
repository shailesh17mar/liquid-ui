"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const cognito = new AWS.CognitoIdentityServiceProvider();
exports.handler = async (event) => {
    console.info("raw evnet", JSON.stringify(event));
    const email = event.request.userAttributes.email;
    const tenant = email.split("@")[1];
    const groupParams = {
        GroupName: tenant,
        UserPoolId: event.userPoolId,
    };
    const addUserParams = {
        GroupName: tenant,
        UserPoolId: event.userPoolId,
        Username: event.userName,
    };
    try {
        await cognito.getGroup(groupParams).promise();
    }
    catch (error) {
        await cognito.createGroup(groupParams).promise();
    }
    try {
        await cognito.adminAddUserToGroup(addUserParams).promise();
    }
    catch (error) {
        throw new Error(error);
    }
    return event;
};
