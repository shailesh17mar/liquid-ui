// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TranscriptionStatus = {
  "ENQUEUED": "ENQUEUED",
  "COMPLETED": "COMPLETED",
  "INPROGRESS": "INPROGRESS",
  "FAILED": "FAILED"
};

const HighlightType = {
  "TRANSCRIPT": "TRANSCRIPT",
  "NORMAL": "NORMAL"
};

const { Persons, Insights, Highlights, Tags, Transcription, Stories, Categories, Projects, Workspaces, Organisations, VodAsset, TagCategory } = initSchema(schema);

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
  Organisations,
  VodAsset,
  TagCategory,
  TranscriptionStatus,
  HighlightType
};