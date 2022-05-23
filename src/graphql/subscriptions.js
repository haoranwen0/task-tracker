/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLabels = /* GraphQL */ `
  subscription OnCreateLabels($owner: String) {
    onCreateLabels(owner: $owner) {
      id
      userId
      labels
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateLabels = /* GraphQL */ `
  subscription OnUpdateLabels($owner: String) {
    onUpdateLabels(owner: $owner) {
      id
      userId
      labels
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteLabels = /* GraphQL */ `
  subscription OnDeleteLabels($owner: String) {
    onDeleteLabels(owner: $owner) {
      id
      userId
      labels
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTask = /* GraphQL */ `
  subscription OnCreateTask($owner: String) {
    onCreateTask(owner: $owner) {
      id
      userId
      deadline
      notes
      title
      label
      progress
      color
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTask = /* GraphQL */ `
  subscription OnUpdateTask($owner: String) {
    onUpdateTask(owner: $owner) {
      id
      userId
      deadline
      notes
      title
      label
      progress
      color
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTask = /* GraphQL */ `
  subscription OnDeleteTask($owner: String) {
    onDeleteTask(owner: $owner) {
      id
      userId
      deadline
      notes
      title
      label
      progress
      color
      createdAt
      updatedAt
      owner
    }
  }
`;
