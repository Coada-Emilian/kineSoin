/**
 * @file EditTherapistButtons.tsx
 * @description A React functional component that provides a dropdown menu with options to edit the status of a therapist and buttons to validate or cancel the action.
 *
 * @param {Object} props - The props for the EditTherapistButtons component.
 * @param {string} props.buttonMessage - The message to display on the menu button.
 * @param {string} props.backgroundColor - The background color class to apply to the menu button.
 * @param {Function} props.toggleStatus - A function that takes a status string as an argument to toggle the therapist's status.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsProfileEditing - A state setter function to control the editing state of the therapist's profile.
 *
 * @returns {JSX.Element} The rendered EditTherapistButtons component, including a dropdown menu for status options and buttons for validation and cancellation.
 */

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import CustomButton from '../../../../../../standaloneComponents/Button/CustomButton';

interface EditTherapistButtonsProps {
  buttonMessage: string;
  backgroundColor: string;
  toggleStatus: (status: string) => void;
  setIsProfileEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditTherapistButtons({
  buttonMessage,
  backgroundColor,
  toggleStatus,
  setIsProfileEditing,
}: EditTherapistButtonsProps) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton
            className={`inline-flex w-full justify-center gap-x-1.5 rounded-lg ${backgroundColor} p-4 px-3 py-2 my-0 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
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
      <CustomButton btnText="Valider" btnType="submit" normalButton />
      <CustomButton
        btnText="Annuler"
        btnType="button"
        cancelButton
        onClick={() => setIsProfileEditing(false)}
      />
    </>
  );
}
