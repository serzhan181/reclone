import { GetPostComments, GetPostDetailed } from "@/src/types";
import { GET_POST_DETAILED, GET_POST_COMMENTS } from "../api/posts.graphql";
import { request } from "../custom-gql-fns";

interface GetPostVars {
  identifier: string;
  slug: string;
}

const getPostDetailed = ({ identifier, slug }: GetPostVars) => {
  return request<{ post: GetPostDetailed }>(GET_POST_DETAILED, {
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
  getPostDetailed,
  getPostComments,
};
