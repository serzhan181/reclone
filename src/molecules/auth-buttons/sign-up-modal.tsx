import { Button, Input } from "@/src/atoms";
import { FC } from "react";
import { Modal, IModal } from "../modal";

interface ISignUpModal {
  onAlreadySignedUp: () => void;
}

export const SignUpModal: FC<ISignUpModal & IModal> = ({
  active,
  setActive,
  onAlreadySignedUp,
}) => {
  return (
    <Modal active={active} setActive={setActive}>
      <div className="flex flex-col gap-3 px-6 h-80 w-80 py-9">
        <div>
          <h2 className="text-lg font-semibold">Sign up</h2>
        </div>
        <div>
          <Input type="email" placeholder="Email" />
        </div>
        <div>
          <Input type="password" placeholder="Password" />
        </div>
        <div>
          <Input type="password" placeholder="Repeat password" />
        </div>

        <div>
          <Button full>Sign up</Button>
        </div>
        <div>
          <p>
            Already signed up?{" "}
            <a
              className="text-blue-600 underline cursor-pointer"
              onClick={onAlreadySignedUp}
            >
              log in
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};
