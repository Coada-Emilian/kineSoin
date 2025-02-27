import { Button, MenuItem } from '@headlessui/react';
import { toggleStatusRefactor } from '../../utils/toggleStatusRefactor';
import { handlePatientStatusChanges } from '../../utils/handlePatientStatusChange';

interface StatusButtonsRefactorProps {
  setButtonMessage: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
  entityType: string;
  id?: number | null | undefined;
}

export default function StatusButtonsRefactor({
  setButtonMessage,
  setBackgroundColor,
  setEntityStatus,
  entityType,
  id,
}: StatusButtonsRefactorProps) {
  return (
    <div className=" w-full">
      {entityType === 'therapist' && (
        <>
          <MenuItem>
            <Button
              className="block px-4 w-full py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
              onClick={() =>
                toggleStatusRefactor('active', {
                  setButtonMessage,
                  setEntityStatus,
                  setBackgroundColor,
                })
              }
            >
              Active
            </Button>
          </MenuItem>

          <MenuItem>
            <Button
              className="block px-4 w-full py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
              onClick={() =>
                toggleStatusRefactor('inactive', {
                  setButtonMessage,
                  setEntityStatus,
                  setBackgroundColor,
                })
              }
            >
              Inactive
            </Button>
          </MenuItem>
        </>
      )}

      {entityType === 'patient' && (
        <>
          {' '}
          <MenuItem>
            <Button
              className="block px-4 py-2 w-full text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
              onClick={() => {
                toggleStatusRefactor('active', {
                  setButtonMessage,
                  setEntityStatus,
                  setBackgroundColor,
                });
                if (id) {
                  handlePatientStatusChanges(id, 'banned');
                }
              }}
            >
              Active
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              className="block px-4 py-2 w-full text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
              onClick={() => {
                toggleStatusRefactor('inactive', {
                  setButtonMessage,
                  setEntityStatus,
                  setBackgroundColor,
                });
                if (id) {
                  handlePatientStatusChanges(id, 'inactive');
                }
              }}
            >
              Inactive
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              className="block px-4 py-2 w-full text-sm text-gray-700 bg-yellow-300 font-medium data-[focus]:bg-yellow-500 data-[focus]:text-gray-900"
              onClick={() => {
                toggleStatusRefactor('pending', {
                  setButtonMessage,
                  setEntityStatus,
                  setBackgroundColor,
                });
                if (id) {
                  handlePatientStatusChanges(id, 'pending');
                }
              }}
            >
              Pending
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              className="block px-4 py-2 w-full text-sm text-gray-700 bg-red-300 font-medium data-[focus]:bg-red-500 data-[focus]:text-gray-900"
              onClick={() => {
                toggleStatusRefactor('banned', {
                  setButtonMessage,
                  setEntityStatus,
                  setBackgroundColor,
                });
                if (id) {
                  handlePatientStatusChanges(id, 'banned');
                }
              }}
            >
              Banned
            </Button>
          </MenuItem>
        </>
      )}
    </div>
  );
}
