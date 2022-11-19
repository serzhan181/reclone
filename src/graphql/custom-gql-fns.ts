import { gqlClient } from "@/src/graphql/setup";
import cookie from "js-cookie";

export const setAuthHeader = (token: string) => {
  gqlClient.setHeader("Authorization", `Bearer ${token}`);
};

export async function request<T = any>(
  query: string,
  variables?: {} | undefined,
  prioritizedToken?: string
): Promise<T> {
  const token =
    cookie.get(process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string) ||
    "";
  setAuthHeader(prioritizedToken ? prioritizedToken : token);
  return gqlClient.request<T>(query, variables).catch((err) => {
    throw err.response.errors[0].message;
  });
}
