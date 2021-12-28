// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const TranscriptionStatus = {
  "ENQUEUED": "ENQUEUED",
  "COMPLETED": "COMPLETED",
  "INPROGRESS": "INPROGRESS",
  "FAILED": "FAILED"
};

const { Persons, Insights, Highlights, Tags, Transcription, Stories, Categories, Projects, Workspaces, Organisations, VodAsset, VideoObject } = initSchema(schema);

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
  VideoObject,
  TranscriptionStatus
};