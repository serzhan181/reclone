import { gql } from "graphql-request";

export const VOTE_ON_COMMENT = gql`
  mutation VoteOnComment($commentId: Int!, $postId: Int!, $value: Int!) {
    vote(voteInput: { commentId: $commentId, postId: $postId, value: $value }) {
      createdAt
    }
  }
`;

export const VOTE_ON_POST = gql`
  mutation VoteOnPost($postId: Int!, $value: Int!) {
    vote(voteInput: { postId: $postId, value: $value }) {
      createdAt
    }
  }
`;
