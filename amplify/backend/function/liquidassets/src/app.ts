import * as express from "express";
import * as AWS from "aws-sdk";
import { nanoid } from "nanoid";
import { eventContext } from "aws-serverless-express/middleware";
import { json } from "body-parser";
import { authorize } from "./authorizer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
const s3 = new AWS.S3();

const BUCKET = "liquid-user-storage";
const EXPIRY_IN_SECONDS = 60 * 60 * 5;
// declare a new express app
const app = express();
app.use(json());
app.use(eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(authorize);

app.get("/assets/upload", function (req, res) {
  const id = nanoid();
  const url = s3.getSignedUrl("putObject", {
    Bucket: BUCKET,
    Key: `${req.tenant}/${id}`,
    Expires: EXPIRY_IN_SECONDS,
  });
  res.json({ id, uploadURL: url });
});

app.get("/assets/:id", function (req, res) {
  const { id } = req.params;
  const url = s3.getSignedUrl("getObject", {
    Bucket: BUCKET,
    Key: `${req.tenant}/${id}`,
    Expires: EXPIRY_IN_SECONDS,
  });
  res.json({ url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file

export default app;
