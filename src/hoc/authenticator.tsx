import { FC, useEffect } from "react";
import { IMe } from "../types";
import { initializeAuthentication } from "../utils/authentication";

export const Authenticator: FC<{ me: IMe }> = ({ me }) => {
  useEffect(() => {
    initializeAuthentication(me);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
