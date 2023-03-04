import { VOTE_ON_POST } from "./../api/vote-graphql";
import { GetPostDetailed } from "./../../types/index";
import { GET_POSTS, GET_POST_DETAILED } from "./../api/post-graphql";
import { GetPost } from "@/types";
import { request } from "../client";

interface VoteResponse {
  userVote: number;
  voteScore: number;
}

interface VoteOnPost {
  value: -1 | 0 | 1;
  postId: string;
}

export interface WithToken {
  token?: string;
}

interface GetPostVars {
  identifier: string;
  slug: string;
}

const getPosts = ({ token }: WithToken) =>
  request<{ posts: GetPost[] }>(GET_POSTS, undefined, token);

const getPost = ({ token, identifier, slug }: WithToken & GetPostVars) =>
  request<{ post: GetPostDetailed }, GetPostVars>(
    GET_POST_DETAILED,
    {
      identifier,
      slug,
    },
    token
  );

const voteOnPost = ({ token, postId, value }: WithToken & VoteOnPost) => {
  return request<{ vote: VoteResponse }, VoteOnPost>(
    VOTE_ON_POST,
    { postId, value },
    token
  );
};

export const postsRequests = {
  getPosts,
  getPost,
  voteOnPost,
};
