/**
 * @file PatientTableBody.tsx
 * @description A React functional component that renders a table body for displaying a list of patients. Each row includes patient details and actions for editing and deleting the patient.
 *
 * @param {Object} props - The props for the PatientTableBody component.
 * @param {IPatient[]} props.renderedPatients - An array of patient objects to be displayed in the table.
 * @param {number} props.windowWidth - The current width of the window, used to adjust the layout and size of the icons.
 * @param {function} props.openDeleteModal - A function to open a modal for deleting a patient. Accepts optional therapist, patient, affliction, and medic parameters.
 *
 * @returns {JSX.Element} The rendered table body rows containing patient data, including ID, full name, status, and action buttons for editing and deleting.
 */

import { Link } from 'react-router-dom';
import { ITherapist } from '../../../../../../@types/ITherapist';
import { IPatient } from '../../../../../../@types/IPatient';
import { IAffliction } from '../../../../../../@types/IAffliction';
import { IMedic } from '../../../../../../@types/IMedic';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import { useEffect } from 'react';

interface PatientTableBodyProps {
  renderedPatients: IPatient[];
  windowWidth: number;
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic
  ) => void;
}

export default function PatientTableBody({
  renderedPatients,
  windowWidth,
  openDeleteModal,
}: PatientTableBodyProps) {
  return renderedPatients.map((patient: IPatient) => {
    return (
      <tr key={patient.id} className="odd:bg-white even:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2 text-center">
          {patient.id}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {patient.fullName}
        </td>

        <td
          className={`border border-gray-300 ${
            patient.status === 'active'
              ? 'bg-green-300'
              : patient.status === 'pending'
                ? 'bg-yellow-300'
                : patient.status === 'banned'
                  ? 'bg-red-300'
                  : 'bg-gray-200'
          } px-4 py-2 text-center flex gap-1 items-center justify-center`}
        >
          <p>{patient.status.toUpperCase()}</p>
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {windowWidth < 768 ? (
            <Link to={`/admin/patients/${patient.id}`}>
              <img
                src={editIcon}
                alt="edit"
                className={windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'}
              />
            </Link>
          ) : (
            <Link
              to={`/admin/patients/${patient.id}`}
              className="w-25 flex items-center justify-center"
            >
              <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
              <p className="text-blue-300 font-semibold">Inspecter</p>
            </Link>
          )}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {windowWidth < 768 ? (
            <Link
              to="#"
              className="w-12"
              onClick={() => {
                openDeleteModal(undefined, patient, undefined, undefined);
              }}
            >
              <img
                src={deleteIcon}
                alt="delete"
                className={windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'}
              />
            </Link>
          ) : (
            <Link
              to="#"
              className="w-25 flex justify-center items-center"
              onClick={() => {
                openDeleteModal(undefined, patient, undefined, undefined);
              }}
            >
              <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
              <p className="text-red-600 font-semibold">Supprimer</p>
            </Link>
          )}
        </td>
      </tr>
    );
  });
}
