import { createContext, FC, ReactElement, useState } from "react";
import { useAuth } from "../hooks/use-auth";

export const AuthContext = createContext({});

interface IAuthProvider {
  children: ReactElement;
}
const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
