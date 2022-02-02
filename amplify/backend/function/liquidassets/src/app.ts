import * as express from "express";
import * as AWS from "aws-sdk";
import { eventContext } from "aws-serverless-express/middleware";
import { json } from "body-parser";
import { authorize } from "./authorizer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
const s3 = new AWS.S3();

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

app.get("/asset/:id", function (req, res) {
  // Add your code here
  const bucket = "liquid-user-storage";
  const signedUrlExpireSeconds = 60 * 60 * 5;

  const url = s3.getSignedUrl("getObject", {
    Bucket: bucket,
    Key: req.params.id,
    Expires: signedUrlExpireSeconds,
  });
  res.json({ url });
});

app.put("/assets/:id", function (req, res) {
  // Add your code here
  const bucket = "liquid-user-storage";
  const signedUrlExpireSeconds = 60 * 60 * 5;

  const url = s3.getSignedUrl("putObject", {
    Bucket: bucket,
    Key: req.params.id,
    Expires: signedUrlExpireSeconds,
  });
  res.json({ url });
});

app.get("/assets", function (req, res) {
  // Add your code here
  res.json({ success: "get call succeed!", url: req.url });
});

app.post("/item", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.post("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "post call succeed!", url: req.url, body: req.body });
});

app.put("/item", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

app.put("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "put call succeed!", url: req.url, body: req.body });
});

/****************************
 * Example delete method *
 ****************************/

app.delete("/item", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.delete("/item/*", function (req, res) {
  // Add your code here
  res.json({ success: "delete call succeed!", url: req.url });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file

export default app;
