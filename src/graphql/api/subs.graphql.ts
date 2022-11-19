import { gql } from "graphql-request";

export const GET_SUBS = gql`
  query {
    subs {
      name
      title
      id
    }
  }
`;
