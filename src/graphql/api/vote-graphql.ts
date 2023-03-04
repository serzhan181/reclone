import { gql } from "graphql-request";

export const VOTE_ON_COMMENT = gql`
  mutation VoteOnComment($commentId: String!, $postId: String!, $value: Int!) {
    vote(voteInput: { commentId: $commentId, postId: $postId, value: $value }) {
      userVote
      voteScore

      comments {
        userVote
        voteScore
      }
    }
  }
`;

export const VOTE_ON_POST = gql`
  mutation VoteOnPost($postId: String!, $value: Int!) {
    vote(voteInput: { postId: $postId, value: $value }) {
      userVote
      voteScore
    }
  }
`;
