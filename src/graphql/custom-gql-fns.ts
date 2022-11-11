import { gqlClient } from "@/src/graphql/setup";

export const request = async (query: string, variables: {} | undefined) => {
  return gqlClient.request(query, variables).catch((err) => {
    throw err.response.errors[0].message;
  });
};

export const setAuthHeader = (token: string) => {
  gqlClient.setHeader("Authorization", `Bearer ${token}`);
};
