"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupStories = exports.cloneTemplate = void 0;
const AWS = require("aws-sdk");
const nanoid_1 = require("nanoid");
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const BUCKET = `liquid-${process.env.ENV}-storage`;
const NUGGET_TENANT = "getnugget.io";
const cloneTemplate = async (templateId, tenant) => {
    const project = await getProjectByTemplateId(templateId);
    if (!project) {
        throw new Error(`No project found by templateId ${templateId}`);
    }
    const newProjectId = await createProjectFromTemplate(project, tenant);
    console.log("created new project ", newProjectId);
    const tagDictionary = await setupTags(project.id, newProjectId, tenant);
    console.log("tag setup complete", tagDictionary);
    await (0, exports.setupStories)(project.id, newProjectId, tenant, tagDictionary);
};
exports.cloneTemplate = cloneTemplate;
const getStories = async (projectId) => {
    const params = {
        ExpressionAttributeValues: {
            ":projectValue": projectId,
        },
        KeyConditionExpression: "projectsID = :projectValue",
        IndexName: "byProjects",
        TableName: process.env.API_LIQUID_STORIESTABLE_NAME,
    };
    const storiesResponse = await docClient.query(params).promise();
    const stories = storiesResponse.Items.map((tag) => tag);
    return stories;
};
const getCategories = async (projectId) => {
    const params = {
        ExpressionAttributeValues: {
            ":projectValue": projectId,
        },
        KeyConditionExpression: "projectsID = :projectValue",
        IndexName: "byProjects",
        TableName: process.env.API_LIQUID_CATEGORIESTABLE_NAME,
    };
    const categoriesResponse = await docClient.query(params).promise();
    const categories = categoriesResponse.Items.map((category) => category);
    return categories;
};
async function createStory(story, projectId, tenant, categoryDict) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            __typename: "Stories",
            title: story.title,
            type: story.type,
            categoriesID: categoryDict[story.categoriesID],
            projectsID: projectId,
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_STORIESTABLE_NAME,
    })
        .promise();
    return id;
}
const getHighlights = async (projectId) => {
    const params = {
        ExpressionAttributeValues: {
            ":projectValue": projectId,
        },
        KeyConditionExpression: "projectsID = :projectValue",
        IndexName: "byProjects",
        TableName: process.env.API_LIQUID_HIGHLIGHTSTABLE_NAME,
    };
    const highlightsResponse = await docClient.query(params).promise();
    const highlights = highlightsResponse.Items.map((highlight) => highlight);
    return highlights;
};
async function createHighlight(highlight, projectId, storyId, tenant, tagsDict) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            __typename: "Highlights",
            color: highlight.color,
            endTime: highlight.endTime,
            startTime: highlight.startTime,
            projectsID: projectId,
            storyID: storyId,
            Tags: highlight.Tags.map((tag) => tagsDict[tag]),
            text: highlight.text,
            type: highlight.type,
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_HIGHLIGHTSTABLE_NAME,
    })
        .promise();
    return id;
}
const setupStories = async (projectId, newProjectId, tenant, tagsDictionary) => {
    const categories = await getCategories(projectId);
    const stories = await getStories(projectId);
    const highlights = await getHighlights(projectId);
    const storyDict = {};
    const highlightDict = {};
    const categoriesDict = {};
    for (let category of categories) {
        const storiesInCategory = stories.filter((story) => story.categoriesID === category.id);
        const newCategoryId = await createCategory(category, newProjectId, tenant);
        categoriesDict[category.id] = newCategoryId;
        for (let story of storiesInCategory) {
            const highlightsInStory = highlights.filter((tag) => tag.storyID === story.id);
            const newStoryId = await createStory(story, newProjectId, tenant, tagsDictionary.tagCategoryDict);
            storyDict[story.id] = newStoryId;
            for (let highlight of highlightsInStory) {
                const newHighlightId = await createHighlight(highlight, newProjectId, newStoryId, tenant, tagsDictionary.tagDict);
                highlightDict[highlight.id] = newHighlightId;
            }
            if (story.content) {
                await prepareStoryDocument(story.content, newStoryId, tenant, highlightDict);
            }
            // Challenges copying video to appropriate place
            // create vod asset
            // Copying transcript json
            //
        }
    }
    return {
        tagCategoryDict: storyDict,
        tagDict: highlightDict,
    };
};
exports.setupStories = setupStories;
async function getProjectByTemplateId(templateId) {
    const params = {
        ExpressionAttributeValues: {
            ":templateValue": templateId,
        },
        KeyConditionExpression: "templateId = :templateValue",
        TableName: process.env.API_LIQUID_PROJECTSTABLE_NAME,
        IndexName: "byTemplates",
    };
    const projectResponse = await docClient.query(params).promise();
    const project = projectResponse.Items[0];
    return project;
}
async function createProjectFromTemplate(project, tenant) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            name: project.name,
            icon: project.icon,
            __typename: "Projects",
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_PROJECTSTABLE_NAME,
    })
        .promise();
    return id;
}
async function setupTags(projectId, newProjectId, tenant) {
    const tagCategories = await getTagCategories(projectId);
    const tags = await getTags(projectId);
    const tagCategoryDict = {};
    const tagDict = {};
    for (let tagCategory of tagCategories) {
        const tagsInCategory = tags.filter((tag) => tag.tagCategoryID === tagCategory.id);
        const newTagCategoryId = await createTagCategory(tagCategory, newProjectId, tenant);
        tagCategoryDict[tagCategory.id] = newTagCategoryId;
        for (let tag of tagsInCategory) {
            const newTagId = await createTag(tag, newProjectId, newTagCategoryId, tenant);
            tagDict[tag.id] = newTagId;
        }
    }
    return {
        tagCategoryDict,
        tagDict,
    };
}
const getTagCategories = async (projectId) => {
    const params = {
        ExpressionAttributeValues: {
            ":projectValue": projectId,
        },
        KeyConditionExpression: "projectsID = :projectValue",
        IndexName: "byProjects",
        TableName: process.env.API_LIQUID_TAGCATEGORYTABLE_NAME,
    };
    const tagCategoriesResponse = await docClient.query(params).promise();
    const tagCategories = tagCategoriesResponse.Items.map((tagCategory) => tagCategory);
    return tagCategories;
};
async function createTagCategory(tagCategory, projectId, tenant) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            __typename: "TagCategory",
            name: tagCategory.name,
            color: tagCategory.color,
            projectsID: projectId,
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_TAGCATEGORYTABLE_NAME,
    })
        .promise();
    return id;
}
const getTags = async (projectId) => {
    const params = {
        ExpressionAttributeValues: {
            ":projectValue": projectId,
        },
        KeyConditionExpression: "projectsID = :projectValue",
        IndexName: "byProjects",
        TableName: process.env.API_LIQUID_TAGSTABLE_NAME,
    };
    const tagsResponse = await docClient.query(params).promise();
    const tags = tagsResponse.Items.map((tag) => tag);
    return tags;
};
async function createCategory(category, projectId, tenant) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            __typename: "Categories",
            name: category.name,
            projectsID: projectId,
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_CATEGORIESTABLE_NAME,
    })
        .promise();
    return id;
}
async function createTag(tag, projectId, tagCategoryId, tenant) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            __typename: "Tags",
            label: tag.label,
            color: tag.color,
            projectsID: projectId,
            tagCategoryID: tagCategoryId,
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_TAGSTABLE_NAME,
    })
        .promise();
    return id;
}
async function prepareStoryDocument(content, newStoryId, tenant, highlightDict) {
    const videoNode = content.content.find((node) => node.type === "videoComponent");
    let justifiedContent = JSON.stringify(content);
    if (videoNode) {
        const { transcriptId, video } = videoNode.attrs;
        console.log("video attrs", transcriptId, video);
        const videoAsset = await getVideoAsset(video);
        const newVideoId = (0, nanoid_1.nanoid)() + videoAsset.video.split(".")[1];
        const newVideoAssetId = await createVideoAsset(videoAsset, newVideoId, tenant);
        justifiedContent = justifiedContent.replace(new RegExp(video, "g"), newVideoAssetId);
        const videoCopyResult = await s3
            .copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${NUGGET_TENANT}/${videoAsset.video}`,
            Key: `${tenant}/${newVideoId}`,
        })
            .promise();
        console.log("video copying result", videoCopyResult);
        if (transcriptId) {
            console.log("fetching transcript", transcriptId);
            const transcript = await getTranscript(transcriptId);
            const newTranscriptId = await createTranscript(transcript, tenant);
            justifiedContent = justifiedContent.replace(new RegExp(transcriptId, "g"), newTranscriptId);
            const transcriptCopyResult = await s3
                .copyObject({
                Bucket: BUCKET,
                CopySource: `${BUCKET}/${NUGGET_TENANT}/${transcriptId}.json`,
                Key: `${tenant}/${newTranscriptId}.json`,
            })
                .promise();
            console.log("transcript copying result", transcriptCopyResult);
        }
    }
    Object.keys(highlightDict).reduce((jsonContent, highlightId) => {
        const newHighlightId = highlightDict[highlightId];
        jsonContent = jsonContent.replace(new RegExp(highlightId, "g"), newHighlightId);
        return jsonContent;
    }, justifiedContent);
}
async function createTranscript(transcript, tenant) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            __typename: "Transcription",
            status: transcript.status,
            video: transcript.video,
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_TRANSCRIPTIONTABLE_NAME,
    })
        .promise();
    return id;
}
async function getTranscript(id) {
    const params = {
        Key: {
            id,
        },
        TableName: process.env.API_LIQUID_TRANSCRIPTIONTABLE_NAME,
    };
    const transcriptResponse = await docClient.get(params).promise();
    const transcript = transcriptResponse.Item;
    return transcript;
}
async function createVideoAsset(videoAsset, newVideoId, tenant) {
    const id = (0, nanoid_1.nanoid)();
    const now = new Date().toISOString();
    await docClient
        .put({
        Item: {
            id,
            __typename: "VodAsset",
            vodAssetTranscriptionId: videoAsset.vodAssetTranscriptionId,
            video: newVideoId,
            title: videoAsset.title,
            tenant,
            createdAt: now,
            updatedAt: now,
        },
        TableName: process.env.API_LIQUID_VODASSETTABLE_NAME,
    })
        .promise();
    return id;
}
async function getVideoAsset(id) {
    const params = {
        Key: {
            id,
        },
        TableName: process.env.API_LIQUID_VODASSETTABLE_NAME,
    };
    const videoAssetResponse = await docClient.get(params).promise();
    const videoAsset = videoAssetResponse.Item;
    return videoAsset;
}
// async function main() {
//   console.log("Starting the clone process");
//   await cloneTemplate("123", "getnugget.io");
// }
// main();
