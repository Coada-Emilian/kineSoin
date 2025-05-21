/**
 * @function TherapistTableBodyRefactor
 *
 * This component renders the table body for a list of therapist entities.
 * It maps over an array of therapist data and displays each entry in a table row with details
 * such as `id`, `fullName`, and `status`. The status is color-coded based on the therapist's current state (active or inactive).
 * Each row includes options for inspecting and deleting the therapist.
 * The delete option triggers a modal via context to confirm the action, while the edit option navigates to the therapist's details page.
 * Additionally, it includes a button to change the therapist's status using a refresh icon that triggers a status toggle function.
 *
 * @param {Object} props - The component props.
 * @param {ITherapist[]} props.renderedTherapists - An array of therapist entities to be rendered as table rows.
 *
 * @returns {JSX.Element} - Returns a table body with rows representing each therapist entity.
 *
 * @example
 * <TherapistTableBodyRefactor renderedTherapists={therapistList} />
 *
 * @remarks
 * The component utilizes the `openDeleteModal` function from the `AdminTableGlobalContext` context
 * to handle the delete action. It also uses `Link` components to navigate to the therapist's details page.
 * The table rows adapt to different screen sizes using responsive Tailwind CSS classes, with different background colors for the status.
 * The refresh button triggers the `handleTherapistStatus` function to toggle the therapist's status between active and inactive.
 */

import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ITherapist } from '../../../../../../../@types/interfaces/modelInterfaces';
import { useAdminTableGlobalContext } from '../../../../../../../utils/contexts/AdminTableGlobalContext';
import { handleTherapistStatus } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/other_functions/toggleTherapistStatus';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';

interface TherapistTableBodyRefactorProps {
  renderedTherapists: ITherapist[];
}

export default function TherapistTableBodyRefactor({
  renderedTherapists,
}: TherapistTableBodyRefactorProps) {
  const { openDeleteModal } = useAdminTableGlobalContext();

  return renderedTherapists.map((therapist: ITherapist, index: number) => {
    // Check if the current row is the last row
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
              onClick={() => handleTherapistStatus(therapist.id)}
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
