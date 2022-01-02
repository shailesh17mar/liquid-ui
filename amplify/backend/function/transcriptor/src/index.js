/* Amplify Params - DO NOT EDIT
	API_LIQUID_GRAPHQLAPIIDOUTPUT
	API_LIQUID_TRANSCRIPTIONTABLE_ARN
	API_LIQUID_TRANSCRIPTIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");
const transcribeService = new AWS.TranscribeService();
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = (event) => {
  //eslint-disable-line
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach((record) => {
    if (record.eventName === "INSERT") {
      console.log(record.eventID);
      console.log(record.eventName);
      console.log("DynamoDB Record: %j", record.dynamodb);
      const entry = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);

      const asset = entry.id + ".mp4";
      const mediaUrl = `https://s3.amazonaws.com/videoservice-staging-input-b6l4sht5/${asset}`;
      const TranscriptionJobName = entry.id;
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
    }
  });
  return Promise.resolve("Successfully processed DynamoDB record");
};
