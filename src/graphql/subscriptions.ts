/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePersons = /* GraphQL */ `
  subscription OnCreatePersons {
    onCreatePersons {
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
export const onUpdatePersons = /* GraphQL */ `
  subscription OnUpdatePersons {
    onUpdatePersons {
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
export const onDeletePersons = /* GraphQL */ `
  subscription OnDeletePersons {
    onDeletePersons {
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
export const onCreateInsights = /* GraphQL */ `
  subscription OnCreateInsights {
    onCreateInsights {
      id
      tenant
      projectsID
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInsights = /* GraphQL */ `
  subscription OnUpdateInsights {
    onUpdateInsights {
      id
      tenant
      projectsID
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInsights = /* GraphQL */ `
  subscription OnDeleteInsights {
    onDeleteInsights {
      id
      tenant
      projectsID
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateHighlights = /* GraphQL */ `
  subscription OnCreateHighlights {
    onCreateHighlights {
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
export const onUpdateHighlights = /* GraphQL */ `
  subscription OnUpdateHighlights {
    onUpdateHighlights {
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
export const onDeleteHighlights = /* GraphQL */ `
  subscription OnDeleteHighlights {
    onDeleteHighlights {
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
export const onCreateTags = /* GraphQL */ `
  subscription OnCreateTags {
    onCreateTags {
      id
      tenant
      label
      projectsID
      tagCategoryID
      updatedAt
      createdAt
    }
  }
`;
export const onUpdateTags = /* GraphQL */ `
  subscription OnUpdateTags {
    onUpdateTags {
      id
      tenant
      label
      projectsID
      tagCategoryID
      updatedAt
      createdAt
    }
  }
`;
export const onDeleteTags = /* GraphQL */ `
  subscription OnDeleteTags {
    onDeleteTags {
      id
      tenant
      label
      projectsID
      tagCategoryID
      updatedAt
      createdAt
    }
  }
`;
export const onCreateTranscription = /* GraphQL */ `
  subscription OnCreateTranscription {
    onCreateTranscription {
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
  }
`;
export const onUpdateTranscription = /* GraphQL */ `
  subscription OnUpdateTranscription {
    onUpdateTranscription {
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
  }
`;
export const onDeleteTranscription = /* GraphQL */ `
  subscription OnDeleteTranscription {
    onDeleteTranscription {
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
  }
`;
export const onCreateStories = /* GraphQL */ `
  subscription OnCreateStories {
    onCreateStories {
      id
      tenant
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
  }
`;
export const onUpdateStories = /* GraphQL */ `
  subscription OnUpdateStories {
    onUpdateStories {
      id
      tenant
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
  }
`;
export const onDeleteStories = /* GraphQL */ `
  subscription OnDeleteStories {
    onDeleteStories {
      id
      tenant
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
  }
`;
export const onCreateCategories = /* GraphQL */ `
  subscription OnCreateCategories {
    onCreateCategories {
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
  }
`;
export const onUpdateCategories = /* GraphQL */ `
  subscription OnUpdateCategories {
    onUpdateCategories {
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
  }
`;
export const onDeleteCategories = /* GraphQL */ `
  subscription OnDeleteCategories {
    onDeleteCategories {
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
  }
`;
export const onCreateProjects = /* GraphQL */ `
  subscription OnCreateProjects {
    onCreateProjects {
      id
      tenant
      name
      readme
      createdAt
      updatedAt
      Categories {
        nextToken
      }
      Stories {
        nextToken
      }
      Tags {
        nextToken
      }
      Highlights {
        nextToken
      }
      Insights {
        nextToken
      }
    }
  }
`;
export const onUpdateProjects = /* GraphQL */ `
  subscription OnUpdateProjects {
    onUpdateProjects {
      id
      tenant
      name
      readme
      createdAt
      updatedAt
      Categories {
        nextToken
      }
      Stories {
        nextToken
      }
      Tags {
        nextToken
      }
      Highlights {
        nextToken
      }
      Insights {
        nextToken
      }
    }
  }
`;
export const onDeleteProjects = /* GraphQL */ `
  subscription OnDeleteProjects {
    onDeleteProjects {
      id
      tenant
      name
      readme
      createdAt
      updatedAt
      Categories {
        nextToken
      }
      Stories {
        nextToken
      }
      Tags {
        nextToken
      }
      Highlights {
        nextToken
      }
      Insights {
        nextToken
      }
    }
  }
`;
export const onCreateWorkspaces = /* GraphQL */ `
  subscription OnCreateWorkspaces {
    onCreateWorkspaces {
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
export const onUpdateWorkspaces = /* GraphQL */ `
  subscription OnUpdateWorkspaces {
    onUpdateWorkspaces {
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
export const onDeleteWorkspaces = /* GraphQL */ `
  subscription OnDeleteWorkspaces {
    onDeleteWorkspaces {
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
export const onCreateOrganisations = /* GraphQL */ `
  subscription OnCreateOrganisations {
    onCreateOrganisations {
      id
      tenant
      name
      type
      Workspaces {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrganisations = /* GraphQL */ `
  subscription OnUpdateOrganisations {
    onUpdateOrganisations {
      id
      tenant
      name
      type
      Workspaces {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrganisations = /* GraphQL */ `
  subscription OnDeleteOrganisations {
    onDeleteOrganisations {
      id
      tenant
      name
      type
      Workspaces {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTagCategory = /* GraphQL */ `
  subscription OnCreateTagCategory {
    onCreateTagCategory {
      id
      tenant
      name
      projectsID
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTagCategory = /* GraphQL */ `
  subscription OnUpdateTagCategory {
    onUpdateTagCategory {
      id
      tenant
      name
      projectsID
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTagCategory = /* GraphQL */ `
  subscription OnDeleteTagCategory {
    onDeleteTagCategory {
      id
      tenant
      name
      projectsID
      tags {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
