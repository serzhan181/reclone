import { FC } from "react";

interface IInput {
  placeholder: string;
}

export const Input: FC<IInput> = ({ placeholder }) => {
  return (
    <input
      type="text"
      className="
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
    "
      id="exampleFormControlInput1"
      placeholder={placeholder}
    />
  );
};
