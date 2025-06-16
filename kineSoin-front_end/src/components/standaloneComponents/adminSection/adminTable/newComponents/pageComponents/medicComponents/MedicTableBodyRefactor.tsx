import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { IMedic } from '../../../../../../../@types/interfaces/modelInterfaces';
import { useAdminTableGlobalContext } from '../../../../../../../utils/contexts/AdminTableGlobalContext';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';

interface MedicTableBodyRefactorProps {
  renderedMedics: IMedic[];
}

export default function MedicTableBodyRefactor({
  renderedMedics,
}: MedicTableBodyRefactorProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminTableGlobalContext();

  const handleMedicDeleteClick = (medic: IMedic) => {
    openDeleteModal(medic);
  };

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
              handleMedicDeleteClick(medic);
            }}
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
            onClick={() => {
              handleMedicDeleteClick(medic);
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
