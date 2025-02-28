import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardTypes';
import { Button } from '@headlessui/react';

interface AfflictionTableBodyRefactorProps {
  renderedAfflictions: IAffliction[];
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

export default function AfflictionTableBodyRefactor({
  renderedAfflictions,
  openDeleteModal,
}: AfflictionTableBodyRefactorProps) {
  return renderedAfflictions.map((affliction: IAffliction, index: number) => {
    const isLastRow = index === renderedAfflictions.length - 1;
    return (
      <tr
        key={affliction.id}
        className="odd:bg-white even:bg-gray-100 text-xxs xs:text-xs md:text-sm"
      >
        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-bl-2xl' : ''
          }`}
        >
          {affliction.id}
        </td>

        <td className="border border-gray-300 p-2 text-center">
          {affliction.name}
        </td>

        <td className="border border-gray-300 p-2 text-center">
          <p>{affliction.body_region?.name ?? 'N/A'}</p>
        </td>

        <td className="border border-gray-300 p-2 text-center hidden md:block">
          {affliction.insurance_code}
        </td>

        <>
          <td className="border border-gray-300 p-2 text-center">
            <Link
              to={`/admin/afflictions/${affliction.id}`}
              className="block md:hidden"
            >
              <img src={editIcon} alt="edit" className="mx-auto w-8" />
            </Link>

            <Link
              to={`/admin/afflictions/${affliction.id}`}
              className="w-25 items-center justify-center hidden md:flex hover:scale-110"
            >
              <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
              <p className="text-blue-300 font-semibold">Inspecter</p>
            </Link>
          </td>

          <td
            className={`border border-gray-300 p-2 text-center ${
              isLastRow ? 'rounded-br-2xl' : ''
            }`}
          >
            <Button
              className="mx-auto block md:hidden"
              onClick={() => {
                openDeleteModal(affliction);
              }}
            >
              <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
            </Button>

            <Button
              className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
              onClick={() => {
                openDeleteModal(affliction);
              }}
            >
              <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
              <p className="text-red-600 font-semibold">Supprimer</p>
            </Button>
          </td>
        </>
      </tr>
    );
  });
}
