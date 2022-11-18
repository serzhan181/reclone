import { Button, Input } from "@/src/atoms";
import { UserSignUp } from "@/src/types";
import { FC } from "react";
import { useForm, UseFormSetError } from "react-hook-form";
import { Modal, IModal } from "../modal";

interface ISignUpModal {
  onAlreadySignedUp: () => void;
  onSubmit: (data: UserSignUp, setError: UseFormSetError<UserSignUp>) => void;
}

export const SignUpModal: FC<ISignUpModal & IModal> = ({
  active,
  setActive,
  onAlreadySignedUp,
  onSubmit,
}) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<UserSignUp>();

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
          <h2 className="text-lg font-semibold">Sign up</h2>
        </div>
        <div>
          <Input {...register("username")} placeholder="username" />
        </div>
        <div>
          <Input {...register("email")} type="email" placeholder="email" />
        </div>
        <div>
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </div>

        <div>
          <Button type="submit" full>
            Sign up
          </Button>
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
      </form>
    </Modal>
  );
};
