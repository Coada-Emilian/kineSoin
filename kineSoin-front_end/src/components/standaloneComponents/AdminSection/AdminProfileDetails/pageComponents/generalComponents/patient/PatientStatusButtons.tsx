/**
 * @file PatientStatusButtons.tsx
 * @description A React functional component that provides buttons to change the status of a patient. It utilizes Headless UI's MenuItem and MenuItems components for dropdown functionality.
 *
 * @param {Object} props - The props for the PatientStatusButtons component.
 * @param {Function} props.toggleStatus - A function to toggle the status of the patient.
 * @param {Function} props.handlePatientStatusChanges - A function to handle changes to the patient's status, which is asynchronous and returns a promise.
 * @param {IPatient} props.patient - The patient object containing the patient's details, including their ID.
 *
 * @returns {JSX.Element} The rendered PatientStatusButtons component containing menu items for changing the patient's status.
 */

import { MenuItem, MenuItems } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { IPatient } from '../../../../../../../@types/types';

interface PatientStatusButtons {
  toggleStatus: (status: string) => void;
  handlePatientStatusChanges: (id: number, status: string) => Promise<void>;
  patient: IPatient;
}

export default function PatientStatusButtons({
  toggleStatus,
  handlePatientStatusChanges,
  patient,
}: PatientStatusButtons) {
  return (
    <MenuItems
      transition
      className="absolute left-0 z-10 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <div className="py-1">
        <MenuItem>
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 bg-green-300 font-medium data-[focus]:bg-green-500 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('active');
              handlePatientStatusChanges(patient.id, 'active');
            }}
          >
            Active
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 bg-gray-200 font-medium data-[focus]:bg-gray-400 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('inactive');
              handlePatientStatusChanges(patient.id, 'inactive');
            }}
          >
            Inactive
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 bg-yellow-300 font-medium data-[focus]:bg-yellow-500 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('pending');
              handlePatientStatusChanges(patient.id, 'pending');
            }}
          >
            Pending
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to="#"
            className="block px-4 py-2 text-sm text-gray-700 bg-red-300 font-medium data-[focus]:bg-red-500 data-[focus]:text-gray-900"
            onClick={() => {
              toggleStatus('banned');
              handlePatientStatusChanges(patient.id, 'banned');
            }}
          >
            Banned
          </Link>
        </MenuItem>
      </div>
    </MenuItems>
  );
}
