import AWS from "aws-sdk";
const transcribeService = new AWS.TranscribeService();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  //loop through all the trigger events
  for (const record of event.Records) {
    //if the event is 'INSERT'
    if (record.eventName === "INSERT") {
      //Unmarshall Dynamo record to json
      const entry = AWS.DynamoDB.Converter.unmarshall(record.dynamodb.NewImage);
      //create the asset url
      //TODO: Extension right now is static, it needs to be derived from transcription
      const MEDIA_FORMAT = "mp4";
      const asset = `${entry.id}.${MEDIA_FORMAT}`;
      const mediaUrl = `https://s3.amazonaws.com/videoservice-staging-input-b6l4sht5/${asset}`;
      //create a transcript job
      const result = await transcribeService
        .startTranscriptionJob({
          Media: { MediaFileUri: mediaUrl },
          LanguageCode: "en-US",
          MediaFormat: MEDIA_FORMAT,
          TranscriptionJobName: entry.id,
          OutputBucketName: "liquid-transcriptions",
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
          UpdateExpression: "set status = :status",
          ExpressionAttributeValues: {
            ":status": "ENQUEUED",
          },
        })
        .promise();
    }
  }

  return Promise.resolve("Successfully processed DynamoDB record");
};
