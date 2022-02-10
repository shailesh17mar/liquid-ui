import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    //loop through all the events
    for (const record of event.Records) {
      //if event type is 'ObjectCreated'
      if (record.eventName.includes("ObjectCreated")) {
        const transcript = record.s3.object.key.split("/")[1];
        const dotIndex = transcript.lastIndexOf(".");
        const isTranscription = transcript.substring(dotIndex + 1) === "json";
        //check the file type and if its json
        if (isTranscription) {
          const id = transcript.substring(0, dotIndex);
          //update the transcription table with new status and transcription path
          await docClient
            .update({
              TableName: process.env.API_LIQUID_TRANSCRIPTIONTABLE_NAME,
              Key: {
                id,
              },
              UpdateExpression: "SET #s = :status",
              ExpressionAttributeValues: {
                ":status": "COMPLETED",
              },
              ExpressionAttributeNames: {
                "#s": "status",
              },
              ReturnValues: "ALL_NEW",
            })
            .promise();
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};
