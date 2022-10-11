import { AccordionOption } from "@/src/molecules";
import type { IAccordionOption } from "@/src/molecules";
import { FC, ReactNode } from "react";

/**
 * @param children describe accordion options body
 */
interface IAccordion {
  options: any[];
  children: (option: IAccordionOption) => ReactNode;
}

export const Accordion: FC<IAccordion> = ({ options, children }) => {
  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <AccordionOption key={option.title} title={option.title}>
          {children(option)}
        </AccordionOption>
      ))}
    </div>
  );
};
