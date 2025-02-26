import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import {
  IAffliction,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import { Button } from '@headlessui/react';

interface MedicTableBodyProps {
  openDeleteModal: (
    therapist?: ITherapist,
    patient?: IPatient,
    affliction?: IAffliction,
    medic?: IMedic
  ) => void;
  renderedMedics: IMedic[];
}

export default function MedicTableBody({
  openDeleteModal,
  renderedMedics,
}: MedicTableBodyProps) {
  return renderedMedics.map((medic: IMedic) => {
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
          <Link to={`/admin/medics/${medic.id}`} className="block md:hidden">
            <img src={editIcon} alt="edit" className="mx-auto w-10" />
          </Link>

          <Link
            to={`/admin/medics/${medic.id}`}
            className="w-25 items-center justify-center hidden md:flex"
          >
            <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
            <p className="text-blue-300 font-semibold">Inspecter</p>
          </Link>
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          <Button
            className="mx-auto block md:hidden"
            onClick={() => {
              openDeleteModal(undefined, undefined, undefined, medic);
            }}
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex"
            onClick={() => {
              openDeleteModal(undefined, undefined, undefined, medic);
            }}
          >
            <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
            <p className="text-red-600 font-semibold">Supprimer</p>
          </Button>
        </td>
      </tr>
    );
  });
}
