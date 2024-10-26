/**
 * @file AfflictionStatusButtons.tsx
 * @description A React functional component that displays buttons for toggling the affliction's operation status. This component provides buttons labeled "Opérée" and "Non-opérée," each calling a toggle function with the corresponding status when clicked.
 *
 * @param {Object} props - The props for the AfflictionStatusButtons component.
 * @param {function} props.toggleStatus - A function to update the affliction's status based on the selected option. Accepts a status string as a parameter.
 *
 * @returns {JSX.Element} The rendered AfflictionStatusButtons component, with buttons to select either an operated or non-operated status.
 */

import { MenuItem } from '@headlessui/react';
import { Link } from 'react-router-dom';

interface AfflictionStatusButtonsProps {
  toggleStatus: (status: string) => void;
}

export default function AfflictionStatusButtons({
  toggleStatus,
}: AfflictionStatusButtonsProps) {
  return (
    <div className="py-1">
      <MenuItem>
        <Link
          to="#"
          className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
          onClick={() => toggleStatus('opérée')}
        >
          Opérée
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          to="#"
          className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
          onClick={() => toggleStatus('non-opérée')}
        >
          Non-opérée
        </Link>
      </MenuItem>
    </div>
  );
}
