/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClothing = /* GraphQL */ `
  subscription OnCreateClothing(
    $filter: ModelSubscriptionClothingFilterInput
    $owner: String
  ) {
    onCreateClothing(filter: $filter, owner: $owner) {
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
export const onUpdateClothing = /* GraphQL */ `
  subscription OnUpdateClothing(
    $filter: ModelSubscriptionClothingFilterInput
    $owner: String
  ) {
    onUpdateClothing(filter: $filter, owner: $owner) {
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
export const onDeleteClothing = /* GraphQL */ `
  subscription OnDeleteClothing(
    $filter: ModelSubscriptionClothingFilterInput
    $owner: String
  ) {
    onDeleteClothing(filter: $filter, owner: $owner) {
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
export const onCreateOutfit = /* GraphQL */ `
  subscription OnCreateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onCreateOutfit(filter: $filter, owner: $owner) {
      id
      name
      items
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateOutfit = /* GraphQL */ `
  subscription OnUpdateOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onUpdateOutfit(filter: $filter, owner: $owner) {
      id
      name
      items
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteOutfit = /* GraphQL */ `
  subscription OnDeleteOutfit(
    $filter: ModelSubscriptionOutfitFilterInput
    $owner: String
  ) {
    onDeleteOutfit(filter: $filter, owner: $owner) {
      id
      name
      items
      createdAt
      updatedAt
      owner
    }
  }
`;
