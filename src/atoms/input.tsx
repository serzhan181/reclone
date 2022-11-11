import {
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from "react";

export const Input: ForwardRefExoticComponent<
  Pick<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "key" | keyof InputHTMLAttributes<HTMLInputElement>
  > &
    RefAttributes<HTMLInputElement>
> = forwardRef(function ReffedInput(props, ref) {
  return (
    <input
      {...props}
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
      ref={ref}
    />
  );
});
