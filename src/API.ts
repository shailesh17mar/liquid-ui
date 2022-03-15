/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePersonsInput = {
  id?: string | null,
  tenant: string,
  additonalFields?: string | null,
  name?: string | null,
  email?: string | null,
  persona?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  business?: string | null,
};

export type ModelPersonsConditionInput = {
  tenant?: ModelIDInput | null,
  additonalFields?: ModelStringInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  persona?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  business?: ModelStringInput | null,
  and?: Array< ModelPersonsConditionInput | null > | null,
  or?: Array< ModelPersonsConditionInput | null > | null,
  not?: ModelPersonsConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type Persons = {
  __typename: "Persons",
  id?: string,
  tenant?: string,
  additonalFields?: string | null,
  name?: string | null,
  email?: string | null,
  persona?: string | null,
  createdAt?: string,
  updatedAt?: string,
  business?: string | null,
};

export type UpdatePersonsInput = {
  id: string,
  tenant?: string | null,
  additonalFields?: string | null,
  name?: string | null,
  email?: string | null,
  persona?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  business?: string | null,
};

export type DeletePersonsInput = {
  id: string,
};

export type CreateInsightsInput = {
  id?: string | null,
  tenant: string,
  projectsID: string,
  content?: string | null,
};

export type ModelInsightsConditionInput = {
  tenant?: ModelIDInput | null,
  projectsID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelInsightsConditionInput | null > | null,
  or?: Array< ModelInsightsConditionInput | null > | null,
  not?: ModelInsightsConditionInput | null,
};

export type Insights = {
  __typename: "Insights",
  id?: string,
  tenant?: string,
  projectsID?: string,
  content?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateInsightsInput = {
  id: string,
  tenant?: string | null,
  projectsID?: string | null,
  content?: string | null,
};

export type DeleteInsightsInput = {
  id: string,
};

export type CreateHighlightsInput = {
  id?: string | null,
  tenant: string,
  color: string,
  text: string,
  Tags?: Array< string | null > | null,
  tagIds?: string | null,
  user?: string | null,
  type: HighlightType,
  transcriptionID?: string | null,
  projectsID: string,
  storyID: string,
  startTime?: number | null,
  endTime?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export enum HighlightType {
  TRANSCRIPT = "TRANSCRIPT",
  NORMAL = "NORMAL",
}


export type ModelHighlightsConditionInput = {
  tenant?: ModelIDInput | null,
  color?: ModelStringInput | null,
  text?: ModelStringInput | null,
  Tags?: ModelStringInput | null,
  tagIds?: ModelStringInput | null,
  user?: ModelStringInput | null,
  type?: ModelHighlightTypeInput | null,
  transcriptionID?: ModelIDInput | null,
  projectsID?: ModelIDInput | null,
  storyID?: ModelIDInput | null,
  startTime?: ModelIntInput | null,
  endTime?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelHighlightsConditionInput | null > | null,
  or?: Array< ModelHighlightsConditionInput | null > | null,
  not?: ModelHighlightsConditionInput | null,
};

export type ModelHighlightTypeInput = {
  eq?: HighlightType | null,
  ne?: HighlightType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Highlights = {
  __typename: "Highlights",
  id?: string,
  tenant?: string,
  color?: string,
  text?: string,
  Tags?: Array< string | null > | null,
  tagIds?: string | null,
  user?: string | null,
  type?: HighlightType,
  transcriptionID?: string | null,
  projectsID?: string,
  storyID?: string,
  startTime?: number | null,
  endTime?: number | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateHighlightsInput = {
  id: string,
  tenant?: string | null,
  color?: string | null,
  text?: string | null,
  Tags?: Array< string | null > | null,
  tagIds?: string | null,
  user?: string | null,
  type?: HighlightType | null,
  transcriptionID?: string | null,
  projectsID?: string | null,
  storyID?: string | null,
  startTime?: number | null,
  endTime?: number | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteHighlightsInput = {
  id: string,
};

export type CreateTagsInput = {
  id?: string | null,
  tenant: string,
  label: string,
  color: string,
  projectsID: string,
  tagCategoryID?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type ModelTagsConditionInput = {
  tenant?: ModelIDInput | null,
  label?: ModelStringInput | null,
  color?: ModelStringInput | null,
  projectsID?: ModelIDInput | null,
  tagCategoryID?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTagsConditionInput | null > | null,
  or?: Array< ModelTagsConditionInput | null > | null,
  not?: ModelTagsConditionInput | null,
};

export type Tags = {
  __typename: "Tags",
  id?: string,
  tenant?: string,
  label?: string,
  color?: string,
  projectsID?: string,
  tagCategoryID?: string | null,
  tagCategory?: TagCategory,
  updatedAt?: string,
  createdAt?: string | null,
};

export type TagCategory = {
  __typename: "TagCategory",
  id?: string,
  tenant?: string,
  name?: string,
  color?: string,
  projectsID?: string,
  tags?: ModelTagsConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelTagsConnection = {
  __typename: "ModelTagsConnection",
  items?:  Array<Tags | null >,
  nextToken?: string | null,
};

export type UpdateTagsInput = {
  id: string,
  tenant?: string | null,
  label?: string | null,
  color?: string | null,
  projectsID?: string | null,
  tagCategoryID?: string | null,
  updatedAt?: string | null,
  createdAt?: string | null,
};

export type DeleteTagsInput = {
  id: string,
};

export type CreateTranscriptionInput = {
  id?: string | null,
  tenant: string,
  video: string,
  docId?: string | null,
  transcription?: string | null,
  content?: string | null,
  status: TranscriptionStatus,
};

export enum TranscriptionStatus {
  ENQUEUED = "ENQUEUED",
  COMPLETED = "COMPLETED",
  INPROGRESS = "INPROGRESS",
  FAILED = "FAILED",
}


export type ModelTranscriptionConditionInput = {
  tenant?: ModelIDInput | null,
  video?: ModelStringInput | null,
  docId?: ModelIDInput | null,
  transcription?: ModelStringInput | null,
  content?: ModelStringInput | null,
  status?: ModelTranscriptionStatusInput | null,
  and?: Array< ModelTranscriptionConditionInput | null > | null,
  or?: Array< ModelTranscriptionConditionInput | null > | null,
  not?: ModelTranscriptionConditionInput | null,
};

export type ModelTranscriptionStatusInput = {
  eq?: TranscriptionStatus | null,
  ne?: TranscriptionStatus | null,
};

export type Transcription = {
  __typename: "Transcription",
  id?: string,
  tenant?: string,
  video?: string,
  docId?: string | null,
  transcription?: string | null,
  content?: string | null,
  Highlights?: ModelHighlightsConnection,
  status?: TranscriptionStatus,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelHighlightsConnection = {
  __typename: "ModelHighlightsConnection",
  items?:  Array<Highlights | null >,
  nextToken?: string | null,
};

export type UpdateTranscriptionInput = {
  id: string,
  tenant?: string | null,
  video?: string | null,
  docId?: string | null,
  transcription?: string | null,
  content?: string | null,
  status?: TranscriptionStatus | null,
};

export type DeleteTranscriptionInput = {
  id: string,
};

export type CreateStoriesInput = {
  id?: string | null,
  tenant: string,
  categoriesID: string,
  projectsID: string,
  type: string,
  createdAt?: string | null,
  updatedAt?: string | null,
  title: string,
  content?: string | null,
  storiesTranscriptionId?: string | null,
  storiesParticipantsId?: string | null,
};

export type ModelStoriesConditionInput = {
  tenant?: ModelIDInput | null,
  categoriesID?: ModelIDInput | null,
  projectsID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelStoriesConditionInput | null > | null,
  or?: Array< ModelStoriesConditionInput | null > | null,
  not?: ModelStoriesConditionInput | null,
  storiesTranscriptionId?: ModelIDInput | null,
  storiesParticipantsId?: ModelIDInput | null,
};

export type Stories = {
  __typename: "Stories",
  id?: string,
  tenant?: string,
  categoriesID?: string,
  projectsID?: string,
  Highlights?: ModelHighlightsConnection,
  type?: string,
  createdAt?: string,
  updatedAt?: string,
  title?: string,
  content?: string | null,
  transcription?: Transcription,
  participants?: Persons,
  storiesTranscriptionId?: string | null,
  storiesParticipantsId?: string | null,
};

export type UpdateStoriesInput = {
  id: string,
  tenant?: string | null,
  categoriesID?: string | null,
  projectsID?: string | null,
  type?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  title?: string | null,
  content?: string | null,
  storiesTranscriptionId?: string | null,
  storiesParticipantsId?: string | null,
};

export type DeleteStoriesInput = {
  id: string,
};

export type CreateCategoriesInput = {
  id?: string | null,
  tenant: string,
  name: string,
  projectsID: string,
};

export type ModelCategoriesConditionInput = {
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  projectsID?: ModelIDInput | null,
  and?: Array< ModelCategoriesConditionInput | null > | null,
  or?: Array< ModelCategoriesConditionInput | null > | null,
  not?: ModelCategoriesConditionInput | null,
};

export type Categories = {
  __typename: "Categories",
  id?: string,
  tenant?: string,
  name?: string,
  projectsID?: string,
  Stories?: ModelStoriesConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelStoriesConnection = {
  __typename: "ModelStoriesConnection",
  items?:  Array<Stories | null >,
  nextToken?: string | null,
};

export type UpdateCategoriesInput = {
  id: string,
  tenant?: string | null,
  name?: string | null,
  projectsID?: string | null,
};

export type DeleteCategoriesInput = {
  id: string,
};

export type CreateProjectsInput = {
  id?: string | null,
  tenant: string,
  name: string,
  readme?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelProjectsConditionInput = {
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  readme?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProjectsConditionInput | null > | null,
  or?: Array< ModelProjectsConditionInput | null > | null,
  not?: ModelProjectsConditionInput | null,
};

export type Projects = {
  __typename: "Projects",
  id?: string,
  tenant?: string,
  name?: string,
  readme?: string | null,
  createdAt?: string,
  updatedAt?: string,
  Categories?: ModelCategoriesConnection,
  Stories?: ModelStoriesConnection,
  Tags?: ModelTagsConnection,
  Highlights?: ModelHighlightsConnection,
  Insights?: ModelInsightsConnection,
};

export type ModelCategoriesConnection = {
  __typename: "ModelCategoriesConnection",
  items?:  Array<Categories | null >,
  nextToken?: string | null,
};

export type ModelInsightsConnection = {
  __typename: "ModelInsightsConnection",
  items?:  Array<Insights | null >,
  nextToken?: string | null,
};

export type UpdateProjectsInput = {
  id: string,
  tenant?: string | null,
  name?: string | null,
  readme?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteProjectsInput = {
  id: string,
};

export type CreateWorkspacesInput = {
  id?: string | null,
  tenant: string,
  organisationsID?: string | null,
  name: string,
  color?: string | null,
  logo?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  personTemplate?: string | null,
};

export type ModelWorkspacesConditionInput = {
  tenant?: ModelIDInput | null,
  organisationsID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  personTemplate?: ModelStringInput | null,
  and?: Array< ModelWorkspacesConditionInput | null > | null,
  or?: Array< ModelWorkspacesConditionInput | null > | null,
  not?: ModelWorkspacesConditionInput | null,
};

export type Workspaces = {
  __typename: "Workspaces",
  id?: string,
  tenant?: string,
  organisationsID?: string | null,
  name?: string,
  color?: string | null,
  logo?: string | null,
  createdAt?: string,
  updatedAt?: string,
  personTemplate?: string | null,
};

export type UpdateWorkspacesInput = {
  id: string,
  tenant?: string | null,
  organisationsID?: string | null,
  name?: string | null,
  color?: string | null,
  logo?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  personTemplate?: string | null,
};

export type DeleteWorkspacesInput = {
  id: string,
};

export type CreateOrganisationsInput = {
  id?: string | null,
  tenant: string,
  name: string,
  type?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type ModelOrganisationsConditionInput = {
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelOrganisationsConditionInput | null > | null,
  or?: Array< ModelOrganisationsConditionInput | null > | null,
  not?: ModelOrganisationsConditionInput | null,
};

export type Organisations = {
  __typename: "Organisations",
  id?: string,
  tenant?: string,
  name?: string,
  type?: string | null,
  Workspaces?: ModelWorkspacesConnection,
  createdAt?: string,
  updatedAt?: string,
};

export type ModelWorkspacesConnection = {
  __typename: "ModelWorkspacesConnection",
  items?:  Array<Workspaces | null >,
  nextToken?: string | null,
};

export type UpdateOrganisationsInput = {
  id: string,
  tenant?: string | null,
  name?: string | null,
  type?: string | null,
  createdAt?: string | null,
  updatedAt?: string | null,
};

export type DeleteOrganisationsInput = {
  id: string,
};

export type CreateVodAssetInput = {
  id?: string | null,
  tenant: string,
  title: string,
  video: string,
  vodAssetTranscriptionId?: string | null,
};

export type ModelVodAssetConditionInput = {
  tenant?: ModelIDInput | null,
  title?: ModelStringInput | null,
  video?: ModelStringInput | null,
  and?: Array< ModelVodAssetConditionInput | null > | null,
  or?: Array< ModelVodAssetConditionInput | null > | null,
  not?: ModelVodAssetConditionInput | null,
  vodAssetTranscriptionId?: ModelIDInput | null,
};

export type VodAsset = {
  __typename: "VodAsset",
  id?: string,
  tenant?: string,
  title?: string,
  transcription?: Transcription,
  video?: string,
  createdAt?: string,
  updatedAt?: string,
  vodAssetTranscriptionId?: string | null,
};

export type UpdateVodAssetInput = {
  id: string,
  tenant?: string | null,
  title?: string | null,
  video?: string | null,
  vodAssetTranscriptionId?: string | null,
};

export type DeleteVodAssetInput = {
  id: string,
};

export type CreateTagCategoryInput = {
  id?: string | null,
  tenant: string,
  name: string,
  color: string,
  projectsID: string,
};

export type ModelTagCategoryConditionInput = {
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  projectsID?: ModelIDInput | null,
  and?: Array< ModelTagCategoryConditionInput | null > | null,
  or?: Array< ModelTagCategoryConditionInput | null > | null,
  not?: ModelTagCategoryConditionInput | null,
};

export type UpdateTagCategoryInput = {
  id: string,
  tenant?: string | null,
  name?: string | null,
  color?: string | null,
  projectsID?: string | null,
};

export type DeleteTagCategoryInput = {
  id: string,
};

export type ModelPersonsFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  additonalFields?: ModelStringInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  persona?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  business?: ModelStringInput | null,
  and?: Array< ModelPersonsFilterInput | null > | null,
  or?: Array< ModelPersonsFilterInput | null > | null,
  not?: ModelPersonsFilterInput | null,
};

export type ModelPersonsConnection = {
  __typename: "ModelPersonsConnection",
  items?:  Array<Persons | null >,
  nextToken?: string | null,
};

export type ModelInsightsFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  projectsID?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelInsightsFilterInput | null > | null,
  or?: Array< ModelInsightsFilterInput | null > | null,
  not?: ModelInsightsFilterInput | null,
};

export type ModelHighlightsFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  color?: ModelStringInput | null,
  text?: ModelStringInput | null,
  Tags?: ModelStringInput | null,
  tagIds?: ModelStringInput | null,
  user?: ModelStringInput | null,
  type?: ModelHighlightTypeInput | null,
  transcriptionID?: ModelIDInput | null,
  projectsID?: ModelIDInput | null,
  storyID?: ModelIDInput | null,
  startTime?: ModelIntInput | null,
  endTime?: ModelIntInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelHighlightsFilterInput | null > | null,
  or?: Array< ModelHighlightsFilterInput | null > | null,
  not?: ModelHighlightsFilterInput | null,
};

export type ModelTagsFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  label?: ModelStringInput | null,
  color?: ModelStringInput | null,
  projectsID?: ModelIDInput | null,
  tagCategoryID?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelTagsFilterInput | null > | null,
  or?: Array< ModelTagsFilterInput | null > | null,
  not?: ModelTagsFilterInput | null,
};

export type ModelTranscriptionFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  video?: ModelStringInput | null,
  docId?: ModelIDInput | null,
  transcription?: ModelStringInput | null,
  content?: ModelStringInput | null,
  status?: ModelTranscriptionStatusInput | null,
  and?: Array< ModelTranscriptionFilterInput | null > | null,
  or?: Array< ModelTranscriptionFilterInput | null > | null,
  not?: ModelTranscriptionFilterInput | null,
};

export type ModelTranscriptionConnection = {
  __typename: "ModelTranscriptionConnection",
  items?:  Array<Transcription | null >,
  nextToken?: string | null,
};

export type ModelStoriesFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  categoriesID?: ModelIDInput | null,
  projectsID?: ModelIDInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelStoriesFilterInput | null > | null,
  or?: Array< ModelStoriesFilterInput | null > | null,
  not?: ModelStoriesFilterInput | null,
  storiesTranscriptionId?: ModelIDInput | null,
  storiesParticipantsId?: ModelIDInput | null,
};

export type ModelCategoriesFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  projectsID?: ModelIDInput | null,
  and?: Array< ModelCategoriesFilterInput | null > | null,
  or?: Array< ModelCategoriesFilterInput | null > | null,
  not?: ModelCategoriesFilterInput | null,
};

export type ModelProjectsFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  readme?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelProjectsFilterInput | null > | null,
  or?: Array< ModelProjectsFilterInput | null > | null,
  not?: ModelProjectsFilterInput | null,
};

export type ModelProjectsConnection = {
  __typename: "ModelProjectsConnection",
  items?:  Array<Projects | null >,
  nextToken?: string | null,
};

export type ModelWorkspacesFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  organisationsID?: ModelIDInput | null,
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  logo?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  personTemplate?: ModelStringInput | null,
  and?: Array< ModelWorkspacesFilterInput | null > | null,
  or?: Array< ModelWorkspacesFilterInput | null > | null,
  not?: ModelWorkspacesFilterInput | null,
};

export type ModelOrganisationsFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  type?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelOrganisationsFilterInput | null > | null,
  or?: Array< ModelOrganisationsFilterInput | null > | null,
  not?: ModelOrganisationsFilterInput | null,
};

export type ModelOrganisationsConnection = {
  __typename: "ModelOrganisationsConnection",
  items?:  Array<Organisations | null >,
  nextToken?: string | null,
};

export type ModelVodAssetFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  title?: ModelStringInput | null,
  video?: ModelStringInput | null,
  and?: Array< ModelVodAssetFilterInput | null > | null,
  or?: Array< ModelVodAssetFilterInput | null > | null,
  not?: ModelVodAssetFilterInput | null,
  vodAssetTranscriptionId?: ModelIDInput | null,
};

export type ModelVodAssetConnection = {
  __typename: "ModelVodAssetConnection",
  items?:  Array<VodAsset | null >,
  nextToken?: string | null,
};

export type ModelTagCategoryFilterInput = {
  id?: ModelIDInput | null,
  tenant?: ModelIDInput | null,
  name?: ModelStringInput | null,
  color?: ModelStringInput | null,
  projectsID?: ModelIDInput | null,
  and?: Array< ModelTagCategoryFilterInput | null > | null,
  or?: Array< ModelTagCategoryFilterInput | null > | null,
  not?: ModelTagCategoryFilterInput | null,
};

export type ModelTagCategoryConnection = {
  __typename: "ModelTagCategoryConnection",
  items?:  Array<TagCategory | null >,
  nextToken?: string | null,
};

export type CreatePersonsMutationVariables = {
  input?: CreatePersonsInput,
  condition?: ModelPersonsConditionInput | null,
};

export type CreatePersonsMutation = {
  createPersons?:  {
    __typename: "Persons",
    id: string,
    tenant: string,
    additonalFields?: string | null,
    name?: string | null,
    email?: string | null,
    persona?: string | null,
    createdAt: string,
    updatedAt: string,
    business?: string | null,
  } | null,
};

export type UpdatePersonsMutationVariables = {
  input?: UpdatePersonsInput,
  condition?: ModelPersonsConditionInput | null,
};

export type UpdatePersonsMutation = {
  updatePersons?:  {
    __typename: "Persons",
    id: string,
    tenant: string,
    additonalFields?: string | null,
    name?: string | null,
    email?: string | null,
    persona?: string | null,
    createdAt: string,
    updatedAt: string,
    business?: string | null,
  } | null,
};

export type DeletePersonsMutationVariables = {
  input?: DeletePersonsInput,
  condition?: ModelPersonsConditionInput | null,
};

export type DeletePersonsMutation = {
  deletePersons?:  {
    __typename: "Persons",
    id: string,
    tenant: string,
    additonalFields?: string | null,
    name?: string | null,
    email?: string | null,
    persona?: string | null,
    createdAt: string,
    updatedAt: string,
    business?: string | null,
  } | null,
};

export type CreateInsightsMutationVariables = {
  input?: CreateInsightsInput,
  condition?: ModelInsightsConditionInput | null,
};

export type CreateInsightsMutation = {
  createInsights?:  {
    __typename: "Insights",
    id: string,
    tenant: string,
    projectsID: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateInsightsMutationVariables = {
  input?: UpdateInsightsInput,
  condition?: ModelInsightsConditionInput | null,
};

export type UpdateInsightsMutation = {
  updateInsights?:  {
    __typename: "Insights",
    id: string,
    tenant: string,
    projectsID: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteInsightsMutationVariables = {
  input?: DeleteInsightsInput,
  condition?: ModelInsightsConditionInput | null,
};

export type DeleteInsightsMutation = {
  deleteInsights?:  {
    __typename: "Insights",
    id: string,
    tenant: string,
    projectsID: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateHighlightsMutationVariables = {
  input?: CreateHighlightsInput,
  condition?: ModelHighlightsConditionInput | null,
};

export type CreateHighlightsMutation = {
  createHighlights?:  {
    __typename: "Highlights",
    id: string,
    tenant: string,
    color: string,
    text: string,
    Tags?: Array< string | null > | null,
    tagIds?: string | null,
    user?: string | null,
    type: HighlightType,
    transcriptionID?: string | null,
    projectsID: string,
    storyID: string,
    startTime?: number | null,
    endTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateHighlightsMutationVariables = {
  input?: UpdateHighlightsInput,
  condition?: ModelHighlightsConditionInput | null,
};

export type UpdateHighlightsMutation = {
  updateHighlights?:  {
    __typename: "Highlights",
    id: string,
    tenant: string,
    color: string,
    text: string,
    Tags?: Array< string | null > | null,
    tagIds?: string | null,
    user?: string | null,
    type: HighlightType,
    transcriptionID?: string | null,
    projectsID: string,
    storyID: string,
    startTime?: number | null,
    endTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteHighlightsMutationVariables = {
  input?: DeleteHighlightsInput,
  condition?: ModelHighlightsConditionInput | null,
};

export type DeleteHighlightsMutation = {
  deleteHighlights?:  {
    __typename: "Highlights",
    id: string,
    tenant: string,
    color: string,
    text: string,
    Tags?: Array< string | null > | null,
    tagIds?: string | null,
    user?: string | null,
    type: HighlightType,
    transcriptionID?: string | null,
    projectsID: string,
    storyID: string,
    startTime?: number | null,
    endTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTagsMutationVariables = {
  input?: CreateTagsInput,
  condition?: ModelTagsConditionInput | null,
};

export type CreateTagsMutation = {
  createTags?:  {
    __typename: "Tags",
    id: string,
    tenant: string,
    label: string,
    color: string,
    projectsID: string,
    tagCategoryID?: string | null,
    tagCategory:  {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
    createdAt?: string | null,
  } | null,
};

export type UpdateTagsMutationVariables = {
  input?: UpdateTagsInput,
  condition?: ModelTagsConditionInput | null,
};

export type UpdateTagsMutation = {
  updateTags?:  {
    __typename: "Tags",
    id: string,
    tenant: string,
    label: string,
    color: string,
    projectsID: string,
    tagCategoryID?: string | null,
    tagCategory:  {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
    createdAt?: string | null,
  } | null,
};

export type DeleteTagsMutationVariables = {
  input?: DeleteTagsInput,
  condition?: ModelTagsConditionInput | null,
};

export type DeleteTagsMutation = {
  deleteTags?:  {
    __typename: "Tags",
    id: string,
    tenant: string,
    label: string,
    color: string,
    projectsID: string,
    tagCategoryID?: string | null,
    tagCategory:  {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
    createdAt?: string | null,
  } | null,
};

export type CreateTranscriptionMutationVariables = {
  input?: CreateTranscriptionInput,
  condition?: ModelTranscriptionConditionInput | null,
};

export type CreateTranscriptionMutation = {
  createTranscription?:  {
    __typename: "Transcription",
    id: string,
    tenant: string,
    video: string,
    docId?: string | null,
    transcription?: string | null,
    content?: string | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    status: TranscriptionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTranscriptionMutationVariables = {
  input?: UpdateTranscriptionInput,
  condition?: ModelTranscriptionConditionInput | null,
};

export type UpdateTranscriptionMutation = {
  updateTranscription?:  {
    __typename: "Transcription",
    id: string,
    tenant: string,
    video: string,
    docId?: string | null,
    transcription?: string | null,
    content?: string | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    status: TranscriptionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTranscriptionMutationVariables = {
  input?: DeleteTranscriptionInput,
  condition?: ModelTranscriptionConditionInput | null,
};

export type DeleteTranscriptionMutation = {
  deleteTranscription?:  {
    __typename: "Transcription",
    id: string,
    tenant: string,
    video: string,
    docId?: string | null,
    transcription?: string | null,
    content?: string | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    status: TranscriptionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStoriesMutationVariables = {
  input?: CreateStoriesInput,
  condition?: ModelStoriesConditionInput | null,
};

export type CreateStoriesMutation = {
  createStories?:  {
    __typename: "Stories",
    id: string,
    tenant: string,
    categoriesID: string,
    projectsID: string,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    content?: string | null,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    participants?:  {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null,
    storiesTranscriptionId?: string | null,
    storiesParticipantsId?: string | null,
  } | null,
};

export type UpdateStoriesMutationVariables = {
  input?: UpdateStoriesInput,
  condition?: ModelStoriesConditionInput | null,
};

export type UpdateStoriesMutation = {
  updateStories?:  {
    __typename: "Stories",
    id: string,
    tenant: string,
    categoriesID: string,
    projectsID: string,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    content?: string | null,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    participants?:  {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null,
    storiesTranscriptionId?: string | null,
    storiesParticipantsId?: string | null,
  } | null,
};

export type DeleteStoriesMutationVariables = {
  input?: DeleteStoriesInput,
  condition?: ModelStoriesConditionInput | null,
};

export type DeleteStoriesMutation = {
  deleteStories?:  {
    __typename: "Stories",
    id: string,
    tenant: string,
    categoriesID: string,
    projectsID: string,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    content?: string | null,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    participants?:  {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null,
    storiesTranscriptionId?: string | null,
    storiesParticipantsId?: string | null,
  } | null,
};

export type CreateCategoriesMutationVariables = {
  input?: CreateCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type CreateCategoriesMutation = {
  createCategories?:  {
    __typename: "Categories",
    id: string,
    tenant: string,
    name: string,
    projectsID: string,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoriesMutationVariables = {
  input?: UpdateCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type UpdateCategoriesMutation = {
  updateCategories?:  {
    __typename: "Categories",
    id: string,
    tenant: string,
    name: string,
    projectsID: string,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoriesMutationVariables = {
  input?: DeleteCategoriesInput,
  condition?: ModelCategoriesConditionInput | null,
};

export type DeleteCategoriesMutation = {
  deleteCategories?:  {
    __typename: "Categories",
    id: string,
    tenant: string,
    name: string,
    projectsID: string,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateProjectsMutationVariables = {
  input?: CreateProjectsInput,
  condition?: ModelProjectsConditionInput | null,
};

export type CreateProjectsMutation = {
  createProjects?:  {
    __typename: "Projects",
    id: string,
    tenant: string,
    name: string,
    readme?: string | null,
    createdAt: string,
    updatedAt: string,
    Categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        id: string,
        tenant: string,
        name: string,
        projectsID: string,
        Stories?:  {
          __typename: "ModelStoriesConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Insights?:  {
      __typename: "ModelInsightsConnection",
      items:  Array< {
        __typename: "Insights",
        id: string,
        tenant: string,
        projectsID: string,
        content?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateProjectsMutationVariables = {
  input?: UpdateProjectsInput,
  condition?: ModelProjectsConditionInput | null,
};

export type UpdateProjectsMutation = {
  updateProjects?:  {
    __typename: "Projects",
    id: string,
    tenant: string,
    name: string,
    readme?: string | null,
    createdAt: string,
    updatedAt: string,
    Categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        id: string,
        tenant: string,
        name: string,
        projectsID: string,
        Stories?:  {
          __typename: "ModelStoriesConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Insights?:  {
      __typename: "ModelInsightsConnection",
      items:  Array< {
        __typename: "Insights",
        id: string,
        tenant: string,
        projectsID: string,
        content?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteProjectsMutationVariables = {
  input?: DeleteProjectsInput,
  condition?: ModelProjectsConditionInput | null,
};

export type DeleteProjectsMutation = {
  deleteProjects?:  {
    __typename: "Projects",
    id: string,
    tenant: string,
    name: string,
    readme?: string | null,
    createdAt: string,
    updatedAt: string,
    Categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        id: string,
        tenant: string,
        name: string,
        projectsID: string,
        Stories?:  {
          __typename: "ModelStoriesConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Insights?:  {
      __typename: "ModelInsightsConnection",
      items:  Array< {
        __typename: "Insights",
        id: string,
        tenant: string,
        projectsID: string,
        content?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateWorkspacesMutationVariables = {
  input?: CreateWorkspacesInput,
  condition?: ModelWorkspacesConditionInput | null,
};

export type CreateWorkspacesMutation = {
  createWorkspaces?:  {
    __typename: "Workspaces",
    id: string,
    tenant: string,
    organisationsID?: string | null,
    name: string,
    color?: string | null,
    logo?: string | null,
    createdAt: string,
    updatedAt: string,
    personTemplate?: string | null,
  } | null,
};

export type UpdateWorkspacesMutationVariables = {
  input?: UpdateWorkspacesInput,
  condition?: ModelWorkspacesConditionInput | null,
};

export type UpdateWorkspacesMutation = {
  updateWorkspaces?:  {
    __typename: "Workspaces",
    id: string,
    tenant: string,
    organisationsID?: string | null,
    name: string,
    color?: string | null,
    logo?: string | null,
    createdAt: string,
    updatedAt: string,
    personTemplate?: string | null,
  } | null,
};

export type DeleteWorkspacesMutationVariables = {
  input?: DeleteWorkspacesInput,
  condition?: ModelWorkspacesConditionInput | null,
};

export type DeleteWorkspacesMutation = {
  deleteWorkspaces?:  {
    __typename: "Workspaces",
    id: string,
    tenant: string,
    organisationsID?: string | null,
    name: string,
    color?: string | null,
    logo?: string | null,
    createdAt: string,
    updatedAt: string,
    personTemplate?: string | null,
  } | null,
};

export type CreateOrganisationsMutationVariables = {
  input?: CreateOrganisationsInput,
  condition?: ModelOrganisationsConditionInput | null,
};

export type CreateOrganisationsMutation = {
  createOrganisations?:  {
    __typename: "Organisations",
    id: string,
    tenant: string,
    name: string,
    type?: string | null,
    Workspaces?:  {
      __typename: "ModelWorkspacesConnection",
      items:  Array< {
        __typename: "Workspaces",
        id: string,
        tenant: string,
        organisationsID?: string | null,
        name: string,
        color?: string | null,
        logo?: string | null,
        createdAt: string,
        updatedAt: string,
        personTemplate?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateOrganisationsMutationVariables = {
  input?: UpdateOrganisationsInput,
  condition?: ModelOrganisationsConditionInput | null,
};

export type UpdateOrganisationsMutation = {
  updateOrganisations?:  {
    __typename: "Organisations",
    id: string,
    tenant: string,
    name: string,
    type?: string | null,
    Workspaces?:  {
      __typename: "ModelWorkspacesConnection",
      items:  Array< {
        __typename: "Workspaces",
        id: string,
        tenant: string,
        organisationsID?: string | null,
        name: string,
        color?: string | null,
        logo?: string | null,
        createdAt: string,
        updatedAt: string,
        personTemplate?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteOrganisationsMutationVariables = {
  input?: DeleteOrganisationsInput,
  condition?: ModelOrganisationsConditionInput | null,
};

export type DeleteOrganisationsMutation = {
  deleteOrganisations?:  {
    __typename: "Organisations",
    id: string,
    tenant: string,
    name: string,
    type?: string | null,
    Workspaces?:  {
      __typename: "ModelWorkspacesConnection",
      items:  Array< {
        __typename: "Workspaces",
        id: string,
        tenant: string,
        organisationsID?: string | null,
        name: string,
        color?: string | null,
        logo?: string | null,
        createdAt: string,
        updatedAt: string,
        personTemplate?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateVodAssetMutationVariables = {
  input?: CreateVodAssetInput,
  condition?: ModelVodAssetConditionInput | null,
};

export type CreateVodAssetMutation = {
  createVodAsset?:  {
    __typename: "VodAsset",
    id: string,
    tenant: string,
    title: string,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    video: string,
    createdAt: string,
    updatedAt: string,
    vodAssetTranscriptionId?: string | null,
  } | null,
};

export type UpdateVodAssetMutationVariables = {
  input?: UpdateVodAssetInput,
  condition?: ModelVodAssetConditionInput | null,
};

export type UpdateVodAssetMutation = {
  updateVodAsset?:  {
    __typename: "VodAsset",
    id: string,
    tenant: string,
    title: string,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    video: string,
    createdAt: string,
    updatedAt: string,
    vodAssetTranscriptionId?: string | null,
  } | null,
};

export type DeleteVodAssetMutationVariables = {
  input?: DeleteVodAssetInput,
  condition?: ModelVodAssetConditionInput | null,
};

export type DeleteVodAssetMutation = {
  deleteVodAsset?:  {
    __typename: "VodAsset",
    id: string,
    tenant: string,
    title: string,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    video: string,
    createdAt: string,
    updatedAt: string,
    vodAssetTranscriptionId?: string | null,
  } | null,
};

export type CreateTagCategoryMutationVariables = {
  input?: CreateTagCategoryInput,
  condition?: ModelTagCategoryConditionInput | null,
};

export type CreateTagCategoryMutation = {
  createTagCategory?:  {
    __typename: "TagCategory",
    id: string,
    tenant: string,
    name: string,
    color: string,
    projectsID: string,
    tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTagCategoryMutationVariables = {
  input?: UpdateTagCategoryInput,
  condition?: ModelTagCategoryConditionInput | null,
};

export type UpdateTagCategoryMutation = {
  updateTagCategory?:  {
    __typename: "TagCategory",
    id: string,
    tenant: string,
    name: string,
    color: string,
    projectsID: string,
    tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTagCategoryMutationVariables = {
  input?: DeleteTagCategoryInput,
  condition?: ModelTagCategoryConditionInput | null,
};

export type DeleteTagCategoryMutation = {
  deleteTagCategory?:  {
    __typename: "TagCategory",
    id: string,
    tenant: string,
    name: string,
    color: string,
    projectsID: string,
    tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetPersonsQueryVariables = {
  id?: string,
};

export type GetPersonsQuery = {
  getPersons?:  {
    __typename: "Persons",
    id: string,
    tenant: string,
    additonalFields?: string | null,
    name?: string | null,
    email?: string | null,
    persona?: string | null,
    createdAt: string,
    updatedAt: string,
    business?: string | null,
  } | null,
};

export type ListPersonsQueryVariables = {
  filter?: ModelPersonsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPersonsQuery = {
  listPersons?:  {
    __typename: "ModelPersonsConnection",
    items:  Array< {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetInsightsQueryVariables = {
  id?: string,
};

export type GetInsightsQuery = {
  getInsights?:  {
    __typename: "Insights",
    id: string,
    tenant: string,
    projectsID: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListInsightsQueryVariables = {
  filter?: ModelInsightsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInsightsQuery = {
  listInsights?:  {
    __typename: "ModelInsightsConnection",
    items:  Array< {
      __typename: "Insights",
      id: string,
      tenant: string,
      projectsID: string,
      content?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetHighlightsQueryVariables = {
  id?: string,
};

export type GetHighlightsQuery = {
  getHighlights?:  {
    __typename: "Highlights",
    id: string,
    tenant: string,
    color: string,
    text: string,
    Tags?: Array< string | null > | null,
    tagIds?: string | null,
    user?: string | null,
    type: HighlightType,
    transcriptionID?: string | null,
    projectsID: string,
    storyID: string,
    startTime?: number | null,
    endTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListHighlightsQueryVariables = {
  filter?: ModelHighlightsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListHighlightsQuery = {
  listHighlights?:  {
    __typename: "ModelHighlightsConnection",
    items:  Array< {
      __typename: "Highlights",
      id: string,
      tenant: string,
      color: string,
      text: string,
      Tags?: Array< string | null > | null,
      tagIds?: string | null,
      user?: string | null,
      type: HighlightType,
      transcriptionID?: string | null,
      projectsID: string,
      storyID: string,
      startTime?: number | null,
      endTime?: number | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagsQueryVariables = {
  id?: string,
};

export type GetTagsQuery = {
  getTags?:  {
    __typename: "Tags",
    id: string,
    tenant: string,
    label: string,
    color: string,
    projectsID: string,
    tagCategoryID?: string | null,
    tagCategory:  {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
    createdAt?: string | null,
  } | null,
};

export type ListTagsQueryVariables = {
  filter?: ModelTagsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagsQuery = {
  listTags?:  {
    __typename: "ModelTagsConnection",
    items:  Array< {
      __typename: "Tags",
      id: string,
      tenant: string,
      label: string,
      color: string,
      projectsID: string,
      tagCategoryID?: string | null,
      tagCategory:  {
        __typename: "TagCategory",
        id: string,
        tenant: string,
        name: string,
        color: string,
        projectsID: string,
        tags?:  {
          __typename: "ModelTagsConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      },
      updatedAt: string,
      createdAt?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTranscriptionQueryVariables = {
  id?: string,
};

export type GetTranscriptionQuery = {
  getTranscription?:  {
    __typename: "Transcription",
    id: string,
    tenant: string,
    video: string,
    docId?: string | null,
    transcription?: string | null,
    content?: string | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    status: TranscriptionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTranscriptionsQueryVariables = {
  filter?: ModelTranscriptionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTranscriptionsQuery = {
  listTranscriptions?:  {
    __typename: "ModelTranscriptionConnection",
    items:  Array< {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetStoriesQueryVariables = {
  id?: string,
};

export type GetStoriesQuery = {
  getStories?:  {
    __typename: "Stories",
    id: string,
    tenant: string,
    categoriesID: string,
    projectsID: string,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    content?: string | null,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    participants?:  {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null,
    storiesTranscriptionId?: string | null,
    storiesParticipantsId?: string | null,
  } | null,
};

export type ListStoriesQueryVariables = {
  filter?: ModelStoriesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStoriesQuery = {
  listStories?:  {
    __typename: "ModelStoriesConnection",
    items:  Array< {
      __typename: "Stories",
      id: string,
      tenant: string,
      categoriesID: string,
      projectsID: string,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      type: string,
      createdAt: string,
      updatedAt: string,
      title: string,
      content?: string | null,
      transcription?:  {
        __typename: "Transcription",
        id: string,
        tenant: string,
        video: string,
        docId?: string | null,
        transcription?: string | null,
        content?: string | null,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        status: TranscriptionStatus,
        createdAt: string,
        updatedAt: string,
      } | null,
      participants?:  {
        __typename: "Persons",
        id: string,
        tenant: string,
        additonalFields?: string | null,
        name?: string | null,
        email?: string | null,
        persona?: string | null,
        createdAt: string,
        updatedAt: string,
        business?: string | null,
      } | null,
      storiesTranscriptionId?: string | null,
      storiesParticipantsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCategoriesQueryVariables = {
  id?: string,
};

export type GetCategoriesQuery = {
  getCategories?:  {
    __typename: "Categories",
    id: string,
    tenant: string,
    name: string,
    projectsID: string,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoriesQueryVariables = {
  filter?: ModelCategoriesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoriesQuery = {
  listCategories?:  {
    __typename: "ModelCategoriesConnection",
    items:  Array< {
      __typename: "Categories",
      id: string,
      tenant: string,
      name: string,
      projectsID: string,
      Stories?:  {
        __typename: "ModelStoriesConnection",
        items:  Array< {
          __typename: "Stories",
          id: string,
          tenant: string,
          categoriesID: string,
          projectsID: string,
          type: string,
          createdAt: string,
          updatedAt: string,
          title: string,
          content?: string | null,
          storiesTranscriptionId?: string | null,
          storiesParticipantsId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetProjectsQueryVariables = {
  id?: string,
};

export type GetProjectsQuery = {
  getProjects?:  {
    __typename: "Projects",
    id: string,
    tenant: string,
    name: string,
    readme?: string | null,
    createdAt: string,
    updatedAt: string,
    Categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        id: string,
        tenant: string,
        name: string,
        projectsID: string,
        Stories?:  {
          __typename: "ModelStoriesConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Insights?:  {
      __typename: "ModelInsightsConnection",
      items:  Array< {
        __typename: "Insights",
        id: string,
        tenant: string,
        projectsID: string,
        content?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListProjectsQueryVariables = {
  filter?: ModelProjectsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProjectsQuery = {
  listProjects?:  {
    __typename: "ModelProjectsConnection",
    items:  Array< {
      __typename: "Projects",
      id: string,
      tenant: string,
      name: string,
      readme?: string | null,
      createdAt: string,
      updatedAt: string,
      Categories?:  {
        __typename: "ModelCategoriesConnection",
        items:  Array< {
          __typename: "Categories",
          id: string,
          tenant: string,
          name: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      Stories?:  {
        __typename: "ModelStoriesConnection",
        items:  Array< {
          __typename: "Stories",
          id: string,
          tenant: string,
          categoriesID: string,
          projectsID: string,
          type: string,
          createdAt: string,
          updatedAt: string,
          title: string,
          content?: string | null,
          storiesTranscriptionId?: string | null,
          storiesParticipantsId?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      Tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      Insights?:  {
        __typename: "ModelInsightsConnection",
        items:  Array< {
          __typename: "Insights",
          id: string,
          tenant: string,
          projectsID: string,
          content?: string | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetWorkspacesQueryVariables = {
  id?: string,
};

export type GetWorkspacesQuery = {
  getWorkspaces?:  {
    __typename: "Workspaces",
    id: string,
    tenant: string,
    organisationsID?: string | null,
    name: string,
    color?: string | null,
    logo?: string | null,
    createdAt: string,
    updatedAt: string,
    personTemplate?: string | null,
  } | null,
};

export type ListWorkspacesQueryVariables = {
  filter?: ModelWorkspacesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkspacesQuery = {
  listWorkspaces?:  {
    __typename: "ModelWorkspacesConnection",
    items:  Array< {
      __typename: "Workspaces",
      id: string,
      tenant: string,
      organisationsID?: string | null,
      name: string,
      color?: string | null,
      logo?: string | null,
      createdAt: string,
      updatedAt: string,
      personTemplate?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetOrganisationsQueryVariables = {
  id?: string,
};

export type GetOrganisationsQuery = {
  getOrganisations?:  {
    __typename: "Organisations",
    id: string,
    tenant: string,
    name: string,
    type?: string | null,
    Workspaces?:  {
      __typename: "ModelWorkspacesConnection",
      items:  Array< {
        __typename: "Workspaces",
        id: string,
        tenant: string,
        organisationsID?: string | null,
        name: string,
        color?: string | null,
        logo?: string | null,
        createdAt: string,
        updatedAt: string,
        personTemplate?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListOrganisationsQueryVariables = {
  filter?: ModelOrganisationsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListOrganisationsQuery = {
  listOrganisations?:  {
    __typename: "ModelOrganisationsConnection",
    items:  Array< {
      __typename: "Organisations",
      id: string,
      tenant: string,
      name: string,
      type?: string | null,
      Workspaces?:  {
        __typename: "ModelWorkspacesConnection",
        items:  Array< {
          __typename: "Workspaces",
          id: string,
          tenant: string,
          organisationsID?: string | null,
          name: string,
          color?: string | null,
          logo?: string | null,
          createdAt: string,
          updatedAt: string,
          personTemplate?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetVodAssetQueryVariables = {
  id?: string,
};

export type GetVodAssetQuery = {
  getVodAsset?:  {
    __typename: "VodAsset",
    id: string,
    tenant: string,
    title: string,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    video: string,
    createdAt: string,
    updatedAt: string,
    vodAssetTranscriptionId?: string | null,
  } | null,
};

export type ListVodAssetsQueryVariables = {
  filter?: ModelVodAssetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVodAssetsQuery = {
  listVodAssets?:  {
    __typename: "ModelVodAssetConnection",
    items:  Array< {
      __typename: "VodAsset",
      id: string,
      tenant: string,
      title: string,
      transcription?:  {
        __typename: "Transcription",
        id: string,
        tenant: string,
        video: string,
        docId?: string | null,
        transcription?: string | null,
        content?: string | null,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        status: TranscriptionStatus,
        createdAt: string,
        updatedAt: string,
      } | null,
      video: string,
      createdAt: string,
      updatedAt: string,
      vodAssetTranscriptionId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTagCategoryQueryVariables = {
  id?: string,
};

export type GetTagCategoryQuery = {
  getTagCategory?:  {
    __typename: "TagCategory",
    id: string,
    tenant: string,
    name: string,
    color: string,
    projectsID: string,
    tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTagCategoriesQueryVariables = {
  filter?: ModelTagCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTagCategoriesQuery = {
  listTagCategories?:  {
    __typename: "ModelTagCategoryConnection",
    items:  Array< {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePersonsSubscription = {
  onCreatePersons?:  {
    __typename: "Persons",
    id: string,
    tenant: string,
    additonalFields?: string | null,
    name?: string | null,
    email?: string | null,
    persona?: string | null,
    createdAt: string,
    updatedAt: string,
    business?: string | null,
  } | null,
};

export type OnUpdatePersonsSubscription = {
  onUpdatePersons?:  {
    __typename: "Persons",
    id: string,
    tenant: string,
    additonalFields?: string | null,
    name?: string | null,
    email?: string | null,
    persona?: string | null,
    createdAt: string,
    updatedAt: string,
    business?: string | null,
  } | null,
};

export type OnDeletePersonsSubscription = {
  onDeletePersons?:  {
    __typename: "Persons",
    id: string,
    tenant: string,
    additonalFields?: string | null,
    name?: string | null,
    email?: string | null,
    persona?: string | null,
    createdAt: string,
    updatedAt: string,
    business?: string | null,
  } | null,
};

export type OnCreateInsightsSubscription = {
  onCreateInsights?:  {
    __typename: "Insights",
    id: string,
    tenant: string,
    projectsID: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInsightsSubscription = {
  onUpdateInsights?:  {
    __typename: "Insights",
    id: string,
    tenant: string,
    projectsID: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInsightsSubscription = {
  onDeleteInsights?:  {
    __typename: "Insights",
    id: string,
    tenant: string,
    projectsID: string,
    content?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateHighlightsSubscription = {
  onCreateHighlights?:  {
    __typename: "Highlights",
    id: string,
    tenant: string,
    color: string,
    text: string,
    Tags?: Array< string | null > | null,
    tagIds?: string | null,
    user?: string | null,
    type: HighlightType,
    transcriptionID?: string | null,
    projectsID: string,
    storyID: string,
    startTime?: number | null,
    endTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateHighlightsSubscription = {
  onUpdateHighlights?:  {
    __typename: "Highlights",
    id: string,
    tenant: string,
    color: string,
    text: string,
    Tags?: Array< string | null > | null,
    tagIds?: string | null,
    user?: string | null,
    type: HighlightType,
    transcriptionID?: string | null,
    projectsID: string,
    storyID: string,
    startTime?: number | null,
    endTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteHighlightsSubscription = {
  onDeleteHighlights?:  {
    __typename: "Highlights",
    id: string,
    tenant: string,
    color: string,
    text: string,
    Tags?: Array< string | null > | null,
    tagIds?: string | null,
    user?: string | null,
    type: HighlightType,
    transcriptionID?: string | null,
    projectsID: string,
    storyID: string,
    startTime?: number | null,
    endTime?: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTagsSubscription = {
  onCreateTags?:  {
    __typename: "Tags",
    id: string,
    tenant: string,
    label: string,
    color: string,
    projectsID: string,
    tagCategoryID?: string | null,
    tagCategory:  {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
    createdAt?: string | null,
  } | null,
};

export type OnUpdateTagsSubscription = {
  onUpdateTags?:  {
    __typename: "Tags",
    id: string,
    tenant: string,
    label: string,
    color: string,
    projectsID: string,
    tagCategoryID?: string | null,
    tagCategory:  {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
    createdAt?: string | null,
  } | null,
};

export type OnDeleteTagsSubscription = {
  onDeleteTags?:  {
    __typename: "Tags",
    id: string,
    tenant: string,
    label: string,
    color: string,
    projectsID: string,
    tagCategoryID?: string | null,
    tagCategory:  {
      __typename: "TagCategory",
      id: string,
      tenant: string,
      name: string,
      color: string,
      projectsID: string,
      tags?:  {
        __typename: "ModelTagsConnection",
        items:  Array< {
          __typename: "Tags",
          id: string,
          tenant: string,
          label: string,
          color: string,
          projectsID: string,
          tagCategoryID?: string | null,
          updatedAt: string,
          createdAt?: string | null,
        } | null >,
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    },
    updatedAt: string,
    createdAt?: string | null,
  } | null,
};

export type OnCreateTranscriptionSubscription = {
  onCreateTranscription?:  {
    __typename: "Transcription",
    id: string,
    tenant: string,
    video: string,
    docId?: string | null,
    transcription?: string | null,
    content?: string | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    status: TranscriptionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTranscriptionSubscription = {
  onUpdateTranscription?:  {
    __typename: "Transcription",
    id: string,
    tenant: string,
    video: string,
    docId?: string | null,
    transcription?: string | null,
    content?: string | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    status: TranscriptionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTranscriptionSubscription = {
  onDeleteTranscription?:  {
    __typename: "Transcription",
    id: string,
    tenant: string,
    video: string,
    docId?: string | null,
    transcription?: string | null,
    content?: string | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    status: TranscriptionStatus,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStoriesSubscription = {
  onCreateStories?:  {
    __typename: "Stories",
    id: string,
    tenant: string,
    categoriesID: string,
    projectsID: string,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    content?: string | null,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    participants?:  {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null,
    storiesTranscriptionId?: string | null,
    storiesParticipantsId?: string | null,
  } | null,
};

export type OnUpdateStoriesSubscription = {
  onUpdateStories?:  {
    __typename: "Stories",
    id: string,
    tenant: string,
    categoriesID: string,
    projectsID: string,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    content?: string | null,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    participants?:  {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null,
    storiesTranscriptionId?: string | null,
    storiesParticipantsId?: string | null,
  } | null,
};

export type OnDeleteStoriesSubscription = {
  onDeleteStories?:  {
    __typename: "Stories",
    id: string,
    tenant: string,
    categoriesID: string,
    projectsID: string,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    type: string,
    createdAt: string,
    updatedAt: string,
    title: string,
    content?: string | null,
    transcription?:  {
      __typename: "Transcription",
      id: string,
      tenant: string,
      video: string,
      docId?: string | null,
      transcription?: string | null,
      content?: string | null,
      Highlights?:  {
        __typename: "ModelHighlightsConnection",
        items:  Array< {
          __typename: "Highlights",
          id: string,
          tenant: string,
          color: string,
          text: string,
          Tags?: Array< string | null > | null,
          tagIds?: string | null,
          user?: string | null,
          type: HighlightType,
          transcriptionID?: string | null,
          projectsID: string,
          storyID: string,
          startTime?: number | null,
          endTime?: number | null,
          createdAt: string,
          updatedAt: string,
        } | null >,
        nextToken?: string | null,
      } | null,
      status: TranscriptionStatus,
      createdAt: string,
      updatedAt: string,
    } | null,
    participants?:  {
      __typename: "Persons",
      id: string,
      tenant: string,
      additonalFields?: string | null,
      name?: string | null,
      email?: string | null,
      persona?: string | null,
      createdAt: string,
      updatedAt: string,
      business?: string | null,
    } | null,
    storiesTranscriptionId?: string | null,
    storiesParticipantsId?: string | null,
  } | null,
};

export type OnCreateCategoriesSubscription = {
  onCreateCategories?:  {
    __typename: "Categories",
    id: string,
    tenant: string,
    name: string,
    projectsID: string,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategoriesSubscription = {
  onUpdateCategories?:  {
    __typename: "Categories",
    id: string,
    tenant: string,
    name: string,
    projectsID: string,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategoriesSubscription = {
  onDeleteCategories?:  {
    __typename: "Categories",
    id: string,
    tenant: string,
    name: string,
    projectsID: string,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateProjectsSubscription = {
  onCreateProjects?:  {
    __typename: "Projects",
    id: string,
    tenant: string,
    name: string,
    readme?: string | null,
    createdAt: string,
    updatedAt: string,
    Categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        id: string,
        tenant: string,
        name: string,
        projectsID: string,
        Stories?:  {
          __typename: "ModelStoriesConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Insights?:  {
      __typename: "ModelInsightsConnection",
      items:  Array< {
        __typename: "Insights",
        id: string,
        tenant: string,
        projectsID: string,
        content?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateProjectsSubscription = {
  onUpdateProjects?:  {
    __typename: "Projects",
    id: string,
    tenant: string,
    name: string,
    readme?: string | null,
    createdAt: string,
    updatedAt: string,
    Categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        id: string,
        tenant: string,
        name: string,
        projectsID: string,
        Stories?:  {
          __typename: "ModelStoriesConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Insights?:  {
      __typename: "ModelInsightsConnection",
      items:  Array< {
        __typename: "Insights",
        id: string,
        tenant: string,
        projectsID: string,
        content?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteProjectsSubscription = {
  onDeleteProjects?:  {
    __typename: "Projects",
    id: string,
    tenant: string,
    name: string,
    readme?: string | null,
    createdAt: string,
    updatedAt: string,
    Categories?:  {
      __typename: "ModelCategoriesConnection",
      items:  Array< {
        __typename: "Categories",
        id: string,
        tenant: string,
        name: string,
        projectsID: string,
        Stories?:  {
          __typename: "ModelStoriesConnection",
          nextToken?: string | null,
        } | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Stories?:  {
      __typename: "ModelStoriesConnection",
      items:  Array< {
        __typename: "Stories",
        id: string,
        tenant: string,
        categoriesID: string,
        projectsID: string,
        Highlights?:  {
          __typename: "ModelHighlightsConnection",
          nextToken?: string | null,
        } | null,
        type: string,
        createdAt: string,
        updatedAt: string,
        title: string,
        content?: string | null,
        transcription?:  {
          __typename: "Transcription",
          id: string,
          tenant: string,
          video: string,
          docId?: string | null,
          transcription?: string | null,
          content?: string | null,
          status: TranscriptionStatus,
          createdAt: string,
          updatedAt: string,
        } | null,
        participants?:  {
          __typename: "Persons",
          id: string,
          tenant: string,
          additonalFields?: string | null,
          name?: string | null,
          email?: string | null,
          persona?: string | null,
          createdAt: string,
          updatedAt: string,
          business?: string | null,
        } | null,
        storiesTranscriptionId?: string | null,
        storiesParticipantsId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    Highlights?:  {
      __typename: "ModelHighlightsConnection",
      items:  Array< {
        __typename: "Highlights",
        id: string,
        tenant: string,
        color: string,
        text: string,
        Tags?: Array< string | null > | null,
        tagIds?: string | null,
        user?: string | null,
        type: HighlightType,
        transcriptionID?: string | null,
        projectsID: string,
        storyID: string,
        startTime?: number | null,
        endTime?: number | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
    Insights?:  {
      __typename: "ModelInsightsConnection",
      items:  Array< {
        __typename: "Insights",
        id: string,
        tenant: string,
        projectsID: string,
        content?: string | null,
        createdAt: string,
        updatedAt: string,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateWorkspacesSubscription = {
  onCreateWorkspaces?:  {
    __typename: "Workspaces",
    id: string,
    tenant: string,
    organisationsID?: string | null,
    name: string,
    color?: string | null,
    logo?: string | null,
    createdAt: string,
    updatedAt: string,
    personTemplate?: string | null,
  } | null,
};

export type OnUpdateWorkspacesSubscription = {
  onUpdateWorkspaces?:  {
    __typename: "Workspaces",
    id: string,
    tenant: string,
    organisationsID?: string | null,
    name: string,
    color?: string | null,
    logo?: string | null,
    createdAt: string,
    updatedAt: string,
    personTemplate?: string | null,
  } | null,
};

export type OnDeleteWorkspacesSubscription = {
  onDeleteWorkspaces?:  {
    __typename: "Workspaces",
    id: string,
    tenant: string,
    organisationsID?: string | null,
    name: string,
    color?: string | null,
    logo?: string | null,
    createdAt: string,
    updatedAt: string,
    personTemplate?: string | null,
  } | null,
};

export type OnCreateOrganisationsSubscription = {
  onCreateOrganisations?:  {
    __typename: "Organisations",
    id: string,
    tenant: string,
    name: string,
    type?: string | null,
    Workspaces?:  {
      __typename: "ModelWorkspacesConnection",
      items:  Array< {
        __typename: "Workspaces",
        id: string,
        tenant: string,
        organisationsID?: string | null,
        name: string,
        color?: string | null,
        logo?: string | null,
        createdAt: string,
        updatedAt: string,
        personTemplate?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateOrganisationsSubscription = {
  onUpdateOrganisations?:  {
    __typename: "Organisations",
    id: string,
    tenant: string,
    name: string,
    type?: string | null,
    Workspaces?:  {
      __typename: "ModelWorkspacesConnection",
      items:  Array< {
        __typename: "Workspaces",
        id: string,
        tenant: string,
        organisationsID?: string | null,
        name: string,
        color?: string | null,
        logo?: string | null,
        createdAt: string,
        updatedAt: string,
        personTemplate?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteOrganisationsSubscription = {
  onDeleteOrganisations?:  {
    __typename: "Organisations",
    id: string,
    tenant: string,
    name: string,
    type?: string | null,
    Workspaces?:  {
      __typename: "ModelWorkspacesConnection",
      items:  Array< {
        __typename: "Workspaces",
        id: string,
        tenant: string,
        organisationsID?: string | null,
        name: string,
        color?: string | null,
        logo?: string | null,
        createdAt: string,
        updatedAt: string,
        personTemplate?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTagCategorySubscription = {
  onCreateTagCategory?:  {
    __typename: "TagCategory",
    id: string,
    tenant: string,
    name: string,
    color: string,
    projectsID: string,
    tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTagCategorySubscription = {
  onUpdateTagCategory?:  {
    __typename: "TagCategory",
    id: string,
    tenant: string,
    name: string,
    color: string,
    projectsID: string,
    tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTagCategorySubscription = {
  onDeleteTagCategory?:  {
    __typename: "TagCategory",
    id: string,
    tenant: string,
    name: string,
    color: string,
    projectsID: string,
    tags?:  {
      __typename: "ModelTagsConnection",
      items:  Array< {
        __typename: "Tags",
        id: string,
        tenant: string,
        label: string,
        color: string,
        projectsID: string,
        tagCategoryID?: string | null,
        tagCategory:  {
          __typename: "TagCategory",
          id: string,
          tenant: string,
          name: string,
          color: string,
          projectsID: string,
          createdAt: string,
          updatedAt: string,
        },
        updatedAt: string,
        createdAt?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
