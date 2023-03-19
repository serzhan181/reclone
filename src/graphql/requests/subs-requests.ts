import {
  GET_SUB,
  GET_SUBS_LIST,
  SUBSCRIBE_TO_SUB,
  UNSUBSCRIBE_FROM_SUB,
} from "./../api/subs-graphql";
import { GetSub, GetSubsForDropdown } from "./../../types/index";
import { request } from "../client";
import { WithToken } from "./post-requests";

interface WithSubName {
  subName: string;
}

const getSubsList = () =>
  request<{ subs: GetSubsForDropdown[] }>(GET_SUBS_LIST);

const getSub = ({ name, token }: { name: string } & WithToken) =>
  request<{ sub: GetSub }, { name: string }>(GET_SUB, { name }, token);

const joinSub = ({ subName, token }: WithSubName & WithToken) =>
  request<{}, WithSubName>(SUBSCRIBE_TO_SUB, { subName }, token);

const leaveSub = ({ subName, token }: WithSubName & WithToken) =>
  request<{}, WithSubName>(UNSUBSCRIBE_FROM_SUB, { subName }, token);

export const subsRequests = {
  getSubsList,
  getSub,
  joinSub,
  leaveSub,
};
