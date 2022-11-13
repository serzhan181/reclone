import { gql } from "graphql-request";

export const GET_POSTS_MINIMAL = gql`
  {
    posts {
      identifier
      postImgUrn
      title

      createdAt
      user {
        username
      }
    }
  }
`;
