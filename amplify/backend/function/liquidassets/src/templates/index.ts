import * as AWS from "aws-sdk";
import { nanoid } from "nanoid";
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const BUCKET = `liquid-${process.env.ENV}-storage`;
const NUGGET_TENANT = "getnugget.io";
export const cloneTemplate = async (templateId: string, tenant: string) => {
  const project = await getProjectByTemplateId(templateId);

  if (!project) {
    throw new Error(`No project found by templateId ${templateId}`);
  }
  const newProjectId = await createProjectFromTemplate(project, tenant);
  console.log("created new project ", newProjectId);

  const tagDictionary = await setupTags(project.id, newProjectId, tenant);
  console.log("tag setup complete", tagDictionary);

  await setupStories(project.id, newProjectId, tenant, tagDictionary);
};

const getStories = async (projectId: string) => {
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

const getCategories = async (projectId: string) => {
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

async function createStory(
  story: any,
  projectId: string,
  tenant: string,
  categoryDict: any
) {
  const id = nanoid();
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

const getHighlights = async (projectId: string) => {
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

async function createHighlight(
  highlight: any,
  projectId: string,
  storyId: string,
  tenant: string,
  tagsDict: any
) {
  const id = nanoid();
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

export const setupStories = async (
  projectId: string,
  newProjectId: string,
  tenant: string,
  tagsDictionary: any
) => {
  const categories = await getCategories(projectId);
  const stories = await getStories(projectId);
  const highlights = await getHighlights(projectId);
  const storyDict = {};
  const highlightDict = {};
  const categoriesDict = {};

  for (let category of categories) {
    const storiesInCategory = stories.filter(
      (story) => story.categoriesID === category.id
    );
    const newCategoryId = await createCategory(category, newProjectId, tenant);
    categoriesDict[category.id] = newCategoryId;
    for (let story of storiesInCategory) {
      const highlightsInStory = highlights.filter(
        (tag) => tag.storyID === story.id
      );
      const newStoryId = await createStory(
        story,
        newProjectId,
        tenant,
        tagsDictionary.tagCategoryDict
      );
      storyDict[story.id] = newStoryId;
      for (let highlight of highlightsInStory) {
        const newHighlightId = await createHighlight(
          highlight,
          newProjectId,
          newStoryId,
          tenant,
          tagsDictionary.tagDict
        );
        highlightDict[highlight.id] = newHighlightId;
      }

      if (story.content) {
        await prepareStoryDocument(
          story.content,
          newStoryId,
          tenant,
          highlightDict
        );
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

async function getProjectByTemplateId(templateId: string) {
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

async function createProjectFromTemplate(project: any, tenant: string) {
  const id = nanoid();
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

async function setupTags(
  projectId: string,
  newProjectId: string,
  tenant: string
) {
  const tagCategories = await getTagCategories(projectId);
  const tags = await getTags(projectId);
  const tagCategoryDict = {};
  const tagDict = {};

  for (let tagCategory of tagCategories) {
    const tagsInCategory = tags.filter(
      (tag) => tag.tagCategoryID === tagCategory.id
    );
    const newTagCategoryId = await createTagCategory(
      tagCategory,
      newProjectId,
      tenant
    );
    tagCategoryDict[tagCategory.id] = newTagCategoryId;
    for (let tag of tagsInCategory) {
      const newTagId = await createTag(
        tag,
        newProjectId,
        newTagCategoryId,
        tenant
      );
      tagDict[tag.id] = newTagId;
    }
  }

  return {
    tagCategoryDict,
    tagDict,
  };
}

const getTagCategories = async (projectId: string) => {
  const params = {
    ExpressionAttributeValues: {
      ":projectValue": projectId,
    },
    KeyConditionExpression: "projectsID = :projectValue",
    IndexName: "byProjects",
    TableName: process.env.API_LIQUID_TAGCATEGORYTABLE_NAME,
  };
  const tagCategoriesResponse = await docClient.query(params).promise();
  const tagCategories = tagCategoriesResponse.Items.map(
    (tagCategory) => tagCategory
  );
  return tagCategories;
};

async function createTagCategory(
  tagCategory: any,
  projectId: string,
  tenant: string
) {
  const id = nanoid();
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

const getTags = async (projectId: string) => {
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

async function createCategory(
  category: any,
  projectId: string,
  tenant: string
) {
  const id = nanoid();
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

async function createTag(
  tag: any,
  projectId: string,
  tagCategoryId: string,
  tenant: string
) {
  const id = nanoid();
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

async function prepareStoryDocument(
  content: any,
  newStoryId: string,
  tenant: string,
  highlightDict: {}
) {
  const videoNode = content.content.find(
    (node) => node.type === "videoComponent"
  );
  let justifiedContent = JSON.stringify(content);
  if (videoNode) {
    const { transcriptId, video } = videoNode.attrs;
    console.log("video attrs", transcriptId, video);
    const videoAsset = await getVideoAsset(video);
    const newVideoId = nanoid() + videoAsset.video.split(".")[1];
    const newVideoAssetId = await createVideoAsset(
      videoAsset,
      newVideoId,
      tenant
    );
    justifiedContent = justifiedContent.replace(
      new RegExp(video, "g"),
      newVideoAssetId
    );
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
      justifiedContent = justifiedContent.replace(
        new RegExp(transcriptId, "g"),
        newTranscriptId
      );
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
  Object.keys(highlightDict).reduce(
    (jsonContent: string, highlightId: string) => {
      const newHighlightId = highlightDict[highlightId];
      jsonContent = jsonContent.replace(
        new RegExp(highlightId, "g"),
        newHighlightId
      );
      return jsonContent;
    },
    justifiedContent
  );
}

async function createTranscript(transcript: any, tenant: string) {
  const id = nanoid();
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

async function getTranscript(id: string) {
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

async function createVideoAsset(
  videoAsset: any,
  newVideoId: string,
  tenant: string
) {
  const id = nanoid();
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

async function getVideoAsset(id: string) {
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
