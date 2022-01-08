/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInsights = /* GraphQL */ `
  mutation CreateInsights(
    $input: CreateInsightsInput!
    $condition: ModelInsightsConditionInput
  ) {
    createInsights(input: $input, condition: $condition) {
      id
      projectsID
      content
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateInsights = /* GraphQL */ `
  mutation UpdateInsights(
    $input: UpdateInsightsInput!
    $condition: ModelInsightsConditionInput
  ) {
    updateInsights(input: $input, condition: $condition) {
      id
      projectsID
      content
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteInsights = /* GraphQL */ `
  mutation DeleteInsights(
    $input: DeleteInsightsInput!
    $condition: ModelInsightsConditionInput
  ) {
    deleteInsights(input: $input, condition: $condition) {
      id
      projectsID
      content
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createHighlights = /* GraphQL */ `
  mutation CreateHighlights(
    $input: CreateHighlightsInput!
    $condition: ModelHighlightsConditionInput
  ) {
    createHighlights(input: $input, condition: $condition) {
      id
      type
      transcriptionID
      Tags {
        nextToken
        startedAt
      }
      projectsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateHighlights = /* GraphQL */ `
  mutation UpdateHighlights(
    $input: UpdateHighlightsInput!
    $condition: ModelHighlightsConditionInput
  ) {
    updateHighlights(input: $input, condition: $condition) {
      id
      type
      transcriptionID
      Tags {
        nextToken
        startedAt
      }
      projectsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteHighlights = /* GraphQL */ `
  mutation DeleteHighlights(
    $input: DeleteHighlightsInput!
    $condition: ModelHighlightsConditionInput
  ) {
    deleteHighlights(input: $input, condition: $condition) {
      id
      type
      transcriptionID
      Tags {
        nextToken
        startedAt
      }
      projectsID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTags = /* GraphQL */ `
  mutation CreateTags(
    $input: CreateTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    createTags(input: $input, condition: $condition) {
      id
      label
      projectsID
      storiesID
      transcriptionID
      highlightsID
      updatedAt
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTags = /* GraphQL */ `
  mutation UpdateTags(
    $input: UpdateTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    updateTags(input: $input, condition: $condition) {
      id
      label
      projectsID
      storiesID
      transcriptionID
      highlightsID
      updatedAt
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTags = /* GraphQL */ `
  mutation DeleteTags(
    $input: DeleteTagsInput!
    $condition: ModelTagsConditionInput
  ) {
    deleteTags(input: $input, condition: $condition) {
      id
      label
      projectsID
      storiesID
      transcriptionID
      highlightsID
      updatedAt
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTranscription = /* GraphQL */ `
  mutation CreateTranscription(
    $input: CreateTranscriptionInput!
    $condition: ModelTranscriptionConditionInput
  ) {
    createTranscription(input: $input, condition: $condition) {
      id
      video
      transcription
      content
      Highlights {
        nextToken
        startedAt
      }
      Tags {
        nextToken
        startedAt
      }
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateTranscription = /* GraphQL */ `
  mutation UpdateTranscription(
    $input: UpdateTranscriptionInput!
    $condition: ModelTranscriptionConditionInput
  ) {
    updateTranscription(input: $input, condition: $condition) {
      id
      video
      transcription
      content
      Highlights {
        nextToken
        startedAt
      }
      Tags {
        nextToken
        startedAt
      }
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteTranscription = /* GraphQL */ `
  mutation DeleteTranscription(
    $input: DeleteTranscriptionInput!
    $condition: ModelTranscriptionConditionInput
  ) {
    deleteTranscription(input: $input, condition: $condition) {
      id
      video
      transcription
      content
      Highlights {
        nextToken
        startedAt
      }
      Tags {
        nextToken
        startedAt
      }
      status
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createStories = /* GraphQL */ `
  mutation CreateStories(
    $input: CreateStoriesInput!
    $condition: ModelStoriesConditionInput
  ) {
    createStories(input: $input, condition: $condition) {
      id
      categoriesID
      projectsID
      type
      createdAt
      updatedAt
      tags {
        nextToken
        startedAt
      }
      title
      content
      transcription {
        id
        video
        transcription
        content
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      participants {
        id
        additonalFields
        name
        email
        persona
        createdAt
        updatedAt
        business
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const updateStories = /* GraphQL */ `
  mutation UpdateStories(
    $input: UpdateStoriesInput!
    $condition: ModelStoriesConditionInput
  ) {
    updateStories(input: $input, condition: $condition) {
      id
      categoriesID
      projectsID
      type
      createdAt
      updatedAt
      tags {
        nextToken
        startedAt
      }
      title
      content
      transcription {
        id
        video
        transcription
        content
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      participants {
        id
        additonalFields
        name
        email
        persona
        createdAt
        updatedAt
        business
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const deleteStories = /* GraphQL */ `
  mutation DeleteStories(
    $input: DeleteStoriesInput!
    $condition: ModelStoriesConditionInput
  ) {
    deleteStories(input: $input, condition: $condition) {
      id
      categoriesID
      projectsID
      type
      createdAt
      updatedAt
      tags {
        nextToken
        startedAt
      }
      title
      content
      transcription {
        id
        video
        transcription
        content
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      participants {
        id
        additonalFields
        name
        email
        persona
        createdAt
        updatedAt
        business
        _version
        _deleted
        _lastChangedAt
      }
    }
  }
`;
export const createCategories = /* GraphQL */ `
  mutation CreateCategories(
    $input: CreateCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    createCategories(input: $input, condition: $condition) {
      id
      name
      projectsID
      Stories {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateCategories = /* GraphQL */ `
  mutation UpdateCategories(
    $input: UpdateCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    updateCategories(input: $input, condition: $condition) {
      id
      name
      projectsID
      Stories {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategories = /* GraphQL */ `
  mutation DeleteCategories(
    $input: DeleteCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    deleteCategories(input: $input, condition: $condition) {
      id
      name
      projectsID
      Stories {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createProjects = /* GraphQL */ `
  mutation CreateProjects(
    $input: CreateProjectsInput!
    $condition: ModelProjectsConditionInput
  ) {
    createProjects(input: $input, condition: $condition) {
      id
      name
      readme
      createdAt
      updatedAt
      Categories {
        nextToken
        startedAt
      }
      Stories {
        nextToken
        startedAt
      }
      Tags {
        nextToken
        startedAt
      }
      Highlights {
        nextToken
        startedAt
      }
      Insights {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateProjects = /* GraphQL */ `
  mutation UpdateProjects(
    $input: UpdateProjectsInput!
    $condition: ModelProjectsConditionInput
  ) {
    updateProjects(input: $input, condition: $condition) {
      id
      name
      readme
      createdAt
      updatedAt
      Categories {
        nextToken
        startedAt
      }
      Stories {
        nextToken
        startedAt
      }
      Tags {
        nextToken
        startedAt
      }
      Highlights {
        nextToken
        startedAt
      }
      Insights {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteProjects = /* GraphQL */ `
  mutation DeleteProjects(
    $input: DeleteProjectsInput!
    $condition: ModelProjectsConditionInput
  ) {
    deleteProjects(input: $input, condition: $condition) {
      id
      name
      readme
      createdAt
      updatedAt
      Categories {
        nextToken
        startedAt
      }
      Stories {
        nextToken
        startedAt
      }
      Tags {
        nextToken
        startedAt
      }
      Highlights {
        nextToken
        startedAt
      }
      Insights {
        nextToken
        startedAt
      }
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createWorkspaces = /* GraphQL */ `
  mutation CreateWorkspaces(
    $input: CreateWorkspacesInput!
    $condition: ModelWorkspacesConditionInput
  ) {
    createWorkspaces(input: $input, condition: $condition) {
      id
      organisationsID
      name
      color
      logo
      createdAt
      updatedAt
      personTemplate
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateWorkspaces = /* GraphQL */ `
  mutation UpdateWorkspaces(
    $input: UpdateWorkspacesInput!
    $condition: ModelWorkspacesConditionInput
  ) {
    updateWorkspaces(input: $input, condition: $condition) {
      id
      organisationsID
      name
      color
      logo
      createdAt
      updatedAt
      personTemplate
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteWorkspaces = /* GraphQL */ `
  mutation DeleteWorkspaces(
    $input: DeleteWorkspacesInput!
    $condition: ModelWorkspacesConditionInput
  ) {
    deleteWorkspaces(input: $input, condition: $condition) {
      id
      organisationsID
      name
      color
      logo
      createdAt
      updatedAt
      personTemplate
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createOrganisations = /* GraphQL */ `
  mutation CreateOrganisations(
    $input: CreateOrganisationsInput!
    $condition: ModelOrganisationsConditionInput
  ) {
    createOrganisations(input: $input, condition: $condition) {
      id
      name
      type
      Workspaces {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateOrganisations = /* GraphQL */ `
  mutation UpdateOrganisations(
    $input: UpdateOrganisationsInput!
    $condition: ModelOrganisationsConditionInput
  ) {
    updateOrganisations(input: $input, condition: $condition) {
      id
      name
      type
      Workspaces {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteOrganisations = /* GraphQL */ `
  mutation DeleteOrganisations(
    $input: DeleteOrganisationsInput!
    $condition: ModelOrganisationsConditionInput
  ) {
    deleteOrganisations(input: $input, condition: $condition) {
      id
      name
      type
      Workspaces {
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createVodAsset = /* GraphQL */ `
  mutation CreateVodAsset(
    $input: CreateVodAssetInput!
    $condition: ModelVodAssetConditionInput
  ) {
    createVodAsset(input: $input, condition: $condition) {
      id
      title
      description
      transcription {
        id
        video
        transcription
        content
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      video {
        id
        token
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateVodAsset = /* GraphQL */ `
  mutation UpdateVodAsset(
    $input: UpdateVodAssetInput!
    $condition: ModelVodAssetConditionInput
  ) {
    updateVodAsset(input: $input, condition: $condition) {
      id
      title
      description
      transcription {
        id
        video
        transcription
        content
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      video {
        id
        token
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteVodAsset = /* GraphQL */ `
  mutation DeleteVodAsset(
    $input: DeleteVodAssetInput!
    $condition: ModelVodAssetConditionInput
  ) {
    deleteVodAsset(input: $input, condition: $condition) {
      id
      title
      description
      transcription {
        id
        video
        transcription
        content
        status
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      video {
        id
        token
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createVideoObject = /* GraphQL */ `
  mutation CreateVideoObject(
    $input: CreateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    createVideoObject(input: $input, condition: $condition) {
      id
      token
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateVideoObject = /* GraphQL */ `
  mutation UpdateVideoObject(
    $input: UpdateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    updateVideoObject(input: $input, condition: $condition) {
      id
      token
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteVideoObject = /* GraphQL */ `
  mutation DeleteVideoObject(
    $input: DeleteVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    deleteVideoObject(input: $input, condition: $condition) {
      id
      token
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createPersons = /* GraphQL */ `
  mutation CreatePersons(
    $input: CreatePersonsInput!
    $condition: ModelPersonsConditionInput
  ) {
    createPersons(input: $input, condition: $condition) {
      id
      additonalFields
      name
      email
      persona
      createdAt
      updatedAt
      business
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePersons = /* GraphQL */ `
  mutation UpdatePersons(
    $input: UpdatePersonsInput!
    $condition: ModelPersonsConditionInput
  ) {
    updatePersons(input: $input, condition: $condition) {
      id
      additonalFields
      name
      email
      persona
      createdAt
      updatedAt
      business
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePersons = /* GraphQL */ `
  mutation DeletePersons(
    $input: DeletePersonsInput!
    $condition: ModelPersonsConditionInput
  ) {
    deletePersons(input: $input, condition: $condition) {
      id
      additonalFields
      name
      email
      persona
      createdAt
      updatedAt
      business
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
