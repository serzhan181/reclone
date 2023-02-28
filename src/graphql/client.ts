import { GraphQLClient } from "graphql-request";
import { cookies } from "next/headers";

export const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_ENDPOINT_URL as string
);

export async function request<T = any>(
  query: string,
  variables?: {} | undefined,
  prioritizedToken?: string
): Promise<T> {
  const cs = cookies();
  const token = prioritizedToken
    ? prioritizedToken
    : cs.get(process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string);

  if (token) {
    gqlClient.setHeader("Authorization", `Bearer ${token}`);
  }

  return gqlClient.request<T>(query, variables).catch((err) => {
    console.error("something went wrong", err);

    throw err.response.errors[0].message;
  });
}
