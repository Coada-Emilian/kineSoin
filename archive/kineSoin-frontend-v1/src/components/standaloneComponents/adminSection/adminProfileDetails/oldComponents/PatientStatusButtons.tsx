import { Button, MenuItem, MenuItems } from '@headlessui/react';
import { IPatient } from '../../../../../@types/interfaces/modelInterfaces';
import { toggleStatus } from './toggleStatus';

interface PatientStatusButtons {
  handlePatientStatusChanges: (id: number, status: string) => Promise<void>;
  patient: IPatient;

  setButtonMessage: React.Dispatch<React.SetStateAction<string>>;
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setTherapistStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function PatientStatusButtons({
  handlePatientStatusChanges,
  patient,

  setButtonMessage,
  setBackgroundColor,
  setTherapistStatus,
}: PatientStatusButtons) {
  return (
    <MenuItems
      transition
      className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="py-1">
        <MenuItem>
          <Button
            className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('active', {
                setButtonMessage,
                setTherapistStatus,
                setBackgroundColor,
              });
              handlePatientStatusChanges(patient.id, 'active');
            }}
          >
            Active
          </Button>
        </MenuItem>

        <MenuItem>
          <Button
            className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('inactive', {
                setButtonMessage,
                setTherapistStatus,
                setBackgroundColor,
              });
              handlePatientStatusChanges(patient.id, 'inactive');
            }}
          >
            Inactive
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            className="block px-4 py-2 text-sm text-gray-700 bg-yellow-300 font-medium data-[focus]:bg-yellow-500 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('pending', {
                setButtonMessage,
                setTherapistStatus,
                setBackgroundColor,
              });
              handlePatientStatusChanges(patient.id, 'pending');
            }}
          >
            Pending
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            className="block px-4 py-2 text-sm text-gray-700 bg-red-300 font-medium data-[focus]:bg-red-500 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('banned', {
                setButtonMessage,
                setTherapistStatus,
                setBackgroundColor,
              });
              handlePatientStatusChanges(patient.id, 'banned');
            }}
          >
            Banned
          </Button>
        </MenuItem>
      </div>
    </MenuItems>
  );
}
