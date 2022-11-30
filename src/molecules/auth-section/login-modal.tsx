import { Button, Input } from "@/src/atoms";
import { UserLogin, UserSignUp } from "@/src/types";
import { FC } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { Modal, IModal } from "../modal";

interface ILoginModal {
  onNotSignedUp: () => void;
  onSubmit: (data: UserLogin, setError: UseFormSetError<UserLogin>) => void;
}

export const LoginModal: FC<ILoginModal & IModal> = ({
  active,
  setActive,
  onNotSignedUp,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UserLogin>();

  return (
    <Modal active={active} setActive={setActive}>
      <form
        onSubmit={handleSubmit((data) => onSubmit(data, setError))}
        className="flex flex-col gap-3 px-6 h-80 w-80 py-9"
      >
        <div>
          <div className="font-semibold text-red-500">
            {Object.keys(errors).map((k) => (
              // @ts-ignore
              <p key={k}>{errors[k].message}</p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Log in</h2>
        </div>
        <div className="flex flex-col gap-1">
          <Input {...register("username")} placeholder="username" />
          <Input
            {...register("password")}
            type="password"
            placeholder="password"
          />
        </div>

        <div>
          <Button type="submit" full>
            Log in
          </Button>
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
      </form>
    </Modal>
  );
};
