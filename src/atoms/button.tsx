import {
  ButtonHTMLAttributes,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

interface IButton {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  rounded?: boolean;
  size?: "s" | "m" | "l";
  outline?: boolean;
  uppercase?: boolean;
  full?: boolean;
  transparent?: boolean;
  noRound?: boolean;
}

export const Button: FC<IButton & ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  size = "m",
  rounded = false,
  outline = false,
  noRound = false,
  uppercase,
  full,
  onClick,
  transparent,
  ...rest
}) => {
  const [bSize, setBSize] = useState("px-6 py-2.5 text-xs");

  useEffect(() => {
    if (size === "s") setBSize("px-3 py-1.5 text-xs");
    if (size === "m") setBSize("px-6 py-2.5 text-xs");
    if (size === "l") setBSize("px-7 py-3 text-sm");
  }, [size]);

  return (
    <button
      className={`${bSize} ${rounded && "rounded-full"}  ${
        outline
          ? "border-2 border-gray-700 text-gray-900 hover:text-gray-900 hover:bg-opacity-5 bg-white"
          : "bg-gray-900 text-white"
      }
      ${uppercase && "uppercase"}
      ${full && "w-full h-full"}
      ${
        transparent &&
        "bg-transparent text-white active:bg-gray-400 hover:bg-gray-500"
      }
      ${
        noRound ? "" : "rounded"
      } inline-flex items-center justify-center font-medium tracking-wide transition duration-200 hover:bg-gray-800 focus:shadow-outline focus:outline-none`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

// border-2 border-blue-600
