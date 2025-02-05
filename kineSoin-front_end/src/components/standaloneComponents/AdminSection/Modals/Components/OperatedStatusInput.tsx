// Purpose: The purpose of this component is to render the operated status input.

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface OperatedStatusInputProps {
  setAfflictionOperatedStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function OperatedStatusInput({
  setAfflictionOperatedStatus,
}: OperatedStatusInputProps) {
  const [isOperated, setIsOperated] = useState<string>('Non');
  return (
    <div>
      <div className="md:text-2xl md:flex md:flex-col md:items-center md:gap-1">
        <h4 className="block text-xs md:text-sm font-medium text-gray-700">
          Est opérée
        </h4>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton
              className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-white p-2 px-3 py-2 my-0 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
            >
              {isOperated}
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {isOperated === 'Oui' ? (
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 bg-white font-medium data-[focus]:bg-gray-200 data-[focus]:text-gray-900"
                    onClick={() => {
                      {
                        setAfflictionOperatedStatus(false);
                        setIsOperated('Non');
                      }
                    }}
                  >
                    Non
                  </Link>
                </MenuItem>
              ) : (
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 bg-white font-medium data-[focus]:bg-gray-200 data-[focus]:text-gray-900"
                    onClick={() => {
                      {
                        setAfflictionOperatedStatus(true);
                        setIsOperated('Oui');
                      }
                    }}
                  >
                    Oui
                  </Link>
                </MenuItem>
              )}
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
