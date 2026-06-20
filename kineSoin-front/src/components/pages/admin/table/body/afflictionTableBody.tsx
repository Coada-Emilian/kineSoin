import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import type { IAffliction } from '../../../../../@types/interfaces/modelInterfaces';
import type { AfflictionTableBodyProps } from '../../../../../@types/props/customProps';
import { useAdminContext } from '../../../../../contexts/AdminContext/useAdminContext';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';

export default function AfflictionTableBodyRefactor({
  renderedAfflictions,
}: AfflictionTableBodyProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminContext();

  const handleAfflictionDeleteClick = (affliction: IAffliction) => {
    openDeleteModal(affliction);
  };

  return renderedAfflictions.map((affliction: IAffliction, index: number) => {
    // Check if the current row is the last row
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
              className="items-center justify-center hidden md:flex hover:scale-110"
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
                handleAfflictionDeleteClick(affliction);
              }}
            >
              <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
            </Button>

            <Button
              className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
              onClick={() => {
                handleAfflictionDeleteClick(affliction);
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
