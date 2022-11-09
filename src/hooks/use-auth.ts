import { useState } from "react";

interface IUser {
  authenticated: boolean;
  username: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async () => {
    try {
      // login feature
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = async () => {
    try {
      //   sign up feautre
    } catch (err) {
      console.error(err);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return { user, signIn: login, signUp, signOut };
};
