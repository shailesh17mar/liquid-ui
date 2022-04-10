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
      templateId
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
      templateId
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
      templateId
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
      templateId
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
      templateId
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
      templateId
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
      templateId
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
      templateId
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
      templateId
    }
  }
`;
export const onCreateTags = /* GraphQL */ `
  subscription OnCreateTags {
    onCreateTags {
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
            templateId
          }
          nextToken
        }
        templateId
        createdAt
        updatedAt
      }
      updatedAt
      createdAt
      templateId
    }
  }
`;
export const onUpdateTags = /* GraphQL */ `
  subscription OnUpdateTags {
    onUpdateTags {
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
            templateId
          }
          nextToken
        }
        templateId
        createdAt
        updatedAt
      }
      updatedAt
      createdAt
      templateId
    }
  }
`;
export const onDeleteTags = /* GraphQL */ `
  subscription OnDeleteTags {
    onDeleteTags {
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
            templateId
          }
          nextToken
        }
        templateId
        createdAt
        updatedAt
      }
      updatedAt
      createdAt
      templateId
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
          templateId
        }
        nextToken
      }
      status
      templateId
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
          templateId
        }
        nextToken
      }
      status
      templateId
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
          templateId
        }
        nextToken
      }
      status
      templateId
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
          templateId
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
            templateId
          }
          nextToken
        }
        status
        templateId
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
        templateId
      }
      templateId
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
          templateId
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
            templateId
          }
          nextToken
        }
        status
        templateId
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
        templateId
      }
      templateId
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
          templateId
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
            templateId
          }
          nextToken
        }
        status
        templateId
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
        templateId
      }
      templateId
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
            templateId
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
            templateId
          }
          templateId
          storiesTranscriptionId
          storiesParticipantsId
        }
        nextToken
      }
      templateId
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
            templateId
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
            templateId
          }
          templateId
          storiesTranscriptionId
          storiesParticipantsId
        }
        nextToken
      }
      templateId
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
            templateId
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
            templateId
          }
          templateId
          storiesTranscriptionId
          storiesParticipantsId
        }
        nextToken
      }
      templateId
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
          templateId
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
            templateId
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
            templateId
          }
          templateId
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
            templateId
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
          templateId
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
          templateId
        }
        nextToken
      }
      Insights {
        items {
          id
          tenant
          projectsID
          content
          templateId
          createdAt
          updatedAt
        }
        nextToken
      }
      templateId
    }
  }
`;
export const onUpdateProjects = /* GraphQL */ `
  subscription OnUpdateProjects {
    onUpdateProjects {
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
          templateId
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
            templateId
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
            templateId
          }
          templateId
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
            templateId
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
          templateId
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
          templateId
        }
        nextToken
      }
      Insights {
        items {
          id
          tenant
          projectsID
          content
          templateId
          createdAt
          updatedAt
        }
        nextToken
      }
      templateId
    }
  }
`;
export const onDeleteProjects = /* GraphQL */ `
  subscription OnDeleteProjects {
    onDeleteProjects {
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
          templateId
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
            templateId
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
            templateId
          }
          templateId
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
            templateId
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
          templateId
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
          templateId
        }
        nextToken
      }
      Insights {
        items {
          id
          tenant
          projectsID
          content
          templateId
          createdAt
          updatedAt
        }
        nextToken
      }
      templateId
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
export const onUpdateOrganisations = /* GraphQL */ `
  subscription OnUpdateOrganisations {
    onUpdateOrganisations {
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
export const onDeleteOrganisations = /* GraphQL */ `
  subscription OnDeleteOrganisations {
    onDeleteOrganisations {
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
export const onCreateTagCategory = /* GraphQL */ `
  subscription OnCreateTagCategory {
    onCreateTagCategory {
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
            templateId
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
          templateId
        }
        nextToken
      }
      templateId
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
            templateId
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
          templateId
        }
        nextToken
      }
      templateId
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
            templateId
            createdAt
            updatedAt
          }
          updatedAt
          createdAt
          templateId
        }
        nextToken
      }
      templateId
      createdAt
      updatedAt
    }
  }
`;
