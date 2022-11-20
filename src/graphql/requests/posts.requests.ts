import { GetPost, GetPostComments } from "@/src/types";
import { GET_POST, GET_POST_COMMENTS } from "../api/posts.graphql";
import { request } from "../custom-gql-fns";

interface GetPostVars {
  identifier: string;
  slug: string;
}

const getPost = ({ identifier, slug }: GetPostVars) => {
  return request<{ post: GetPost }>(GET_POST, {
    identifier,
    slug,
  });
};

const getPostComments = ({ identifier, slug }: GetPostVars) => {
  return request<{ post: GetPostComments }>(GET_POST_COMMENTS, {
    identifier,
    slug,
  });
};

export const postsRequests = {
  getPost,
  getPostComments,
};
