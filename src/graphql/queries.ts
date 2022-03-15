/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPersons = /* GraphQL */ `
  query GetPersons($id: ID!) {
    getPersons(id: $id) {
      id
      tenant
      additonalFields
      name
      email
      persona
      createdAt
      updatedAt
      business
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
        tenant
        additonalFields
        name
        email
        persona
        createdAt
        updatedAt
        business
      }
      nextToken
    }
  }
`;
export const getInsights = /* GraphQL */ `
  query GetInsights($id: ID!) {
    getInsights(id: $id) {
      id
      tenant
      projectsID
      content
      createdAt
      updatedAt
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
        tenant
        projectsID
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHighlights = /* GraphQL */ `
  query GetHighlights($id: ID!) {
    getHighlights(id: $id) {
      id
      tenant
      color
      text
      Tags
      tagIds
      user
      type
      transcriptionID
      projectsID
      storyID
      startTime
      endTime
      createdAt
      updatedAt
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
        tenant
        color
        text
        Tags
        tagIds
        user
        type
        transcriptionID
        projectsID
        storyID
        startTime
        endTime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTags = /* GraphQL */ `
  query GetTags($id: ID!) {
    getTags(id: $id) {
      id
      tenant
      label
      color
      projectsID
      tagCategoryID
      tagCategory {
        id
        tenant
        name
        color
        projectsID
        tags {
          items {
            id
            tenant
            label
            color
            projectsID
            tagCategoryID
            updatedAt
            createdAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
      createdAt
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
        tenant
        label
        color
        projectsID
        tagCategoryID
        tagCategory {
          id
          tenant
          name
          color
          projectsID
          tags {
            nextToken
          }
          createdAt
          updatedAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getTranscription = /* GraphQL */ `
  query GetTranscription($id: ID!) {
    getTranscription(id: $id) {
      id
      tenant
      video
      docId
      transcription
      content
      Highlights {
        items {
          id
          tenant
          color
          text
          Tags
          tagIds
          user
          type
          transcriptionID
          projectsID
          storyID
          startTime
          endTime
          createdAt
          updatedAt
        }
        nextToken
      }
      status
      createdAt
      updatedAt
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
        tenant
        video
        docId
        transcription
        content
        Highlights {
          items {
            id
            tenant
            color
            text
            Tags
            tagIds
            user
            type
            transcriptionID
            projectsID
            storyID
            startTime
            endTime
            createdAt
            updatedAt
          }
          nextToken
        }
        status
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getStories = /* GraphQL */ `
  query GetStories($id: ID!) {
    getStories(id: $id) {
      id
      tenant
      icon
      categoriesID
      projectsID
      Highlights {
        items {
          id
          tenant
          color
          text
          Tags
          tagIds
          user
          type
          transcriptionID
          projectsID
          storyID
          startTime
          endTime
          createdAt
          updatedAt
        }
        nextToken
      }
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
        Highlights {
          items {
            id
            tenant
            color
            text
            Tags
            tagIds
            user
            type
            transcriptionID
            projectsID
            storyID
            startTime
            endTime
            createdAt
            updatedAt
          }
          nextToken
        }
        status
        createdAt
        updatedAt
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
      }
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
        tenant
        icon
        categoriesID
        projectsID
        Highlights {
          items {
            id
            tenant
            color
            text
            Tags
            tagIds
            user
            type
            transcriptionID
            projectsID
            storyID
            startTime
            endTime
            createdAt
            updatedAt
          }
          nextToken
        }
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
          Highlights {
            nextToken
          }
          status
          createdAt
          updatedAt
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
        }
        storiesTranscriptionId
        storiesParticipantsId
      }
      nextToken
    }
  }
`;
export const getCategories = /* GraphQL */ `
  query GetCategories($id: ID!) {
    getCategories(id: $id) {
      id
      tenant
      name
      projectsID
      Stories {
        items {
          id
          tenant
          icon
          categoriesID
          projectsID
          Highlights {
            nextToken
          }
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
          }
          storiesTranscriptionId
          storiesParticipantsId
        }
        nextToken
      }
      createdAt
      updatedAt
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
        tenant
        name
        projectsID
        Stories {
          items {
            id
            tenant
            icon
            categoriesID
            projectsID
            type
            createdAt
            updatedAt
            title
            content
            storiesTranscriptionId
            storiesParticipantsId
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getProjects = /* GraphQL */ `
  query GetProjects($id: ID!) {
    getProjects(id: $id) {
      id
      tenant
      name
      icon
      readme
      createdAt
      updatedAt
      Categories {
        items {
          id
          tenant
          name
          projectsID
          Stories {
            nextToken
          }
          createdAt
          updatedAt
        }
        nextToken
      }
      Stories {
        items {
          id
          tenant
          icon
          categoriesID
          projectsID
          Highlights {
            nextToken
          }
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
          }
          storiesTranscriptionId
          storiesParticipantsId
        }
        nextToken
      }
      Tags {
        items {
          id
          tenant
          label
          color
          projectsID
          tagCategoryID
          tagCategory {
            id
            tenant
            name
            color
            projectsID
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
        }
        nextToken
      }
      Highlights {
        items {
          id
          tenant
          color
          text
          Tags
          tagIds
          user
          type
          transcriptionID
          projectsID
          storyID
          startTime
          endTime
          createdAt
          updatedAt
        }
        nextToken
      }
      Insights {
        items {
          id
          tenant
          projectsID
          content
          createdAt
          updatedAt
        }
        nextToken
      }
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
        tenant
        name
        icon
        readme
        createdAt
        updatedAt
        Categories {
          items {
            id
            tenant
            name
            projectsID
            createdAt
            updatedAt
          }
          nextToken
        }
        Stories {
          items {
            id
            tenant
            icon
            categoriesID
            projectsID
            type
            createdAt
            updatedAt
            title
            content
            storiesTranscriptionId
            storiesParticipantsId
          }
          nextToken
        }
        Tags {
          items {
            id
            tenant
            label
            color
            projectsID
            tagCategoryID
            updatedAt
            createdAt
          }
          nextToken
        }
        Highlights {
          items {
            id
            tenant
            color
            text
            Tags
            tagIds
            user
            type
            transcriptionID
            projectsID
            storyID
            startTime
            endTime
            createdAt
            updatedAt
          }
          nextToken
        }
        Insights {
          items {
            id
            tenant
            projectsID
            content
            createdAt
            updatedAt
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getWorkspaces = /* GraphQL */ `
  query GetWorkspaces($id: ID!) {
    getWorkspaces(id: $id) {
      id
      tenant
      organisationsID
      name
      color
      logo
      createdAt
      updatedAt
      personTemplate
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
        tenant
        organisationsID
        name
        color
        logo
        createdAt
        updatedAt
        personTemplate
      }
      nextToken
    }
  }
`;
export const getOrganisations = /* GraphQL */ `
  query GetOrganisations($id: ID!) {
    getOrganisations(id: $id) {
      id
      tenant
      name
      type
      Workspaces {
        items {
          id
          tenant
          organisationsID
          name
          color
          logo
          createdAt
          updatedAt
          personTemplate
        }
        nextToken
      }
      createdAt
      updatedAt
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
        tenant
        name
        type
        Workspaces {
          items {
            id
            tenant
            organisationsID
            name
            color
            logo
            createdAt
            updatedAt
            personTemplate
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getVodAsset = /* GraphQL */ `
  query GetVodAsset($id: ID!) {
    getVodAsset(id: $id) {
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
        Highlights {
          items {
            id
            tenant
            color
            text
            Tags
            tagIds
            user
            type
            transcriptionID
            projectsID
            storyID
            startTime
            endTime
            createdAt
            updatedAt
          }
          nextToken
        }
        status
        createdAt
        updatedAt
      }
      video
      createdAt
      updatedAt
      vodAssetTranscriptionId
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
        tenant
        title
        transcription {
          id
          tenant
          video
          docId
          transcription
          content
          Highlights {
            nextToken
          }
          status
          createdAt
          updatedAt
        }
        video
        createdAt
        updatedAt
        vodAssetTranscriptionId
      }
      nextToken
    }
  }
`;
export const getTagCategory = /* GraphQL */ `
  query GetTagCategory($id: ID!) {
    getTagCategory(id: $id) {
      id
      tenant
      name
      color
      projectsID
      tags {
        items {
          id
          tenant
          label
          color
          projectsID
          tagCategoryID
          tagCategory {
            id
            tenant
            name
            color
            projectsID
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listTagCategories = /* GraphQL */ `
  query ListTagCategories(
    $filter: ModelTagCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTagCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        tenant
        name
        color
        projectsID
        tags {
          items {
            id
            tenant
            label
            color
            projectsID
            tagCategoryID
            updatedAt
            createdAt
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
