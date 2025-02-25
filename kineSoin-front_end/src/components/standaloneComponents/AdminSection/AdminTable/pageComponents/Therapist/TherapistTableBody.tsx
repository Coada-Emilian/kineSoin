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
} from '../../../../../../@types/standardTypes';
import { handleTherapistStatusChange } from '../../utils/handleStatusChange';
import { Button } from '@headlessui/react';

interface TherapistTableBodyProps {
  renderedTherapists: ITherapist[];

  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic
  ) => void;
}

export default function TherapistTableBody({
  renderedTherapists,

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
          <Button className="hidden md:block">
            <img
              src={refreshIcon}
              alt="change status"
              className="max-w-6 hover:animate-spin"
              onClick={() => handleTherapistStatusChange(therapist.id)}
            />
          </Button>

          <p>{therapist.status === 'active' ? 'ACTIF' : 'INACTIF'}</p>
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center ">
          <Link
            to={`/admin/therapists/${therapist.id}`}
            className="block md:hidden"
          >
            <img src={editIcon} alt="edit" className="mx-auto w-10 " />
          </Link>

          <Link
            to={`/admin/therapists/${therapist.id}`}
            className="w-25 items-center justify-center hidden md:flex"
          >
            <img src={editIcon} alt="edit" className="w-5 mx-1" />{' '}
            <p className="text-blue-300 font-semibold ">Inspecter</p>
          </Link>
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center ">
          <Button
            onClick={() =>
              openDeleteModal(therapist, undefined, undefined, undefined)
            }
            className="mx-auto block md:hidden"
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex"
            onClick={() =>
              openDeleteModal(therapist, undefined, undefined, undefined)
            }
          >
            <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
            <p className="text-red-600 font-semibold">Supprimer</p>
          </Button>
        </td>
      </tr>
    );
  });
}
