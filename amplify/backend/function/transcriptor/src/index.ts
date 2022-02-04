import * as AWS from "aws-sdk";
const transcribeService = new AWS.TranscribeService();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("ENVIRONMENT VARIABLES\n" + JSON.stringify(process.env, null, 2));
  console.info("EVENT\n" + JSON.stringify(event, null, 2));
  //loop through all the trigger events
  for (const record of event.Records) {
    //if the event is 'INSERT'
    if (record.eventName === "INSERT") {
      //Unmarshall Dynamo record to json
      const entry = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      console.log(entry);
      if (!entry.video) {
        console.log("Entry failed:", entry);

        return Promise.resolve("Successfully processed DynamoDB record");
      }
      //create the asset url
      //TODO: Extension right now is static, it needs to be derived from transcription
      const mediaFormat = entry.video.substring(
        entry.video.lastIndexOf(".") + 1
      );

      const mediaUrl = `s3://${process.env.S3_BUCKET}/${entry.tenant}/${entry.video}`;
      //create a transcript job
      await transcribeService
        .startTranscriptionJob({
          Media: { MediaFileUri: mediaUrl },
          LanguageCode: "en-US",
          MediaFormat: mediaFormat,
          TranscriptionJobName: entry.id,
          OutputBucketName: process.env.S3_BUCKET,
          OutputKey: `${entry.tenant}/`,
          Settings: {
            ShowSpeakerLabels: true,
            //TODO: Max speaker is hard coded right now. This needs to be derived while start transcribe
            MaxSpeakerLabels: 3,
          },
        })
        .promise();
      //update the transcript entry status
      await docClient
        .update({
          TableName: process.env.API_LIQUID_TRANSCRIPTIONTABLE_NAME,
          Key: {
            id: entry.id,
          },
          UpdateExpression: "SET #s = :status",
          ExpressionAttributeValues: {
            ":status": "INPROGRESS",
          },
          ExpressionAttributeNames: {
            "#s": "status",
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();
    }
  }

  return Promise.resolve("Successfully processed DynamoDB record");
};
