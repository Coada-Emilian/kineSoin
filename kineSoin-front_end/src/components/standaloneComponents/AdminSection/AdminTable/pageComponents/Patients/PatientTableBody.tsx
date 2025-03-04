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
} from '../../../../../../@types/standardInterfaces';
import { Button } from '@headlessui/react';

interface PatientTableBodyProps {
  renderedPatients: IPatient[];
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

export default function PatientTableBody({
  renderedPatients,
  openDeleteModal,
}: PatientTableBodyProps) {
  return renderedPatients.map((patient: IPatient, index: number) => {
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
          className={`border border-gray-300 ${
            patient.status === 'active'
              ? 'bg-green-300'
              : patient.status === 'pending'
                ? 'bg-yellow-300'
                : patient.status === 'banned'
                  ? 'bg-red-300'
                  : 'bg-gray-200'
          } px-4 py-2 text-center flex gap-1 items-center font-medium justify-center`}
        >
          <p>
            {patient.status === 'active'
              ? 'ACTIF'
              : patient.status === 'inactive'
                ? 'INACTIF'
                : patient.status === 'banned'
                  ? 'BANNI'
                  : 'EN ATTENTE'}
          </p>
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
            onClick={() => {
              openDeleteModal(patient);
            }}
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
            onClick={() => {
              openDeleteModal(patient);
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
