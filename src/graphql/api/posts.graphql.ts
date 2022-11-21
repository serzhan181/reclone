import { gql } from "graphql-request";

export const GET_POSTS = gql`
  {
    posts {
      id
      identifier
      slug
      title
      subName
      voteScore
      commentCount
      userVote

      postImgUrl
      subImgUrl

      createdAt
      user {
        username
      }
    }
  }
`;

export const GET_POSTS_BY_SUBNAME = gql`
  query PostsBySubName($subName: String!) {
    postsBySubName(subName: $subName) {
      id
      identifier
      slug
      title
      subName
      voteScore
      commentCount
      userVote

      postImgUrl
      subImgUrl

      createdAt
      user {
        username
      }
    }
  }
`;

export const GET_POST = gql`
  query GetSinglePost($identifier: String!, $slug: String!) {
    post(getSinglePost: { identifier: $identifier, slug: $slug }) {
      id
      identifier
      slug
      title
      subName
      voteScore
      commentCount
      userVote

      postImgUrl
      subImgUrl

      createdAt
      user {
        username
      }
    }
  }
`;

export const GET_POST_DETAILED = gql`
  query GetSinglePostDetailed($identifier: String!, $slug: String!) {
    post(getSinglePost: { identifier: $identifier, slug: $slug }) {
      id
      identifier
      slug
      title
      subName
      voteScore
      commentCount
      userVote

      postImgUrl
      subImgUrl

      body

      createdAt
      user {
        username
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query GetSinglePost($identifier: String!, $slug: String!) {
    post(getSinglePost: { identifier: $identifier, slug: $slug }) {
      comments {
        createdAt
        username
        body
        id

        userVote
        voteScore
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
  mutation DeletePost($postId: Int!) {
    removePost(id: $postId) {
      identifier
    }
  }
`;

export const COMMENT_ON_POST = gql`
  mutation CreateComment($slug: String!, $identifier: String!, $body: String!) {
    createComment(
      createCommentInput: {
        body: $body
        postIdentifier: $identifier
        postSlug: $slug
      }
    ) {
      createdAt
    }
  }
`;
