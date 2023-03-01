import { AUTH_ME, LOGIN, SIGN_UP } from "@/graphql/api/auth-graphql";
import { AuthenticationMeta, UserLogin, UserSignUp } from "@/types";
import { request } from "../client";

const me = async () => await request(AUTH_ME).catch((err) => err);

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
