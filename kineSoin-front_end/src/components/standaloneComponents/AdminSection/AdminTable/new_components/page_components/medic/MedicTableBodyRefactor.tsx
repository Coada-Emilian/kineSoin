/**
 * @function MedicTableBodyRefactor
 *
 * This component renders the table body for a list of medic entities.
 * It maps over an array of medic data and displays each entry in a table row with details
 * such as `id`, `fullName`, and `licence_code`. Each row includes options for inspecting and deleting the medic.
 * The delete option triggers a modal via context to confirm the action, while the edit option navigates to the medic details page.
 *
 * @param {Object} props - The component props.
 * @param {IMedic[]} props.renderedMedics - An array of medic entities to be rendered as table rows.
 *
 * @returns {JSX.Element} - Returns a table body with rows representing each medic entity.
 *
 * @example
 * <MedicTableBodyRefactor renderedMedics={medicList} />
 *
 * @remarks
 * The component utilizes the `openDeleteModal` function from the `AdminTableGlobalContext` context
 * to handle the delete action. It also uses `Link` components to navigate to the medic's details page.
 * The table rows adapt to different screen sizes using responsive Tailwind CSS classes.
 */

import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import { IMedic } from '../../../../../../../@types/standardInterfaces';
import { Button } from '@headlessui/react';
import { useAdminTableGlobalContext } from '../../../../../../../utils/contexts/AdminTableGlobalContext';

interface MedicTableBodyRefactorProps {
  renderedMedics: IMedic[];
}

export default function MedicTableBodyRefactor({
  renderedMedics,
}: MedicTableBodyRefactorProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminTableGlobalContext();

  return renderedMedics.map((medic: IMedic, index: number) => {
    // Check if the current row is the last row
    const isLastRow = index === renderedMedics.length - 1;

    return (
      <tr key={medic.id} className="odd:bg-white even:bg-gray-50">
        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-bl-2xl' : ''
          }`}
        >
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
              openDeleteModal(medic);
            }}
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
            onClick={() => {
              openDeleteModal(medic);
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
