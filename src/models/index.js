// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Insights, Highlights, Tags, Transcription, Stories, Categories, Projects, Workspaces, Organisations } = initSchema(schema);

export {
  Insights,
  Highlights,
  Tags,
  Transcription,
  Stories,
  Categories,
  Projects,
  Workspaces,
  Organisations
};