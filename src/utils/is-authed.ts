import { getToken } from "./get-token";
import { authRequest } from "./../graphql/requests/auth-requests";

export const isAuthedServer = async () => {
  const token = getToken();
  try {
    const { me } = await authRequest.me({ token });
    return me.authenticated;
  } catch {
    return false;
  }
};
