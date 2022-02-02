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
            "CreatedSNSRole": "string",
            "GoogleWebClient": "string"
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
        "videoservice": {
            "oVODInputS3": "string",
            "oVODOutputS3": "string",
            "oVodOutputUrl": "string"
        }
    },
    "api": {
        "liquid": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "assets": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "function": {
        "transcriber": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "transcriptor": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "liquidPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        },
        "liquidPreSignup": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        },
        "liquidassets": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}