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
