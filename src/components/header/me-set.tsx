"use client";

import { useUserStore } from "@/stores/user-store";
import { IUser } from "@/types";
import { ReactNode, useEffect } from "react";

interface MeSetProps {
  children: ReactNode;
  user: IUser | undefined;
}

// This component is needed to set the user data that comes from 'me' request.
export const MeSet = ({ children, user }: MeSetProps) => {
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);
  return <>{children}</>;
};
