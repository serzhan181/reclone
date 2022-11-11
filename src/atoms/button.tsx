import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
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
      className={`${bSize} ${rounded && "rounded-full"} 
        ${
          outline
            ? "border-2 border-blue-600 text-blue-600 hover:bg-black hover:bg-opacity-5 "
            : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
        }
        ${uppercase && "uppercase"}
        ${full && "w-full h-full"}
        ${
          transparent &&
          "bg-transparent text-blue-500 active:bg-slate-400 hover:bg-slate-200"
        }
        ${noRound ? "" : "rounded"}
       focus:outline-none focus:ring-0   transition duration-150 ease-in-out`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

// border-2 border-blue-600
