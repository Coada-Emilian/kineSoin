import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { IAffliction } from '../../../../../../../@types/IAffliction';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';

interface AfflictionBodyRegionProps {
  affliction: IAffliction;
  isProfileEditing: boolean;
}

export default function AfflictionBodyRegion({
  affliction,
  isProfileEditing,
}: AfflictionBodyRegionProps) {
  return (
    <section className="mb-2 md:text-2xl">
      {/* {isProfileEditing ? (
        <div className="md:text-2xl md:flex md:gap-1">
          <h4 className="font-bold ">Region concernée :</h4>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton
                className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg bg-gray-300 p-4 px-3 py-2 my-0 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
              >
                {buttonMessage}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
                    onClick={() => toggleStatus('active')}
                  >
                    Active
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
                    onClick={() => toggleStatus('inactive')}
                  >
                    Inactive
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      ) : ( */}
      <div className="md:text-2xl md:flex md:gap-1">
        <h4 className="font-bold ">Region concernée :</h4>
        <span className="italic font-normal">
          {affliction.body_region?.name}
        </span>
      </div>
      {/* )} */}
    </section>
  );
}
