"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_serverless_express_1 = require("aws-serverless-express");
const app_1 = require("./app");
const server = (0, aws_serverless_express_1.createServer)(app_1.default);
exports.handler = (event, context) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return (0, aws_serverless_express_1.proxy)(server, event, context, "PROMISE").promise;
};
