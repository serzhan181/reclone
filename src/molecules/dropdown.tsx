import { FC, Fragment, forwardRef, ReactElement, ForwardedRef } from "react";
import { Button } from "@/src/atoms";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";

interface IDropdown {
  title: string;
  options: Array<{ actionTitle: string; href: string; onClick?: () => void }>;
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
          <Menu.Button as={Fragment}>
            <Button>{title}</Button>
          </Menu.Button>
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
            <Menu.Items
              as="ul"
              className="absolute z-50 float-left py-2 m-0 mt-1 text-base text-left list-none bg-white border-none rounded-lg shadow-lg dropdown-menu min-w-max bg-clip-padding"
            >
              {options.map((o) => (
                <Menu.Item as="li" key={o.actionTitle}>
                  <MyLink href={o.href}>
                    <p
                      onClick={o?.onClick}
                      className={`hover:bg-gray-100 block w-full px-4 py-2 text-sm font-normal text-gray-700 bg-transparent cursor-pointer dropdown-item whitespace-nowrap`}
                    >
                      {o.actionTitle}
                    </p>
                  </MyLink>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
