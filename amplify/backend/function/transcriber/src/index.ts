import * as AWS from "aws-sdk";
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  // console.log(JSON.stringify(event, null, 2));

  try {
    //loop through all the events
    for (const record of event.Records) {
      //if event type is 'ObjectCreated'
      if (record.eventName.includes("ObjectCreated")) {
        const transcript = record.s3.object.key;
        const dotIndex = transcript.lastIndexOf(".");
        const isTranscription = transcript.substring(dotIndex + 1) === "json";
        //check the file type and if its json
        if (isTranscription) {
          const id = transcript.substring(0, dotIndex);
          //update the transcription table with new status and transcription path
          console.log(id);
          await docClient
            .update({
              TableName: process.env.API_LIQUID_TRANSCRIPTIONTABLE_NAME,
              Key: {
                id,
              },
              UpdateExpression: "set #status= :status ",
              ExpressionAttributeValues: {
                ":status": "COMPLETED",
              },
              ExpressionAttributeNames: {
                "#status": "status",
              },
            })
            .promise();
        }
      }
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
