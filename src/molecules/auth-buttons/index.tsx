import { Button } from "@/src/atoms";
import { useState } from "react";
import { LoginModal } from "./login-modal";
import { SignUpModal } from "./sign-up-modal";

export const AuthButtons = () => {
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeLogIn, setActiveLogIn] = useState(false);

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
      />
      <SignUpModal
        active={activeSignUp}
        setActive={setActiveSignUp}
        onAlreadySignedUp={onAlreadySignedUp}
      />
    </>
  );
};
