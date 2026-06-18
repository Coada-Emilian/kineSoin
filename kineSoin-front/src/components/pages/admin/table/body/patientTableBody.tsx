import { Button } from '@headlessui/react';
import { Link } from 'react-router-dom';
import type { IPatient } from '../../../../../@types/interfaces/modelInterfaces';
import type { PatientTableBodyProps } from '../../../../../@types/props/customProps';
import { useAdminContext } from '../../../../../contexts/AdminContext/useAdminContext';
import { getPatientTableBodyStatusText } from '../../../../../utils/functions/admin/adminTable/getPatientBodyStatusText';
import { getPatientTableBodyStatusBackgroundColor } from '../../../../../utils/functions/admin/adminTable/getPatientTableBodyStatusBackgroundColor';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';

export default function PatientTableBody({
  renderedPatients,
}: PatientTableBodyProps) {
  // Get the openDeleteModal function from the context
  const { openDeleteModal } = useAdminContext();

  const handlePatientDeleteClick = (patient: IPatient) => {
    openDeleteModal(patient);
  };

  return renderedPatients.map((patient: IPatient, index: number) => {
    // Check if the current row is the last row
    const isLastRow = index === renderedPatients.length - 1;

    return (
      <tr key={patient.id} className="odd:bg-white even:bg-gray-50">
        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-bl-2xl' : ''
          }`}
        >
          {patient.id}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {patient.fullName}
        </td>

        <td
          className={`border border-gray-300 ${getPatientTableBodyStatusBackgroundColor(
            patient.status
          )} px-4 py-2 text-center flex gap-1 items-center font-medium justify-center`}
        >
          <p>{`${getPatientTableBodyStatusText(patient.status)}`}</p>
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          <Link
            to={`/admin/patients/${patient.id}`}
            className="block md:hidden"
          >
            <img src={editIcon} alt="edit" className="mx-auto w-10" />
          </Link>

          <Link
            to={`/admin/patients/${patient.id}`}
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
            onClick={() => handlePatientDeleteClick(patient)}
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
            onClick={() => handlePatientDeleteClick(patient)}
          >
            <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
            <p className="text-red-600 font-semibold">Supprimer</p>
          </Button>
        </td>
      </tr>
    );
  });
}
