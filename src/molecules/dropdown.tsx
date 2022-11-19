import {
  FC,
  ForwardedRef,
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";

export interface IDropdown {
  title: ReactNode;
  options: Array<{ actionTitle: string; onClick?: () => void; href?: string }>;
}

const MyLink = forwardRef(function MyLink(
  props: { href: string; children: ReactElement },
  ref: ForwardedRef<HTMLAnchorElement>
) {
  let { href, children, ...rest } = props;

  return (
    <Link href={href}>
      <a {...rest} ref={ref}>
        {children}
      </a>
    </Link>
  );
});

export const Dropdown: FC<IDropdown> = ({ title, options }) => {
  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
              {title}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {options.map((o) => (
                  <Menu.Item key={o.actionTitle}>
                    {({ active }) => (
                      <>
                        {o.href ? (
                          <MyLink href={o.href}>
                            <p
                              className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700"
                              }`}
                              onClick={o.onClick}
                            >
                              {o.actionTitle}
                            </p>
                          </MyLink>
                        ) : (
                          <p
                            className={`block px-4 cursor-pointer py-2 text-sm hover:bg-gray-100 ${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            }`}
                            onClick={o.onClick}
                          >
                            {o.actionTitle}
                          </p>
                        )}
                      </>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
