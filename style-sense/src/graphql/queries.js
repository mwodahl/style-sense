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
      outfits {
        nextToken
      }
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
      items {
        nextToken
      }
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
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getOutfitItem = /* GraphQL */ `
  query GetOutfitItem($id: ID!) {
    getOutfitItem(id: $id) {
      id
      clothingId
      outfitId
      clothing {
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
      outfit {
        id
        name
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listOutfitItems = /* GraphQL */ `
  query ListOutfitItems(
    $filter: ModelOutfitItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOutfitItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clothingId
        outfitId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const outfitItemsByClothingId = /* GraphQL */ `
  query OutfitItemsByClothingId(
    $clothingId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitItemsByClothingId(
      clothingId: $clothingId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clothingId
        outfitId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const outfitItemsByOutfitId = /* GraphQL */ `
  query OutfitItemsByOutfitId(
    $outfitId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelOutfitItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    outfitItemsByOutfitId(
      outfitId: $outfitId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clothingId
        outfitId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
