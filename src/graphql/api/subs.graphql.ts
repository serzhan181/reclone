import { gql } from "graphql-request";

export const GET_SUBS = gql`
  query {
    subs {
      name
      title
      id
    }
  }
`;

export const GET_SUB = gql`
  query GetSub($name: String!) {
    sub(name: $name) {
      description
      title

      bannerUrn
      subImgUrn
      createdAt
      creator_name
    }
  }
`;
