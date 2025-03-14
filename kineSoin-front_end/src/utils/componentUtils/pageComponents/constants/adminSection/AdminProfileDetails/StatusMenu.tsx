import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export const StatusMenu = ({
  buttonMessage,
  backgroundColor,
  children,
}: {
  buttonMessage: string;
  backgroundColor: string;
  children: React.ReactNode;
}) => (
  <Menu as="div" className="relative inline-block text-left">
    <MenuButton
      className={`inline-flex w-full justify-center items-center gap-x-1.5 rounded-lg ${backgroundColor} px-2 py-2 my-0 text-xs md:text-sm md:py-2 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
    >
      {buttonMessage}
      <ChevronDownIcon
        aria-hidden="true"
        className="-mr-1 h-5 w-5 text-gray-400"
      />
    </MenuButton>

    <MenuItems className="absolute left-0 z-10 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
      {children}
    </MenuItems>
  </Menu>
);
