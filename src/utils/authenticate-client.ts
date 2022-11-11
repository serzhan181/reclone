import { setAuthHeader } from "../graphql/custom-gql-fns";
import cookie from "js-cookie";

export const authenticateClient = (token: string) => {
  setAuthHeader(token);
  cookie.set(
    process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string,
    token,
    {
      expires: 30 * 24 * 60 * 60,
    }
  );
};
