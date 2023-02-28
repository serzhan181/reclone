"use client";

import { Input } from "@/shared/ui/input";
import { Modal, ModalProps } from "@/shared/ui/modal";
import { useState } from "react";

export const AuthButtons = () => {
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenSignup, setIsOpenSignup] = useState(false);
  return (
    <div className="flex gap-2">
      <button className="btn btn-info" onClick={() => setIsOpenLogin(true)}>
        Log in
      </button>
      <button
        className="btn btn-secondary btn-outline"
        onClick={() => setIsOpenSignup(true)}
      >
        Sign in
      </button>
      <LoginModal isOpen={isOpenLogin} setIsOpen={setIsOpenLogin} />
      <SignupModal isOpen={isOpenSignup} setIsOpen={setIsOpenSignup} />
    </div>
  );
};

const LoginModal = ({
  isOpen,
  setIsOpen,
}: Pick<ModalProps, "isOpen" | "setIsOpen">) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Log in">
      <Input label="Hello" placeholder="Your username" variant="sm" />
      <Input placeholder="Your password" variant="sm" />
    </Modal>
  );
};

const SignupModal = ({
  isOpen,
  setIsOpen,
}: Pick<ModalProps, "isOpen" | "setIsOpen">) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Sign up">
      <Input placeholder="Your username" variant="sm" />
      <Input placeholder="Your email" variant="sm" />
      <Input placeholder="Your password" variant="sm" />
    </Modal>
  );
};
