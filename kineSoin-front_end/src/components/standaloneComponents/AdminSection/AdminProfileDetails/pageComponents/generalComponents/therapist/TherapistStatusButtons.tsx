/**
 * @file TherapistStatusButtons.tsx
 * @description A React functional component that renders buttons for changing the status of a therapist. It provides options to set the therapist's status to either "Active" or "Inactive."
 *
 * @param {Object} props - The props for the TherapistStatusButtons component.
 * @param {function(string): void} props.toggleStatus - A function to handle the status change, which takes a status string ('active' or 'inactive') as an argument.
 *
 * @returns {JSX.Element} The rendered TherapistStatusButtons component with options to toggle therapist status.
 */

import { MenuItem } from '@headlessui/react';
import { Link } from 'react-router-dom';

interface TherapistStatusButtonsProps {
  toggleStatus: (status: string) => void;
}

export default function TherapistStatusButtons({
  toggleStatus,
}: TherapistStatusButtonsProps) {
  return (
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
  );
}
