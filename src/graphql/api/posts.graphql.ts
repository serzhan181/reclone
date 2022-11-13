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

export const CREATE_POST = gql`
  mutation CreatePost($file: Upload, $title: String!, $body: String!) {
    createPost(
      createPostInput: { postImg: $file, title: $title, body: $body }
    ) {
      postImgUrn
      title
      body
    }
  }
`;
