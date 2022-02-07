import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum TranscriptionStatus {
  ENQUEUED = "ENQUEUED",
  COMPLETED = "COMPLETED",
  INPROGRESS = "INPROGRESS",
  FAILED = "FAILED"
}



export declare class Persons {
  readonly id: string;
  readonly tenant: string;
  readonly additonalFields?: string;
  readonly name?: string;
  readonly email?: string;
  readonly persona?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly business?: string;
  constructor(init: ModelInit<Persons>);
  static copyOf(source: Persons, mutator: (draft: MutableModel<Persons>) => MutableModel<Persons> | void): Persons;
}

export declare class Insights {
  readonly id: string;
  readonly tenant: string;
  readonly projectsID: string;
  readonly content?: string;
  constructor(init: ModelInit<Insights>);
  static copyOf(source: Insights, mutator: (draft: MutableModel<Insights>) => MutableModel<Insights> | void): Insights;
}

export declare class Highlights {
  readonly id: string;
  readonly tenant: string;
  readonly type: string;
  readonly text: string;
  readonly Tags?: (string | null)[];
  readonly tagIds?: string;
  readonly transcriptionID: string;
  readonly projectsID: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Highlights>);
  static copyOf(source: Highlights, mutator: (draft: MutableModel<Highlights>) => MutableModel<Highlights> | void): Highlights;
}

export declare class Tags {
  readonly id: string;
  readonly tenant: string;
  readonly label: string;
  readonly projectsID: string;
  readonly updatedAt: string;
  readonly createdAt?: string;
  constructor(init: ModelInit<Tags>);
  static copyOf(source: Tags, mutator: (draft: MutableModel<Tags>) => MutableModel<Tags> | void): Tags;
}

export declare class Transcription {
  readonly id: string;
  readonly tenant: string;
  readonly video: string;
  readonly transcription?: string;
  readonly content?: string;
  readonly Highlights?: (Highlights | null)[];
  readonly status: TranscriptionStatus | keyof typeof TranscriptionStatus;
  constructor(init: ModelInit<Transcription>);
  static copyOf(source: Transcription, mutator: (draft: MutableModel<Transcription>) => MutableModel<Transcription> | void): Transcription;
}

export declare class Stories {
  readonly id: string;
  readonly tenant: string;
  readonly categoriesID: string;
  readonly projectsID: string;
  readonly type: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly title: string;
  readonly content?: string;
  readonly transcription?: Transcription;
  readonly participants?: Persons;
  readonly storiesTranscriptionId?: string;
  readonly storiesParticipantsId?: string;
  constructor(init: ModelInit<Stories>);
  static copyOf(source: Stories, mutator: (draft: MutableModel<Stories>) => MutableModel<Stories> | void): Stories;
}

export declare class Categories {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly projectsID: string;
  readonly Stories?: (Stories | null)[];
  constructor(init: ModelInit<Categories>);
  static copyOf(source: Categories, mutator: (draft: MutableModel<Categories>) => MutableModel<Categories> | void): Categories;
}

export declare class Projects {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly readme?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly Categories?: (Categories | null)[];
  readonly Stories?: (Stories | null)[];
  readonly Tags?: (Tags | null)[];
  readonly Highlights?: (Highlights | null)[];
  readonly Insights?: (Insights | null)[];
  constructor(init: ModelInit<Projects>);
  static copyOf(source: Projects, mutator: (draft: MutableModel<Projects>) => MutableModel<Projects> | void): Projects;
}

export declare class Workspaces {
  readonly id: string;
  readonly tenant: string;
  readonly organisationsID?: string;
  readonly name: string;
  readonly color?: string;
  readonly logo?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly personTemplate?: string;
  constructor(init: ModelInit<Workspaces>);
  static copyOf(source: Workspaces, mutator: (draft: MutableModel<Workspaces>) => MutableModel<Workspaces> | void): Workspaces;
}

export declare class Organisations {
  readonly id: string;
  readonly tenant: string;
  readonly name: string;
  readonly type?: string;
  readonly Workspaces?: (Workspaces | null)[];
  readonly createdAt: string;
  readonly updatedAt: string;
  constructor(init: ModelInit<Organisations>);
  static copyOf(source: Organisations, mutator: (draft: MutableModel<Organisations>) => MutableModel<Organisations> | void): Organisations;
}

export declare class VodAsset {
  readonly id: string;
  readonly tenant: string;
  readonly title: string;
  readonly transcription?: Transcription;
  readonly video: string;
  readonly vodAssetTranscriptionId?: string;
  constructor(init: ModelInit<VodAsset>);
  static copyOf(source: VodAsset, mutator: (draft: MutableModel<VodAsset>) => MutableModel<VodAsset> | void): VodAsset;
}