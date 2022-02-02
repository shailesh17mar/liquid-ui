import { createServer, proxy } from "aws-serverless-express";
import app from "./app";

const server = createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return proxy(server, event, context, "PROMISE").promise;
};
