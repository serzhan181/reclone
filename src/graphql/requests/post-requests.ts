import { VOTE_ON_POST } from "./../api/vote-graphql";
import {
  CreatePostInput,
  GetPostComments,
  GetPostDetailed,
} from "./../../types/index";
import {
  COMMENT_ON_POST,
  CREATE_POST,
  GET_POSTS,
  GET_POST_COMMENTS,
  GET_POST_DETAILED,
} from "./../api/post-graphql";
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

interface CreateCommentVars {
  body: string;
  slug: string;
  identifier: string;
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

const getPostComments = ({
  identifier,
  slug,
  token,
}: WithToken & GetPostVars) =>
  request<{ post: GetPostComments }, GetPostVars>(
    GET_POST_COMMENTS,
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

const createComment = ({
  body,
  identifier,
  slug,
  token,
}: WithToken & CreateCommentVars) => {
  return request<{}, CreateCommentVars>(
    COMMENT_ON_POST,
    { body, identifier, slug },
    token
  );
};

const createPost = ({
  title,
  body,
  file,
  token,
  subName,
}: WithToken & CreatePostInput) =>
  request<{}, CreatePostInput>(
    CREATE_POST,
    { title, body, file, subName },
    token
  );

export const postsRequests = {
  getPosts,
  getPost,
  voteOnPost,
  getPostComments,
  createComment,
  createPost,
};
