import { cookies } from "next/headers";

export const getToken = () => {
  return cookies().get(
    process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string
  )?.value;
};
