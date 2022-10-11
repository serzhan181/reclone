import { ArrowDown } from "react-feather";

export const AccordionOption = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <input
        className="absolute inset-x-0 z-10 w-full h-12 opacity-0 cursor-pointer t-0 peer"
        type="checkbox"
      />

      {/* Title */}
      <div className="flex items-center w-full h-12 pl-5 bg-blue-500">
        <h1 className="text-lg font-semibold text-white">What is niggers</h1>
      </div>

      <div className="absolute text-white transition-transform duration-300 rotate-0 top-3 right-3 peer-checked:rotate-180">
        <ArrowDown />
      </div>

      {/* Content */}
      <div className="overflow-hidden transition-all duration-500 bg-white max-h-0 peer-checked:max-h-40 peer-checked:overflow-y-auto">
        <div className="p-2">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            eaque expedita unde perspiciatis, quibusdam asperiores modi suscipit
            itaque magnam odio error voluptatum ab voluptate temporibus, eveniet
            labore ipsam non. Quam, sit in quidem consequuntur repellendus illum
          </p>
        </div>
      </div>
    </div>
  );
};
