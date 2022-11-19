import { Button } from "@/src/atoms";
import { authRequest } from "@/src/graphql/requests/auth.requests";
import { qc } from "@/src/react-query/setup";
import { useAuthStore } from "@/src/store/auth.store";
import { AuthenticationMeta, UserLogin, UserSignUp } from "@/src/types";
import { useState, useCallback } from "react";
import { UseFormSetError } from "react-hook-form";
import { LoginModal } from "./login-modal";
import { SignUpModal } from "./sign-up-modal";

export const AuthSection = () => {
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeLogIn, setActiveLogIn] = useState(false);

  const auth = useAuthStore();

  const onLogin = async (
    data: UserLogin,
    setError: UseFormSetError<UserLogin>
  ) => {
    const loginData = await authRequest.login(data).catch((err) => {
      setError("username", {
        type: "manual",
        message: err,
      });
      return;
    });

    loginData && auth.setAuthData(loginData.login);

    qc.invalidateQueries("posts");
    setActiveLogIn(false);
  };

  const onSignUp = async (
    data: UserSignUp,
    setError: UseFormSetError<UserSignUp>
  ) => {
    const signUpData = await authRequest.signUp(data).catch((err) => {
      const { errors } = JSON.parse(err);

      console.log("ERRRORS", errors);
      Object.keys(errors).forEach((key: any) => {
        setError(key, {
          type: "manual",
          message: errors[key].join(", "),
        });
      });

      return;
    });

    qc.invalidateQueries("posts");
    signUpData && auth.setAuthData(signUpData.signUp);

    setActiveSignUp(false);
    return;
  };

  const onNotSignedUp = () => {
    setActiveLogIn(false);
    setActiveSignUp(true);
  };

  const onAlreadySignedUp = () => {
    setActiveLogIn(true);
    setActiveSignUp(false);
  };

  return (
    <>
      <Button uppercase onClick={() => setActiveLogIn(true)}>
        log in
      </Button>
      <Button uppercase outline rounded onClick={() => setActiveSignUp(true)}>
        sign in
      </Button>

      {/* Modals */}
      <LoginModal
        active={activeLogIn}
        setActive={setActiveLogIn}
        onNotSignedUp={onNotSignedUp}
        onSubmit={onLogin}
      />
      <SignUpModal
        active={activeSignUp}
        setActive={setActiveSignUp}
        onAlreadySignedUp={onAlreadySignedUp}
        onSubmit={onSignUp}
      />
    </>
  );
};
