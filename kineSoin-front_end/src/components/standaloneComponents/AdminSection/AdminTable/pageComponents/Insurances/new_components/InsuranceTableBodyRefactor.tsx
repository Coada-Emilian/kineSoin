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
} from '../../../../../../../@types/standardInterfaces';
import { Button } from '@headlessui/react';

interface InsuranceTableBodyRefactorProps {
  openDeleteModal: (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion
  ) => void;
  renderedInsurances: IInsurance[];
}

export default function InsuranceTableBodyRefactor({
  renderedInsurances,
  openDeleteModal,
}: InsuranceTableBodyRefactorProps) {
  return renderedInsurances.map((insurance: IInsurance, index: number) => {
    const isLastRow = index === renderedInsurances.length - 1;
    return (
      <tr key={insurance.id} className="odd:bg-white even:bg-gray-50">
        <td
          className={`border border-gray-300 p-2 text-center ${
            isLastRow ? 'rounded-bl-2xl' : ''
          }`}
        >
          {insurance.id}
        </td>

        <td className="border border-gray-300 px-4 py-2 text-center">
          {insurance.name}
        </td>

        <td className="text-center border border-gray-300 ">
          {insurance.amc_code}
        </td>

        <td className="border border-gray-300 py-2 px-2 text-center">
          <Link
            to={`/admin/insurances/${insurance.id}`}
            className="block md:hidden"
          >
            <img src={editIcon} alt="edit" className="mx-auto w-10" />
          </Link>

          <Link
            to={`/admin/insurances/${insurance.id}`}
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
              openDeleteModal(insurance);
            }}
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex hover:scale-110"
            onClick={() => {
              openDeleteModal(insurance);
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
