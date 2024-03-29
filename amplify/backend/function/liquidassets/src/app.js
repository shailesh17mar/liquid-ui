"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const AWS = require("aws-sdk");
const nanoid_1 = require("nanoid");
const middleware_1 = require("aws-serverless-express/middleware");
const body_parser_1 = require("body-parser");
const authorizer_1 = require("./authorizer");
const templates_1 = require("./templates");
const s3 = new AWS.S3();
const BUCKET = `liquid-${process.env.ENV}-storage`;
const EXPIRY_IN_SECONDS = 60 * 60 * 5;
// declare a new express app
const app = express();
app.use((0, body_parser_1.json)());
app.use((0, middleware_1.eventContext)());
// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(authorizer_1.authorize);
app.post("/assets/upload", function (req, res) {
    const metadata = req.body;
    const id = (0, nanoid_1.nanoid)();
    const name = `${id}.${metadata.contentType.split("/")[1]}`;
    const url = s3.getSignedUrl("putObject", {
        Bucket: BUCKET,
        Key: `${req.tenant}/${name}`,
        Expires: EXPIRY_IN_SECONDS,
        ContentType: metadata.contentType,
        Metadata: metadata,
    });
    res.json({ name, uploadURL: url });
});
app.post("/templates/:id/clone", async (req, res) => {
    await (0, templates_1.cloneTemplate)(req.params.id, req.tenant);
    res.sendStatus(200);
});
app.get("/assets/:id", async function (req, res) {
    const { id } = req.params;
    const params = {
        Bucket: BUCKET,
        Key: `${req.tenant}/${id}`,
    };
    const { Metadata } = await s3.headObject(params).promise();
    const url = s3.getSignedUrl("getObject", {
        Bucket: BUCKET,
        Key: `${req.tenant}/${id}`,
        Expires: EXPIRY_IN_SECONDS,
    });
    res.json({ url, metadata: Metadata });
});
app.listen(3000, function () {
    console.log("App started");
});
// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
exports.default = app;
