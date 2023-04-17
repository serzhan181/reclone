import { getTokenClient } from "@/utils/get-token-client";
import { GraphQLClient } from "graphql-request";

export const gqlClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_ENDPOINT_URL as string
);

export async function request<T = any, V = any>(
  query: string,
  variables?: V,
  overrideToken?: string
): Promise<T> {
  const token = getTokenClient();

  gqlClient.setHeader("Authorization", `Bearer ${overrideToken || token}`);

  return gqlClient
    .request<T>(query, variables ? variables : {})
    .catch((err) => {
      console.error("something went wrong", err);

      throw err.response.errors[0].message;
    });
}
