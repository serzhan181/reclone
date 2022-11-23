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

export const GET_SUB = gql`
  query GetSub($name: String!) {
    sub(name: $name) {
      description
      title
      name

      bannerUrn
      subImgUrn
      createdAt
      creator_name
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
