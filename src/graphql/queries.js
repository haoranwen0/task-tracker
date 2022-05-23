/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLabels = /* GraphQL */ `
  query GetLabels($id: ID!) {
    getLabels(id: $id) {
      id
      userId
      labels
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listLabels = /* GraphQL */ `
  query ListLabels(
    $filter: ModelLabelsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLabels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        labels
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTask = /* GraphQL */ `
  query GetTask($id: ID!) {
    getTask(id: $id) {
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
export const listTasks = /* GraphQL */ `
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
