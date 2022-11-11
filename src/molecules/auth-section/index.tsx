import { Button } from "@/src/atoms";
import { useAuthStore } from "@/src/store/auth.store";
import { UserLogin, UserSignUp } from "@/src/types";
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
    const err = await auth.login(data);
    console.log("err", err);

    if (err) {
      setError("username", {
        type: "manual",
        message: err,
      });
      return;
    }

    setActiveLogIn(false);
  };

  const onSignUp = async (
    data: UserSignUp,
    setError: UseFormSetError<UserSignUp>
  ) => {
    const err = await auth.signup(data);

    if (err) {
      const { errors } = JSON.parse(err);

      console.log("ERRRORS", errors);
      Object.keys(errors).forEach((key: any) => {
        setError(key, {
          type: "manual",
          message: errors[key].join(", "),
        });
      });

      return;
    }

    setActiveSignUp(false);
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
