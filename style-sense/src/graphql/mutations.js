/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClothing = /* GraphQL */ `
  mutation CreateClothing(
    $input: CreateClothingInput!
    $condition: ModelClothingConditionInput
  ) {
    createClothing(input: $input, condition: $condition) {
      id
      image
      name
      type
      color
      weather
      occasion
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateClothing = /* GraphQL */ `
  mutation UpdateClothing(
    $input: UpdateClothingInput!
    $condition: ModelClothingConditionInput
  ) {
    updateClothing(input: $input, condition: $condition) {
      id
      image
      name
      type
      color
      weather
      occasion
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteClothing = /* GraphQL */ `
  mutation DeleteClothing(
    $input: DeleteClothingInput!
    $condition: ModelClothingConditionInput
  ) {
    deleteClothing(input: $input, condition: $condition) {
      id
      image
      name
      type
      color
      weather
      occasion
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createOutfit = /* GraphQL */ `
  mutation CreateOutfit(
    $input: CreateOutfitInput!
    $condition: ModelOutfitConditionInput
  ) {
    createOutfit(input: $input, condition: $condition) {
      id
      name
      items
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateOutfit = /* GraphQL */ `
  mutation UpdateOutfit(
    $input: UpdateOutfitInput!
    $condition: ModelOutfitConditionInput
  ) {
    updateOutfit(input: $input, condition: $condition) {
      id
      name
      items
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteOutfit = /* GraphQL */ `
  mutation DeleteOutfit(
    $input: DeleteOutfitInput!
    $condition: ModelOutfitConditionInput
  ) {
    deleteOutfit(input: $input, condition: $condition) {
      id
      name
      items
      createdAt
      updatedAt
      owner
    }
  }
`;
