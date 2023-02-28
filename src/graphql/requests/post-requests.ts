import { GET_POSTS } from "./../api/post-graphql";
import { GetPost } from "@/types";
import { request } from "../client";

const getPosts = () => request<{ posts: GetPost[] }>(GET_POSTS);

export const postsRequests = {
  getPosts,
};
