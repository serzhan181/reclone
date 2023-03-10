"use client";

import { Fragment, useState } from "react";
import { Combobox as HCombobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Option } from "@/types";
import { LoadingSpinner } from "../ui/loading-spinner";

interface ComboboxProps {
  selected: Option | undefined;
  setSelected: (option: Option) => void;
  options: Option[];
  placeholder?: string;
  isLoading?: boolean;
}

export const Combobox = ({
  selected,
  setSelected,
  options,
  placeholder = "",
  isLoading,
}: ComboboxProps) => {
  const [query, setQuery] = useState("");

  return (
    <div>
      <HCombobox value={selected} onChange={setSelected} by="id">
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden text-left rounded-lg outline-none cursor-default sm:text-sm">
            {/* Our savior from accessability hell, headless ui, couldn't do so that options will open on focus. There's a workaround though, which you can observe below. It works. Hopefully they will add this feature. */}
            <HCombobox.Button
              className="relative flex items-center w-full gap-2"
              as="div"
            >
              <HCombobox.Input
                placeholder={placeholder}
                className="w-full input input-bordered"
                displayValue={(option: Option) =>
                  option?.label ? option.label : option.value
                }
                onChange={(event) => setQuery(event.target.value)}
              />
              <span className="absolute right-3">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
              </span>
            </HCombobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <HCombobox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base rounded-md shadow-lg bg-background max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.length === 0 && query !== "" ? (
                <div className="relative px-4 py-2 cursor-default select-none text-primary-content">
                  Nothing found.
                </div>
              ) : (
                options.map((item) => (
                  <HCombobox.Option
                    key={item.id}
                    value={item}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? "bg-primary text-white"
                          : "text-primary-content"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item?.label ? item.label : item.value}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-primary"
                            }`}
                          >
                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </HCombobox.Option>
                ))
              )}
            </HCombobox.Options>
          </Transition>
        </div>
      </HCombobox>
    </div>
  );
};
