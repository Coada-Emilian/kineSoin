// Purpose: Display the body of the table with therapist data.

import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/interfaces/modelInterfaces';
import { handleTherapistStatusChange } from '../../../../../../../utils/functions/adminSection/adminTable/otherFunctions/handleTherapistStatusChange';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';

interface TherapistTableBodyProps {
  renderedTherapists: ITherapist[];
  openDeleteModal: (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion
  ) => void;
}

export default function TherapistTableBody({
  renderedTherapists,
  openDeleteModal,
}: TherapistTableBodyProps) {
  return renderedTherapists.map((therapist: ITherapist, index: number) => {
    const isLastRow = index === renderedTherapists.length - 1;
    return (
      <tr
        key={therapist.id}
        className="odd:bg-white even:bg-gray-100 text-xxs xs:text-xs md:text-sm"
      >
        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-bl-2xl' : ''
          }`}
        >
          {therapist.id}
        </td>

        <td className="border border-gray-300 p-2 text-center">
          {therapist.fullName}
        </td>

        <td
          className={`border border-gray-300 ${
            therapist.status === 'active' ? 'bg-green-300' : 'bg-gray-200'
          } p-2 text-center flex gap-1 items-center justify-center font-medium`}
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

        <td className="border border-gray-300 p-2 text-center ">
          <Link
            to={`/admin/therapists/${therapist.id}`}
            className="block md:hidden"
          >
            <img src={editIcon} alt="edit" className="mx-auto w-6" />
          </Link>

          <Link
            to={`/admin/therapists/${therapist.id}`}
            className="w-25 items-center justify-center hidden md:flex hover:scale-110"
          >
            <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
            <p className="text-blue-300 font-semibold ">Inspecter</p>
          </Link>
        </td>

        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-br-2xl' : ''
          }`}
        >
          <Button
            onClick={() => openDeleteModal(therapist)}
            className="mx-auto block md:hidden"
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
            onClick={() => openDeleteModal(therapist)}
          >
            <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
            <p className="text-red-600 font-semibold">Supprimer</p>
          </Button>
        </td>
      </tr>
    );
  });
}
