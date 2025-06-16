import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ITherapist } from '../../../../../../../@types/interfaces/modelInterfaces';
import { useAdminTableGlobalContext } from '../../../../../../../utils/contexts/AdminTableGlobalContext';
import { useTherapistStatusChangeMutation } from '../../../../../../../utils/functions/component_utils/page_components/admin_table/mutations/useTherapistStatusChangeMutation';
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

  const handleTherapistStatusChange = useTherapistStatusChangeMutation();

  return renderedTherapists.map((therapist: ITherapist, index: number) => {
    // Check if the current row is the last row
    const isLastRow = index === renderedTherapists.length - 1;

    const handleTherapistStatusClick = () => {
      const changedStatus =
        therapist.status === 'active' ? 'inactive' : 'active';
      handleTherapistStatusChange.mutate({
        id: therapist.id,
        status: changedStatus,
      });
    };

    const handleDeleteTherapistClick = () => {
      openDeleteModal(therapist);
    };

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
              onClick={handleTherapistStatusClick}
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
            onClick={handleDeleteTherapistClick}
            className="mx-auto block md:hidden"
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
            onClick={handleDeleteTherapistClick}
          >
            <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
            <p className="text-red-600 font-semibold">Supprimer</p>
          </Button>
        </td>
      </tr>
    );
  });
}
