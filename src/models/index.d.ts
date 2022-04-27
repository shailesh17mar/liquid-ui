import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TranscriptionStatus {
  ENQUEUED = "ENQUEUED",
  COMPLETED = "COMPLETED",
  INPROGRESS = "INPROGRESS",
  FAILED = "FAILED"
}

export enum HighlightType {
  TRANSCRIPT = "TRANSCRIPT",
  NORMAL = "NORMAL"
}



export declare class Persons {
  readonly id: string;
  readonly tenant: string;
  readonly additonalFields?: string | null;
  readonly name?: string | null;
  readonly email?: string | null;
  readonly persona?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly business?: string | null;
  readonly templateId?: string | null;
  constructor(init: ModelInit<Persons>);
  static copyOf(source: Persons, mutator: (draft: MutableModel<Persons>) => MutableModel<Persons> | void): Persons;
}

export declare class Insights {
  readonly id: string;
  readonly tenant: string;
  readonly projectsID: string;
  readonly content?: string | null;
  readonly templateId?: string | null;
  constructor(init: ModelInit<Insights>);
  static copyOf(source: Insights, mutator: (draft: MutableModel<Insights>) => MutableModel<Insights> | void): Insights;
}

export declare class Highlights {
  readonly id: string;
  readonly tenant: string;
  readonly color: string;
  readonly text: string;
  readonly Tags?: (string | null)[] | null;
  readonly tagIds?: string | null;
  readonly user?: string | null;
  readonly type: HighlightType | keyof typeof HighlightType;
  readonly transcriptionID?: string | null;
  readonly projectsID: string;
  readonly storyID: string;
  readonly startTime?: number | null;
  readonly endTime?: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly templateId?: string | null;
  constructor(init: ModelInit<Highlights>);
  static copyOf(source: Highlights, mutator: (draft: MutableModel<Highlights>) => MutableModel<Highlights> | void): Highlights;
}

export declare class Tags {
  readonly id: string;
  readonly tenant: string;
  readonly label: string;
  readonly color: string;
  readonly projectsID: string;
  readonly tagCategory: TagCategory;
  readonly updatedAt: string;
  readonly createdAt?: string | null;
  readonly templateId?: string | null;
  constructor(init: ModelInit<Tags>);
  static copyOf(source: Tags, mutator: (draft: MutableModel<Tags>) => MutableModel<Tags> | void): Tags;
}

export declare class TagCategory {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly color: string;
  readonly projectsID: string;
  readonly tags?: (Tags | null)[] | null;
  readonly templateId?: string | null;
  constructor(init: ModelInit<TagCategory>);
  static copyOf(source: TagCategory, mutator: (draft: MutableModel<TagCategory>) => MutableModel<TagCategory> | void): TagCategory;
}

export declare class Transcription {
  readonly id: string;
  readonly tenant: string;
  readonly video: string;
  readonly docId?: string | null;
  readonly transcription?: string | null;
  readonly content?: string | null;
  readonly Highlights?: (Highlights | null)[] | null;
  readonly status: TranscriptionStatus | keyof typeof TranscriptionStatus;
  readonly templateId?: string | null;
  constructor(init: ModelInit<Transcription>);
  static copyOf(source: Transcription, mutator: (draft: MutableModel<Transcription>) => MutableModel<Transcription> | void): Transcription;
}

export declare class Stories {
  readonly id: string;
  readonly tenant: string;
  readonly icon?: string | null;
  readonly categoriesID: string;
  readonly projectsID: string;
  readonly Highlights?: (Highlights | null)[] | null;
  readonly type: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly title: string;
  readonly content?: string | null;
  readonly transcription?: Transcription | null;
  readonly participants?: Persons | null;
  readonly templateId?: string | null;
  readonly storiesTranscriptionId?: string | null;
  readonly storiesParticipantsId?: string | null;
  constructor(init: ModelInit<Stories>);
  static copyOf(source: Stories, mutator: (draft: MutableModel<Stories>) => MutableModel<Stories> | void): Stories;
}

export declare class Categories {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly color?: string | null;
  readonly projectsID: string;
  readonly Stories?: (Stories | null)[] | null;
  readonly templateId?: string | null;
  constructor(init: ModelInit<Categories>);
  static copyOf(source: Categories, mutator: (draft: MutableModel<Categories>) => MutableModel<Categories> | void): Categories;
}

export declare class Projects {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly icon?: string | null;
  readonly readme?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly Categories?: (Categories | null)[] | null;
  readonly Stories?: (Stories | null)[] | null;
  readonly Tags?: (Tags | null)[] | null;
  readonly Highlights?: (Highlights | null)[] | null;
  readonly Insights?: (Insights | null)[] | null;
  readonly templateId?: string | null;
  constructor(init: ModelInit<Projects>);
  static copyOf(source: Projects, mutator: (draft: MutableModel<Projects>) => MutableModel<Projects> | void): Projects;
}

export declare class Workspaces {
  readonly id: string;
  readonly tenant: string;
  readonly organisationsID?: string | null;
  readonly name: string;
  readonly color?: string | null;
  readonly logo?: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly personTemplate?: string | null;
  constructor(init: ModelInit<Workspaces>);
  static copyOf(source: Workspaces, mutator: (draft: MutableModel<Workspaces>) => MutableModel<Workspaces> | void): Workspaces;
}

export declare class Organisations {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly type?: string | null;
  readonly Workspaces?: (Workspaces | null)[] | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Organisations>);
  static copyOf(source: Organisations, mutator: (draft: MutableModel<Organisations>) => MutableModel<Organisations> | void): Organisations;
}

export declare class VodAsset {
  readonly id: string;
  readonly tenant: string;
  readonly title: string;
  readonly transcription?: Transcription | null;
  readonly video: string;
  readonly templateId?: string | null;
  readonly vodAssetTranscriptionId?: string | null;
  constructor(init: ModelInit<VodAsset>);
  static copyOf(source: VodAsset, mutator: (draft: MutableModel<VodAsset>) => MutableModel<VodAsset> | void): VodAsset;
}