import { gql } from "graphql-request";

export const GET_POSTS_MINIMAL = gql`
  {
    posts {
      id
      identifier
      postImgUrn
      title
      subName
      voteScore
      commentCount
      userVote

      createdAt
      user {
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost(
    $file: Upload
    $title: String!
    $body: String
    $subName: String!
  ) {
    createPost(
      createPostInput: {
        postImg: $file
        title: $title
        body: $body
        subName: $subName
      }
    ) {
      createdAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($identifier: String!) {
    removePost(identifier: $identifier) {
      identifier
    }
  }
`;
