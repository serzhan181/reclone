"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import EllipsisIcon from "@heroicons/react/20/solid/EllipsisVerticalIcon";
import type { Option } from "@/types";
import classNames from "classnames";

interface DropdownProps {
  options: Option[];
  onClick: (value: Option["value"]) => void;
  label?: ReactNode;
  className?: string;
}

export const Dropdown = ({
  options,
  onClick,
  label,
  className,
}: DropdownProps) => {
  return (
    <div className="text-right top-16">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={classNames({
              "btn btn-primary": !className,
              [`${className}`]: className,
            })}
          >
            {label || <EllipsisIcon className="w-3" />}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right divide-y rounded-md shadow-lg bg-primary divide-base-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {options.map((o) => (
                <Menu.Item key={o.id}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-error" : "text-primary-content"
                      } group text-white transition-all flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={onClick.bind(null, o.value)}
                    >
                      {o.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
