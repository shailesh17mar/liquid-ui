"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneTemplate = exports.copyTranscriptions = exports.copyRecordings = exports.createHighlights = exports.createTags = exports.createTagCategories = exports.createStories = exports.createCategories = exports.createProject = void 0;
const AWS = require("aws-sdk");
const nanoid_1 = require("nanoid");
const docClient = new AWS.DynamoDB.DocumentClient();
var HighlightType;
(function (HighlightType) {
    HighlightType[HighlightType["TRANSCRIPT"] = 0] = "TRANSCRIPT";
    HighlightType[HighlightType["NORMAL"] = 1] = "NORMAL";
})(HighlightType || (HighlightType = {}));
const createProject = async ({ tenant, name, }) => {
    const id = (0, nanoid_1.nanoid)();
    await docClient
        .put({
        TableName: process.env.API_LIQUID_PROJECTSTABLE_NAME,
        Item: {
            id,
            tenant,
            name,
        },
    })
        .promise();
    return id;
};
exports.createProject = createProject;
const createCategories = async ({ tenant, categories, projectId, }) => {
    const ids = categories.map((category) => (0, nanoid_1.nanoid)());
    const mutations = categories.map((category, index) => {
        return docClient
            .put({
            TableName: process.env.API_LIQUID_CATEGORIESTABLE_NAME,
            Item: {
                id: ids[index],
                tenant,
                name: category,
                projectsID: projectId,
            },
        })
            .promise();
    });
    await Promise.all(mutations);
    return ids;
};
exports.createCategories = createCategories;
const createStories = async ({ tenant, stories, projectId, }) => {
    const ids = stories.map((story) => (0, nanoid_1.nanoid)());
    const mutations = stories.map((story, index) => {
        return docClient
            .put({
            TableName: process.env.API_LIQUID_STORIESTABLE_NAME,
            Item: {
                id: ids[index],
                tenant,
                title: story.title,
                projectsID: projectId,
                categoriesID: story.categoryId,
            },
        })
            .promise();
    });
    await Promise.all(mutations);
    return ids;
};
exports.createStories = createStories;
const createTagCategories = async ({ tenant, categories, projectId, }) => {
    const ids = categories.map((category) => (0, nanoid_1.nanoid)());
    const mutations = categories.map((category, index) => {
        return docClient
            .put({
            TableName: process.env.API_LIQUID_TAGCATEGORYTABLE_NAME,
            Item: {
                id: ids[index],
                tenant,
                name: category,
                projectsID: projectId,
            },
        })
            .promise();
    });
    await Promise.all(mutations);
    return ids;
};
exports.createTagCategories = createTagCategories;
const createTags = async ({ tenant, tags, projectId, }) => {
    const ids = tags.map((tag) => (0, nanoid_1.nanoid)());
    const mutations = tags.map((tag, index) => {
        return docClient
            .put({
            TableName: process.env.API_LIQUID_TAGCATEGORYTABLE_NAME,
            Item: {
                id: ids[index],
                tenant,
                label: tag.label,
                projectsID: projectId,
                tagCategoryID: tag.categoryId,
                color: tag.color,
            },
        })
            .promise();
    });
    await Promise.all(mutations);
    return ids;
};
exports.createTags = createTags;
/*
Copy from the highlights table
*/
const createHighlights = async ({ tenant, highlights, projectId, }) => {
    const ids = highlights.map((tag) => (0, nanoid_1.nanoid)());
    const mutations = highlights.map((highlight, index) => {
        return docClient
            .put({
            TableName: process.env.API_LIQUID_HIGHLIGHTSTABLE_NAME,
            Item: {
                id: ids[index],
                tenant,
                text: highlight.text,
                type: highlight.type,
                Tags: highlight.tags,
                tagCategoryID: highlight.categoryId,
                transcriptionID: highlight.transcriptionID,
                projectsID: projectId,
                storyID: highlight.storyID,
                startTime: highlight.startTime,
                endTime: highlight.endTime,
                color: highlight.color,
            },
        })
            .promise();
    });
    await Promise.all(mutations);
    return ids;
};
exports.createHighlights = createHighlights;
const copyRecordings = async () => { };
exports.copyRecordings = copyRecordings;
const copyTranscriptions = async () => { };
exports.copyTranscriptions = copyTranscriptions;
const cloneTemplate = async (templateId) => {
    try {
        //   create the project
        const projectId = await (0, exports.createProject)();
        //    create categories
        const categoryIds = await (0, exports.createCategories)();
        //    create stories
        const storyIds = await (0, exports.createStories)();
        //    create tag categories
        const tagCategoryIds = await (0, exports.createTagCategories)();
        //    create tags
        const tags = await (0, exports.createTags)();
        //    copy recordings
        await (0, exports.copyRecordings)();
        //    copy transcriptions
        await (0, exports.copyTranscriptions)();
    }
    catch (error) {
        throw error;
    }
};
exports.cloneTemplate = cloneTemplate;
