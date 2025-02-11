// Purpose: Display the body of the table with therapist data.

import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';
import {
  IAffliction,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/types';

interface TherapistTableBodyProps {
  renderedTherapists: ITherapist[];
  windowWidth: number;
  handleStatusChange: (id: number) => void;
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic
  ) => void;
}

export default function TherapistTableBody({
  renderedTherapists,
  windowWidth,
  handleStatusChange,
  openDeleteModal,
}: TherapistTableBodyProps) {
  return renderedTherapists.map((therapist: ITherapist) => {
    return (
      <tr key={therapist.id} className="odd:bg-white even:bg-gray-50">
        <td className="border border-gray-300 px-4 py-2 text-center">
          {therapist.id}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {therapist.fullName}
        </td>

        <td
          className={`border border-gray-300 ${
            therapist.status === 'active' ? 'bg-green-300' : 'bg-gray-200'
          } px-4 py-2 text-center flex gap-1 items-center justify-center`}
        >
          <Link to="#" className="hidden md:block">
            <img
              src={refreshIcon}
              alt="change status"
              className="max-w-6"
              onClick={() => handleStatusChange(therapist.id)}
            />
          </Link>

          <p>{therapist.status.toUpperCase()}</p>
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {windowWidth < 768 ? (
            <Link to={`/admin/therapists/${therapist.id}`}>
              <img
                src={editIcon}
                alt="edit"
                className={windowWidth < 450 ? 'w-10 mx-auto' : 'w-5 mx-auto'}
              />
            </Link>
          ) : (
            <Link
              to={`/admin/therapists/${therapist.id}`}
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
              onClick={() =>
                openDeleteModal(therapist, undefined, undefined, undefined)
              }
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
              onClick={() =>
                openDeleteModal(therapist, undefined, undefined, undefined)
              }
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
