/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPersons = /* GraphQL */ `
  mutation CreatePersons(
    $input: CreatePersonsInput!
    $condition: ModelPersonsConditionInput
  ) {
    createPersons(input: $input, condition: $condition) {
      id
      tenant
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
      tenant
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
      tenant
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
export const createInsights = /* GraphQL */ `
  mutation CreateInsights(
    $input: CreateInsightsInput!
    $condition: ModelInsightsConditionInput
  ) {
    createInsights(input: $input, condition: $condition) {
      id
      tenant
      projectsID
      content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      tenant
      projectsID
      content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      tenant
      projectsID
      content
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      tenant
      type
      text
      Tags
      tagIds
      transcriptionID
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
      tenant
      type
      text
      Tags
      tagIds
      transcriptionID
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
      tenant
      type
      text
      Tags
      tagIds
      transcriptionID
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
      tenant
      label
      projectsID
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
      tenant
      label
      projectsID
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
      tenant
      label
      projectsID
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
      tenant
      video
      docId
      transcription
      content
      Highlights {
        nextToken
        startedAt
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      tenant
      video
      docId
      transcription
      content
      Highlights {
        nextToken
        startedAt
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      tenant
      video
      docId
      transcription
      content
      Highlights {
        nextToken
        startedAt
      }
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      tenant
      categoriesID
      projectsID
      type
      createdAt
      updatedAt
      title
      content
      transcription {
        id
        tenant
        video
        docId
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      participants {
        id
        tenant
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
      _version
      _deleted
      _lastChangedAt
      storiesTranscriptionId
      storiesParticipantsId
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
      tenant
      categoriesID
      projectsID
      type
      createdAt
      updatedAt
      title
      content
      transcription {
        id
        tenant
        video
        docId
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      participants {
        id
        tenant
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
      _version
      _deleted
      _lastChangedAt
      storiesTranscriptionId
      storiesParticipantsId
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
      tenant
      categoriesID
      projectsID
      type
      createdAt
      updatedAt
      title
      content
      transcription {
        id
        tenant
        video
        docId
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      participants {
        id
        tenant
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
      _version
      _deleted
      _lastChangedAt
      storiesTranscriptionId
      storiesParticipantsId
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
      tenant
      name
      projectsID
      Stories {
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
export const updateCategories = /* GraphQL */ `
  mutation UpdateCategories(
    $input: UpdateCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    updateCategories(input: $input, condition: $condition) {
      id
      tenant
      name
      projectsID
      Stories {
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
export const deleteCategories = /* GraphQL */ `
  mutation DeleteCategories(
    $input: DeleteCategoriesInput!
    $condition: ModelCategoriesConditionInput
  ) {
    deleteCategories(input: $input, condition: $condition) {
      id
      tenant
      name
      projectsID
      Stories {
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
export const createProjects = /* GraphQL */ `
  mutation CreateProjects(
    $input: CreateProjectsInput!
    $condition: ModelProjectsConditionInput
  ) {
    createProjects(input: $input, condition: $condition) {
      id
      tenant
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
      tenant
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
      tenant
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
      tenant
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
      tenant
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
      tenant
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
      tenant
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
      tenant
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
      tenant
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
      tenant
      title
      transcription {
        id
        tenant
        video
        docId
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      video
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      vodAssetTranscriptionId
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
      tenant
      title
      transcription {
        id
        tenant
        video
        docId
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      video
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      vodAssetTranscriptionId
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
      tenant
      title
      transcription {
        id
        tenant
        video
        docId
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      video
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      vodAssetTranscriptionId
    }
  }
`;
