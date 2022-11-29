import { gql } from "graphql-request";

export const GET_SUBS = gql`
  query {
    subs {
      name
      title
      id

      subImgUrl
    }
  }
`;

export const GET_SUBS_POPULAR = gql`
  {
    subsPopular {
      id
      name
      subImgUrl
      isUserSubscribed
    }
  }
`;

export const GET_SUB = gql`
  query GetSub($name: String!) {
    sub(name: $name) {
      description
      title
      name

      subImgUrl
      bannerImgUrl
      createdAt
      creator_name

      isUserSubscribed
      subsribersCount
    }
  }
`;

export const CREATE_SUB = gql`
  mutation CreateSub(
    $name: String!
    $title: String!
    $description: String!
    $bannerImg: Upload
    $subImg: Upload
  ) {
    createSub(
      createSubInput: {
        name: $name
        title: $title
        description: $description
        bannerImg: $bannerImg
        subImg: $subImg
      }
    ) {
      name
    }
  }
`;

export const SUBSCRIBE_TO_SUB = gql`
  mutation Subscribe($subName: String!) {
    subscribe(subName: $subName) {
      id
    }
  }
`;

export const UNSUBSCRIBE_FROM_SUB = gql`
  mutation Unsubscribe($subName: String!) {
    unsubscribe(subName: $subName) {
      createdAt
    }
  }
`;

export const UPDATE_SUB = gql`
  mutation UpdateSub(
    $name: String!
    $subImg: Upload
    $bannerImg: Upload
    $description: String
  ) {
    updateSub(
      updateSubInput: {
        name: $name
        description: $description
        subImg: $subImg
        bannerImg: $bannerImg
      }
    ) {
      name
    }
  }
`;
