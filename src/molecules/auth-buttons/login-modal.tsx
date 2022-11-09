import { Button, Input } from "@/src/atoms";
import { FC } from "react";
import { Modal, IModal } from "../modal";

interface ILoginModal {
  onNotSignedUp: () => void;
}

export const LoginModal: FC<ILoginModal & IModal> = ({
  active,
  setActive,
  onNotSignedUp,
}) => {
  return (
    <Modal active={active} setActive={setActive}>
      <div className="flex flex-col gap-3 px-6 h-80 w-80 py-9">
        <div>
          <h2 className="text-lg font-semibold">Log in</h2>
        </div>
        <div className="flex flex-col gap-1">
          <Input placeholder="username" />
          <Input placeholder="password" />
        </div>

        <div>
          <Button full>Log in</Button>
        </div>
        <div>
          <p>
            Not signed up?{" "}
            <a
              className="text-blue-600 underline cursor-pointer"
              onClick={onNotSignedUp}
            >
              sign up
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};
