import { createServer, proxy } from "aws-serverless-express";
import app from "./app";

const server = createServer(app);

exports.handler = (event, context) => {
  return proxy(server, event, context, "PROMISE").promise;
};
