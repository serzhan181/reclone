import { AuthenticationMeta, UserSignUp } from "@/src/types";
import { UserLogin } from "@/src/types";
import { AUTH_ME, LOGIN, SIGN_UP } from "@/src/graphql/api/auth.graphql";
import { request } from "../custom-gql-fns";

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
