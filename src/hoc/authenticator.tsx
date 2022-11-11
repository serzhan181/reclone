import { FC, useEffect } from "react";
import { initializeAuthentication } from "../utils/authentication";

export const Authenticator: FC = () => {
  useEffect(() => {
    initializeAuthentication();
  }, []);

  return <></>;
};
