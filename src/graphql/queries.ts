/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPersons = /* GraphQL */ `
  query GetPersons($id: ID!) {
    getPersons(id: $id) {
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
export const listPersons = /* GraphQL */ `
  query ListPersons(
    $filter: ModelPersonsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPersons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPersons = /* GraphQL */ `
  query SyncPersons(
    $filter: ModelPersonsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPersons(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getInsights = /* GraphQL */ `
  query GetInsights($id: ID!) {
    getInsights(id: $id) {
      id
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
export const listInsights = /* GraphQL */ `
  query ListInsights(
    $filter: ModelInsightsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInsights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        projectsID
        content
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncInsights = /* GraphQL */ `
  query SyncInsights(
    $filter: ModelInsightsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInsights(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        projectsID
        content
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getHighlights = /* GraphQL */ `
  query GetHighlights($id: ID!) {
    getHighlights(id: $id) {
      id
      type
      text
      transcriptionID
      tags {
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
export const listHighlights = /* GraphQL */ `
  query ListHighlights(
    $filter: ModelHighlightsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHighlights(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        text
        transcriptionID
        projectsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncHighlights = /* GraphQL */ `
  query SyncHighlights(
    $filter: ModelHighlightsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHighlights(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        type
        text
        transcriptionID
        projectsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTags = /* GraphQL */ `
  query GetTags($id: ID!) {
    getTags(id: $id) {
      id
      label
      projectsID
      highlights {
        nextToken
        startedAt
      }
      updatedAt
      createdAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTags = /* GraphQL */ `
  query ListTags(
    $filter: ModelTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        projectsID
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTags = /* GraphQL */ `
  query SyncTags(
    $filter: ModelTagsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        label
        projectsID
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTranscription = /* GraphQL */ `
  query GetTranscription($id: ID!) {
    getTranscription(id: $id) {
      id
      video
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
export const listTranscriptions = /* GraphQL */ `
  query ListTranscriptions(
    $filter: ModelTranscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTranscriptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        video
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTranscriptions = /* GraphQL */ `
  query SyncTranscriptions(
    $filter: ModelTranscriptionFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTranscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        video
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getStories = /* GraphQL */ `
  query GetStories($id: ID!) {
    getStories(id: $id) {
      id
      categoriesID
      projectsID
      type
      createdAt
      updatedAt
      title
      content
      transcription {
        id
        video
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
export const listStories = /* GraphQL */ `
  query ListStories(
    $filter: ModelStoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        categoriesID
        projectsID
        type
        createdAt
        updatedAt
        title
        content
        _version
        _deleted
        _lastChangedAt
        storiesTranscriptionId
        storiesParticipantsId
      }
      nextToken
      startedAt
    }
  }
`;
export const syncStories = /* GraphQL */ `
  query SyncStories(
    $filter: ModelStoriesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        categoriesID
        projectsID
        type
        createdAt
        updatedAt
        title
        content
        _version
        _deleted
        _lastChangedAt
        storiesTranscriptionId
        storiesParticipantsId
      }
      nextToken
      startedAt
    }
  }
`;
export const getCategories = /* GraphQL */ `
  query GetCategories($id: ID!) {
    getCategories(id: $id) {
      id
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
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        projectsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCategories = /* GraphQL */ `
  query SyncCategories(
    $filter: ModelCategoriesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        projectsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getProjects = /* GraphQL */ `
  query GetProjects($id: ID!) {
    getProjects(id: $id) {
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
export const listProjects = /* GraphQL */ `
  query ListProjects(
    $filter: ModelProjectsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        readme
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncProjects = /* GraphQL */ `
  query SyncProjects(
    $filter: ModelProjectsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncProjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        readme
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getWorkspaces = /* GraphQL */ `
  query GetWorkspaces($id: ID!) {
    getWorkspaces(id: $id) {
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
export const listWorkspaces = /* GraphQL */ `
  query ListWorkspaces(
    $filter: ModelWorkspacesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWorkspaces(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncWorkspaces = /* GraphQL */ `
  query SyncWorkspaces(
    $filter: ModelWorkspacesFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncWorkspaces(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getOrganisations = /* GraphQL */ `
  query GetOrganisations($id: ID!) {
    getOrganisations(id: $id) {
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
export const listOrganisations = /* GraphQL */ `
  query ListOrganisations(
    $filter: ModelOrganisationsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrganisations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncOrganisations = /* GraphQL */ `
  query SyncOrganisations(
    $filter: ModelOrganisationsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrganisations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getVodAsset = /* GraphQL */ `
  query GetVodAsset($id: ID!) {
    getVodAsset(id: $id) {
      id
      title
      description
      transcription {
        id
        video
        transcription
        content
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      video {
        id
        token
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      vodAssetTranscriptionId
      vodAssetVideoId
      owner
    }
  }
`;
export const listVodAssets = /* GraphQL */ `
  query ListVodAssets(
    $filter: ModelVodAssetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        vodAssetTranscriptionId
        vodAssetVideoId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncVodAssets = /* GraphQL */ `
  query SyncVodAssets(
    $filter: ModelVodAssetFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVodAssets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        vodAssetTranscriptionId
        vodAssetVideoId
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getVideoObject = /* GraphQL */ `
  query GetVideoObject($id: ID!) {
    getVideoObject(id: $id) {
      id
      token
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listVideoObjects = /* GraphQL */ `
  query ListVideoObjects(
    $filter: ModelVideoObjectFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoObjects(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        token
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncVideoObjects = /* GraphQL */ `
  query SyncVideoObjects(
    $filter: ModelVideoObjectFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVideoObjects(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        token
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getHighlightTags = /* GraphQL */ `
  query GetHighlightTags($id: ID!) {
    getHighlightTags(id: $id) {
      id
      highlightsID
      tagsID
      highlights {
        id
        type
        text
        transcriptionID
        projectsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      tags {
        id
        label
        projectsID
        updatedAt
        createdAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listHighlightTags = /* GraphQL */ `
  query ListHighlightTags(
    $filter: ModelHighlightTagsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHighlightTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        highlightsID
        tagsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncHighlightTags = /* GraphQL */ `
  query SyncHighlightTags(
    $filter: ModelHighlightTagsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHighlightTags(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        highlightsID
        tagsID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
