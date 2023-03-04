import { AUTH_ME, LOGIN, SIGN_UP } from "@/graphql/api/auth-graphql";
import { AuthenticationMeta, IMe, UserLogin, UserSignUp } from "@/types";
import { request } from "../client";
import { WithToken } from "./post-requests";

const me = ({ token }: WithToken) =>
  request<{ me: IMe }>(AUTH_ME, undefined, token);

const login = async (dto: UserLogin) =>
  await request<{ login: AuthenticationMeta }>(LOGIN, { login: dto });

const signUp = async (dto: UserSignUp) => {
  return await request<{ signUp: AuthenticationMeta }>(SIGN_UP, {
    sign_up: dto,
  });
};

export const authRequest = {
  me,
  login,
  signUp,
};
