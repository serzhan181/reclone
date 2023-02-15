import { Button } from "@/src/atoms";
import { authRequest } from "@/src/graphql/requests/auth.requests";
import { qc } from "@/src/react-query/setup";
import { useAuthStore } from "@/src/store/auth.store";
import { UserLogin, UserSignUp } from "@/src/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { X } from "react-feather";
import { UseFormSetError } from "react-hook-form";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() =>
  import("./login-modal").then(({ LoginModal }) => LoginModal)
);
const SignUpModal = dynamic(() =>
  import("./sign-up-modal").then(({ SignUpModal }) => SignUpModal)
);

export const AuthSection = () => {
  const [activeSignUp, setActiveSignUp] = useState(false);
  const [activeLogIn, setActiveLogIn] = useState(false);

  const auth = useAuthStore();
  const router = useRouter();

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

    router.reload();

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

    toast(
      (t) => (
        <div className="font-semibold">
          <p>Congrats!, you created an account! 🎉</p>
          <div className="flex justify-between gap-2 mt-1">
            <Button onClick={() => router.push("/create/post")} size="s">
              create post
            </Button>
            <button onClick={() => toast.dismiss(t.id)}>
              <X size={16} />
            </button>
          </div>
        </div>
      ),
      { position: "bottom-center" }
    );

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
