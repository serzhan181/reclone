import { FC, ReactNode } from "react";
import { ChevronDown } from "react-feather";

export interface IAccordionOption {
  [x: string]: ReactNode;
  children: ReactNode;
  title: string;
}

export const AccordionOption: FC<IAccordionOption> = ({ title, children }) => {
  return (
    <div className="relative w-full overflow-hidden">
      <input
        className="absolute inset-x-0 z-10 w-full h-12 opacity-0 cursor-pointer peer t-0"
        type="checkbox"
      />

      {/* Title */}
      <div className="flex items-center w-full h-12 pl-5 bg-white border-b">
        <h1 className="font-semibold">{title}</h1>
      </div>

      <div className="absolute transition-transform duration-300 rotate-0 top-3 right-3 peer-checked:rotate-180">
        <ChevronDown />
      </div>

      {/* Content */}
      <div className="overflow-hidden transition-all duration-500 bg-white max-h-0 peer-checked:max-h-40 peer-checked:overflow-y-auto">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
};
