export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "liquid": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "HostedUIDomain": "string",
            "OAuthMetadata": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "CreatedSNSRole": "string"
        },
        "userPoolGroups": {
            "AdminGroupRole": "string"
        }
    },
    "storage": {
        "s3liquidstoragedolpdy24rr4fr": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "video": {
        "vodservice": {
            "oVODInputS3": "string",
            "oVODOutputS3": "string",
            "oVodOutputUrl": "string"
        }
    },
    "api": {
        "liquid": {
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}