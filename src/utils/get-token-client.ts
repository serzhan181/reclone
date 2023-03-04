import { getCookie } from "cookies-next";

export const getTokenClient = () => {
  return getCookie(
    process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string
  )?.toString();
};
