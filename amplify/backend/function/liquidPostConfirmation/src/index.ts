import * as AWS from "aws-sdk";
import axios from "axios";
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  const email = event.request.userAttributes.email;
  const domain = email.split("@")[1];
  const companyNameFromEmail = domain.substring(0, domain.lastIndexOf("."));
  const companies = (await axios.get(
    `https://autocomplete.clearbit.com/v1/companies/suggest?query=${domain}`
  )) as unknown as any[];
  const tenant =
    companies.length > 0 ? companies[0].name : companyNameFromEmail;

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
  } catch (error) {
    await cognito.createGroup(groupParams).promise();
  }
  try {
    await cognito.adminAddUserToGroup(addUserParams).promise();
  } catch (error) {
    throw new Error(error);
  }
  return event;
};
