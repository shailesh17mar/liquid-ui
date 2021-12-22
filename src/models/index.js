// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Persons, Insights, Highlights, Tags, Transcription, Stories, Categories, Projects, Workspaces, Organisations } = initSchema(schema);

export {
  Persons,
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