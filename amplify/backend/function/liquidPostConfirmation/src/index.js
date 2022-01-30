"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const axios_1 = require("axios");
const cognito = new AWS.CognitoIdentityServiceProvider();
exports.handler = async (event) => {
    console.info("raw event", event);
    const email = event.request.userAttributes.email;
    const domain = email.split("@")[1];
    const companyNameFromEmail = domain.substring(0, domain.lastIndexOf("."));
    const companies = (await axios_1.default.get(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${domain}`));
    const tenant = companies.length > 0 ? companies[0].name : companyNameFromEmail;
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
