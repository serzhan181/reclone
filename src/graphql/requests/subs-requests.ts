import { GET_SUBS_LIST } from "./../api/subs-graphql";
import { GetSubsForDropdown } from "./../../types/index";
import { request } from "../client";

const getSubsList = () =>
  request<{ subs: GetSubsForDropdown[] }>(GET_SUBS_LIST);

export const subsRequests = {
  getSubsList,
};
