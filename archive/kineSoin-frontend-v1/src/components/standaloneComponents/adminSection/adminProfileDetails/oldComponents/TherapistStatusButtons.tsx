import { Button, MenuItem } from '@headlessui/react';
import { toggleStatus } from './toggleStatus';

interface TherapistStatusButtonsProps {
  setButtonMessage: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setTherapistStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function TherapistStatusButtons({
  setButtonMessage,
  setBackgroundColor,
  setTherapistStatus,
}: TherapistStatusButtonsProps) {
  return (
    <div className="py-1">
      <MenuItem>
        <Button
          className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
          onClick={() =>
            toggleStatus('active', {
              setButtonMessage,
              setTherapistStatus,
              setBackgroundColor,
            })
          }
        >
          Active
        </Button>
      </MenuItem>

      <MenuItem>
        <Button
          className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
          onClick={() =>
            toggleStatus('inactive', {
              setButtonMessage,
              setTherapistStatus,
              setBackgroundColor,
            })
          }
        >
          Inactive
        </Button>
      </MenuItem>
    </div>
  );
}
