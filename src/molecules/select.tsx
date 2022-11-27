import { FC, Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownCircle } from "react-feather";
import Image from "next/image";

interface ISelectOptions {
  title: string;
  name: string;
  subImgUrl?: string;
}

interface ISelect {
  options: ISelectOptions[];
  onSelect: (e: ISelectOptions) => void;
  placeholder: string;
  defaultValue?: string;
}

export const Select: FC<ISelect> = ({ options, placeholder, onSelect }) => {
  const [selected, setSelected] = useState<ISelectOptions | undefined>({
    title: placeholder,
    name: "placeholder",
  });

  return (
    <div className="w-full">
      <Listbox
        value={selected}
        onChange={(e) => {
          onSelect(e);
          setSelected(e);
        }}
      >
        <div className="relative mt-1">
          <Listbox.Button
            defaultValue={"hello"}
            className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <span className="block truncate">{selected?.title}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ArrowDownCircle
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((o) => (
                <Listbox.Option
                  key={o.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={o}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {o.title}
                      </span>
                      <div
                        className={`absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600`}
                      >
                        <div className="relative flex w-5 h-5 flex-center">
                          {o?.subImgUrl ? (
                            <Image
                              src={o.subImgUrl}
                              alt={o.name}
                              className="absolute object-cover rounded-full"
                              layout="fill"
                            />
                          ) : (
                            <span>{o.name[0].toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
