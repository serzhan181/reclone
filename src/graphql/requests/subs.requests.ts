import { gql } from "graphql-request";
import { request } from "../custom-gql-fns";

const subDoesExist = async (name: string) => {
  try {
    const data = await request<{ sub: { title: string; name: string } }>(gql`{
            sub(name: "${name}") {
              title
              name
            }
          }`);

    return data.sub;
  } catch (error) {
    return false;
  }
};

export const subRequests = {
  subDoesExist,
};
