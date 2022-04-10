import * as AWS from "aws-sdk";
import { nanoid } from "nanoid";

const docClient = new AWS.DynamoDB.DocumentClient();

enum HighlightType {
  TRANSCRIPT,
  NORMAL,
}

export const createProject = async ({
  tenant,
  templateId,
}: {
  tenant: string;
  templateId: string;
}) => {
  const id = nanoid();
  const project = await docClient.get;
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

export const createCategories = async ({
  tenant,
  categories,
  projectId,
}: {
  tenant: string;
  projectId: string;
  categories: Array<string>;
}) => {
  const ids = categories.map((category: string) => nanoid());
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

export const createStories = async ({
  tenant,
  stories,
  projectId,
}: {
  tenant: string;
  projectId: string;
  stories: Array<{
    categoryId: string;
    title: string;
  }>;
}) => {
  const ids = stories.map((story: any) => nanoid());
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

export const createTagCategories = async ({
  tenant,
  categories,
  projectId,
}: {
  tenant: string;
  projectId: string;
  categories: Array<string>;
}) => {
  const ids = categories.map((category: string) => nanoid());
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

export const createTags = async ({
  tenant,
  tags,
  projectId,
}: {
  tenant: string;
  projectId: string;
  tags: Array<{
    categoryId: string;
    label: string;
    color: string;
  }>;
}) => {
  const ids = tags.map((tag: any) => nanoid());
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

/*
Copy from the highlights table
*/
export const createHighlights = async ({
  tenant,
  highlights,
  projectId,
}: {
  tenant: string;
  projectId: string;
  highlights: Array<{
    categoryId: string;
    text: string;
    color: string;
    tags: Array<string>;
    type: HighlightType;
    transcriptionID: string;
    startTime: number;
    endTime: number;
    storyID: string;
  }>;
}) => {
  const ids = highlights.map((tag: any) => nanoid());
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

export const copyRecordings = async () => {};

export const copyTranscriptions = async () => {};

export const cloneTemplate = async (templateId: string) => {
  try {
    //   create the project
    //   params: templateId
    //   create new project
    const projectId = await createProject(templateId);
    //    create categories
    //    params: projectId, templateId
    //    create categories
    //    How will you update references?
    //    get the stories
    //    fetch from db /create new with
    const categoryIds = await createCategories(projectId);
    //    create stories
    //    params: projectId, templateId, cate
    const storyIds = await createStories();
    //    create tag categories
    const tagCategoryIds = await createTagCategories();
    //    create tags
    const tags = await createTags();
    //    copy recordings
    await copyRecordings();
    //    copy transcriptions
    await copyTranscriptions();
  } catch (error) {
    throw error;
  }
};
