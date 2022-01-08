"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
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
            //create the asset url
            //TODO: Extension right now is static, it needs to be derived from transcription
            const MEDIA_FORMAT = "mp4";
            const asset = entry.video.substring(entry.video.lastIndexOf("/") + 1);
            console.log(entry);
            // const asset = `${entry.id}.${MEDIA_FORMAT}`;
            const mediaUrl = `https://s3.amazonaws.com/videoservice-staging-input-b6l4sht5/${asset.replace("m3u8", "mp4")}`;
            //create a transcript job
            await transcribeService
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
                UpdateExpression: "set #status= :status",
                ExpressionAttributeValues: {
                    ":status": "INPROGRESS",
                },
                ExpressionAttributeNames: {
                    "#status": "status",
                },
            })
                .promise();
        }
    }
    return Promise.resolve("Successfully processed DynamoDB record");
};
