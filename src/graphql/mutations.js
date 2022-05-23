/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLabels = /* GraphQL */ `
  mutation CreateLabels(
    $input: CreateLabelsInput!
    $condition: ModelLabelsConditionInput
  ) {
    createLabels(input: $input, condition: $condition) {
      id
      userId
      labels
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateLabels = /* GraphQL */ `
  mutation UpdateLabels(
    $input: UpdateLabelsInput!
    $condition: ModelLabelsConditionInput
  ) {
    updateLabels(input: $input, condition: $condition) {
      id
      userId
      labels
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteLabels = /* GraphQL */ `
  mutation DeleteLabels(
    $input: DeleteLabelsInput!
    $condition: ModelLabelsConditionInput
  ) {
    deleteLabels(input: $input, condition: $condition) {
      id
      userId
      labels
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
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
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
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
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
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
