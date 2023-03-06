"use client";

import { Input } from "@/shared/ui/input";
import { Modal, ModalProps } from "@/shared/ui/modal";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "react-query";
import { authRequest } from "@/graphql/requests/auth-requests";
import { setCookie } from "cookies-next";
import { useUserStore } from "@/stores/user-store";
import { useRouter } from "next/navigation";
import classNames from "classnames";
import { useModalStore } from "@/stores/modal-store";

export const AuthButtons = () => {
  const [isOpenLogin, setIsOpenLogin] = useModalStore((state) => [
    state.authModal,
    state.setAuthModal,
  ]);
  const [isOpenSignup, setIsOpenSignup] = useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const login = useMutation("login", authRequest.login, {
    onSuccess(data) {
      setCookie(
        process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string,
        data.login.access_token,
        {
          sameSite: "lax",
        }
      );

      setUser(data.login.user);
      window.location.reload();
    },
    onError(error) {
      console.log("You are horrible", error);
    },
  });
  const signup = useMutation("signup", authRequest.signUp, {
    onSuccess(data) {
      setCookie(
        process.env.NEXT_PUBLIC_AUTHORIZATION_COOKIE_NAME as string,
        data.signUp.access_token,
        {
          sameSite: "lax",
        }
      );

      setUser(data.signUp.user);
      window.location.reload();
    },
    onError(error) {
      console.log("You are horrible", error);
    },
  });

  const onSubmitLogin = (data: LoginType) => {
    login.mutate(data);
  };
  const onSubmitSignup = (data: SignupType) => {
    signup.mutate(data);
  };

  return (
    <div className="flex gap-2">
      <button
        className="btn btn-info"
        type="submit"
        onClick={() => setIsOpenLogin(true)}
      >
        Log in
      </button>
      <button
        className="btn btn-secondary btn-outline"
        type="button"
        onClick={() => setIsOpenSignup(true)}
      >
        Sign in
      </button>
      <LoginModal
        isOpen={isOpenLogin}
        setIsOpen={setIsOpenLogin}
        onSubmit={onSubmitLogin}
        isLoading={login.isLoading}
      />
      <SignupModal
        isOpen={isOpenSignup}
        setIsOpen={setIsOpenSignup}
        onSubmit={onSubmitSignup}
        isLoading={signup.isLoading}
      />
    </div>
  );
};

// * We are boring, dont reveal us.
const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});
type LoginType = z.infer<typeof LoginSchema>;

interface LoginModalProps extends Pick<ModalProps, "isOpen" | "setIsOpen"> {
  onSubmit: (data: LoginType) => void;
  isLoading?: boolean;
}

const LoginModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  isLoading,
}: LoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });
  // ????? That's public info for observers to not create accounts if they dont want to and test the application with ease.
  const onUseDemo = () => {
    setValue("username", "norman");
    setValue("password", "123456");
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Log in"
      canLeave={false}
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <Input
          {...register("username")}
          placeholder="Your username"
          variant="sm"
        />
        <Input
          {...register("password")}
          placeholder="Your password"
          type="password"
          variant="sm"
        />
        <div className="flex justify-between">
          <div>
            <span>
              Use a{" "}
              <button
                onClick={onUseDemo}
                className="btn-link btn-primary"
                type="button"
              >
                demo
              </button>
            </span>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-error btn-outline w-fit"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className={classNames("self-start btn btn-sm btn-success w-fit", {
                "loading btn-disabled": isLoading,
              })}
              type="submit"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

const SignupSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "No less than 6 characteres." }),
});
type SignupType = z.infer<typeof SignupSchema>;

interface SignupModalProps extends Pick<ModalProps, "isOpen" | "setIsOpen"> {
  onSubmit: (data: SignupType) => void;
  isLoading?: boolean;
}

const SignupModal = ({
  isOpen,
  setIsOpen,
  onSubmit,
  isLoading,
}: SignupModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupType>({
    resolver: zodResolver(SignupSchema),
  });
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Sign up"
      canLeave={false}
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
          reset();
        })}
      >
        <Input
          {...register("username")}
          placeholder="Your username"
          variant="sm"
        />
        <Input {...register("email")} placeholder="Your email" variant="sm" />
        <Input
          {...register("password")}
          placeholder="Your password"
          type="password"
          variant="sm"
        />
        <div className="flex self-end gap-2">
          <button
            className="btn btn-sm btn-error btn-outline w-fit"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className={classNames("self-start btn btn-sm btn-success w-fit", {
              "loading btn-disabled": isLoading,
            })}
          >
            Sign Up
          </button>
        </div>
      </form>
    </Modal>
  );
};
