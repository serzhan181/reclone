import { FC, ReactNode, useEffect, useState } from "react";

interface IButton {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rounded?: boolean;
  size?: "s" | "m" | "l";
  outline?: boolean;
  uppercase?: boolean;
}

export const Button: FC<IButton> = ({
  children,
  size = "m",
  rounded = false,
  outline = false,
  uppercase,
  onClick,
}) => {
  const [bSize, setBSize] = useState("px-6 py-2.5 text-xs");

  useEffect(() => {
    if (size === "s") setBSize("px-4 py-1.5 text-xs");
    if (size === "m") setBSize("px-6 py-2.5 text-xs");
    if (size === "l") setBSize("px-7 py-3 text-sm");
  }, [size]);

  return (
    <button
      type="button"
      className={`${bSize} ${rounded ? "rounded-full" : "rounded"} 
        ${
          outline
            ? "border-2 border-blue-600 text-blue-600 hover:bg-black hover:bg-opacity-5 "
            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
        }
        ${uppercase && "uppercase"}
        font-medium    shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// border-2 border-blue-600
