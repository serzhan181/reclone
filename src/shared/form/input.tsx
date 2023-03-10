import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  variant?: "sm" | "md" | "lg";
  isError?: boolean;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, label, variant = "md", isError, ...rest }: InputProps,
    ref
  ) => {
    return (
      <div className="w-full form-control">
        {label && (
          <label className="label">
            <span
              className={classNames("label-text", {
                "text-error": isError,
              })}
            >
              {label}
            </span>
          </label>
        )}
        <input
          type="text"
          placeholder={placeholder}
          {...rest}
          className={classNames("w-full input input-bordered", {
            "input-md": variant === "md",
            "input-sm": variant === "sm",
            "input-lg": variant === "lg",
            "input-error": isError,
          })}
          ref={ref}
        />
      </div>
    );
  }
);
