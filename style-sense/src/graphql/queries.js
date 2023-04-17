/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClothing = /* GraphQL */ `
  query GetClothing($id: ID!) {
    getClothing(id: $id) {
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
export const listClothing = /* GraphQL */ `
  query ListClothing(
    $filter: ModelClothingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClothing(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getOutfit = /* GraphQL */ `
  query GetOutfit($id: ID!) {
    getOutfit(id: $id) {
      id
      name
      items
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listOutfits = /* GraphQL */ `
  query ListOutfits(
    $filter: ModelOutfitFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfits(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        items
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
