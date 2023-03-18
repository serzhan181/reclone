import { GET_SUB, GET_SUBS_LIST } from "./../api/subs-graphql";
import { GetSub, GetSubsForDropdown } from "./../../types/index";
import { request } from "../client";
import { WithToken } from "./post-requests";

const getSubsList = () =>
  request<{ subs: GetSubsForDropdown[] }>(GET_SUBS_LIST);

const getSub = ({ name, token }: { name: string } & WithToken) =>
  request<{ sub: GetSub }, { name: string }>(GET_SUB, { name }, token);

export const subsRequests = {
  getSubsList,
  getSub,
};
