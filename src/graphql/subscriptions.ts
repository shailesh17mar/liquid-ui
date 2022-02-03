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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateHighlights = /* GraphQL */ `
  subscription OnCreateHighlights {
    onCreateHighlights {
      id
      tenant
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
export const onUpdateHighlights = /* GraphQL */ `
  subscription OnUpdateHighlights {
    onUpdateHighlights {
      id
      tenant
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
export const onDeleteHighlights = /* GraphQL */ `
  subscription OnDeleteHighlights {
    onDeleteHighlights {
      id
      tenant
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
export const onCreateTags = /* GraphQL */ `
  subscription OnCreateTags {
    onCreateTags {
      id
      tenant
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
export const onUpdateTags = /* GraphQL */ `
  subscription OnUpdateTags {
    onUpdateTags {
      id
      tenant
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
export const onDeleteTags = /* GraphQL */ `
  subscription OnDeleteTags {
    onDeleteTags {
      id
      tenant
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
export const onCreateTranscription = /* GraphQL */ `
  subscription OnCreateTranscription {
    onCreateTranscription {
      id
      tenant
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
export const onUpdateTranscription = /* GraphQL */ `
  subscription OnUpdateTranscription {
    onUpdateTranscription {
      id
      tenant
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
export const onDeleteTranscription = /* GraphQL */ `
  subscription OnDeleteTranscription {
    onDeleteTranscription {
      id
      tenant
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
export const onCreateStories = /* GraphQL */ `
  subscription OnCreateStories {
    onCreateStories {
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
export const onUpdateStories = /* GraphQL */ `
  subscription OnUpdateStories {
    onUpdateStories {
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
export const onDeleteStories = /* GraphQL */ `
  subscription OnDeleteStories {
    onDeleteStories {
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
export const onCreateCategories = /* GraphQL */ `
  subscription OnCreateCategories {
    onCreateCategories {
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
export const onUpdateCategories = /* GraphQL */ `
  subscription OnUpdateCategories {
    onUpdateCategories {
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
export const onDeleteCategories = /* GraphQL */ `
  subscription OnDeleteCategories {
    onDeleteCategories {
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
export const onUpdateOrganisations = /* GraphQL */ `
  subscription OnUpdateOrganisations {
    onUpdateOrganisations {
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
export const onDeleteOrganisations = /* GraphQL */ `
  subscription OnDeleteOrganisations {
    onDeleteOrganisations {
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
export const onCreateHighlightTags = /* GraphQL */ `
  subscription OnCreateHighlightTags {
    onCreateHighlightTags {
      id
      highlightsID
      tagsID
      highlights {
        id
        tenant
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
        tenant
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
export const onUpdateHighlightTags = /* GraphQL */ `
  subscription OnUpdateHighlightTags {
    onUpdateHighlightTags {
      id
      highlightsID
      tagsID
      highlights {
        id
        tenant
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
        tenant
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
export const onDeleteHighlightTags = /* GraphQL */ `
  subscription OnDeleteHighlightTags {
    onDeleteHighlightTags {
      id
      highlightsID
      tagsID
      highlights {
        id
        tenant
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
        tenant
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
