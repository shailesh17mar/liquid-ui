/* Amplify Params - DO NOT EDIT
	API_LIQUID_GRAPHQLAPIIDOUTPUT
	API_LIQUID_TRANSCRIPTIONTABLE_ARN
	API_LIQUID_TRANSCRIPTIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { DataStore } = require("aws-amplify");
const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const transcribeService = new AWS.TranscribeService();
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2));

  try {
    if (event.Records[0].eventName.includes("ObjectCreated")) {
      const record = event.Records[0];
      // await Promise.all(
      // event.Records.map(async (record) => {
      const asset = record.s3.object.key;
      const mediaUrl = `https://s3.amazonaws.com/${record.s3.bucket.name}/${asset}`;
      const TranscriptionJobName = `${asset}-${Date.now()}`;
      const MediaFormat = asset.substring(asset.lastIndexOf(".") + 1);

      console.log(`S3 object: ${mediaUrl}`);
      console.log(`Job name: ${TranscriptionJobName}`);

      //Update entry in dynamo db
      const id = nanoid();
      const transcription = await docClient
        .put({
          TableName: process.env.API_LIQUID_TRANSCRIPTIONTABLE_NAME,
          /* Item properties will depend on your application concerns */
          Item: {
            id,
            video: mediaUrl,
            status: "ENQUEUED",
          },
        })
        .promise();

      console.log(
        `Transcription entry: ${JSON.stringify(transcription, null, 0)}`
      );
      // Submit job to Transcribe service
      const result = await transcribeService
        .startTranscriptionJob({
          Media: { MediaFileUri: mediaUrl },
          LanguageCode: "en-US",
          MediaFormat,
          TranscriptionJobName: id,
          OutputBucketName: "liquid-transcriptions",
        })
        .promise();
      console.log(`Transcribe result: ${JSON.stringify(result, null, 0)}`);
      // })
      // );
    }
  } catch (err) {
    console.error(err);
  }
  // const bucket = event.Records[0].s3.bucket.name;
  // const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  // const params = {
  //     Bucket: bucket,
  //     Key: key,
  // };
  // try {
  //     const { ContentType } = await s3.getObject(params).promise();
  //     console.log('CONTENT TYPE:', ContentType);
  //     return ContentType;
  // } catch (err) {
  //     console.log(err);
  //     const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
  //     console.log(message);
  //     throw new Error(message);
  // }
};
