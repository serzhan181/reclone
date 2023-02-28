import classNames from "classnames";
import { forwardRef, HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  variant?: "sm" | "md" | "lg";
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, label, variant = "md", ...rest }: InputProps, ref) => {
    return (
      <div className="w-full max-w-xs form-control">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <input
          type="text"
          placeholder={placeholder}
          className={classNames("w-full max-w-xs input input-bordered", {
            "input-md": variant === "md",
            "input-sm": variant === "sm",
            "input-lg": variant === "lg",
          })}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);
