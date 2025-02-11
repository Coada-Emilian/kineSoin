/**
 * @file MedicTableBody.tsx
 * @description A React functional component that renders the body of a table displaying medic information. It maps over an array of medics, generating table rows with details and actions (edit and delete) for each medic entry.
 *
 * @param {Object} props - The props for the MedicTableBody component.
 * @param {number} props.windowWidth - The current width of the window, used to conditionally render styles and content based on the screen size.
 * @param {function} props.openDeleteModal - A function to open the delete confirmation modal for a specific medic, receiving the medic as an argument.
 * @param {IMedic[]} props.allMedics - An array of medic objects to be displayed in the table.
 *
 * @returns {JSX.Element} The rendered table body containing rows for each medic, with action buttons for editing and deleting entries.
 */

import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import {
  IAffliction,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/types';

interface MedicTableBodyProps {
  windowWidth: number;
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic
  ) => void;
  allMedics: IMedic[];
}

export default function MedicTableBody({
  windowWidth,
  openDeleteModal,
  allMedics,
}: MedicTableBodyProps) {
  return allMedics.map((medic: IMedic) => {
    return (
      <tr key={medic.id} className="odd:bg-white even:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2 text-center">
          {medic.id}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {medic.fullName}
        </td>

        <td>
          <div className="border border-gray-300 px-4 py-2 text-center">
            {medic.licence_code}
          </div>
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {windowWidth < 768 ? (
            <Link to={`/admin/medics/${medic.id}`}>
              <img
                src={editIcon}
                alt="edit"
                className={windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'}
              />
            </Link>
          ) : (
            <Link
              to={`/admin/medics/${medic.id}`}
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
                openDeleteModal(undefined, undefined, undefined, medic);
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
                openDeleteModal(undefined, undefined, undefined, medic);
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
