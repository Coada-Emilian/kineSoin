// Purpose: Display the body of the table with therapist data.

import { Link } from 'react-router-dom';
import deleteIcon from '/icons/delete.png';
import editIcon from '/icons/edit.png';
import refreshIcon from '/icons/refresh.png';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import { handleTherapistStatusChange } from '../../utils/handleStatusChange';
import { Button } from '@headlessui/react';

interface TBodyRefactorsProps {
  renderedEntities:
    | ITherapist[]
    | IPatient[]
    | IAffliction[]
    | IMedic[]
    | IInsurance[];
}

export default function TBodyRefactors({
  renderedEntities,
  //   openDeleteModal,
}: TBodyRefactorsProps) {
  return renderedEntities.map((entity) => {
    return (
      <tr
        key={entity.id}
        className="odd:bg-white even:bg-gray-100 text-xxs xs:text-xs md:text-sm"
      >
        <td className="border border-gray-300 p-2 text-center">{entity.id}</td>

        <td className="border border-gray-300 p-2 text-center">
          {'fullName' in entity ? entity.fullName : ''} {entity.name}
        </td>

        {'status' in entity &&
          (entity.status === 'active' || entity.status === 'inactive' ? (
            <td
              className={`border border-gray-300 ${
                entity.status === 'active' ? 'bg-green-300' : 'bg-gray-200'
              } p-2 text-center flex gap-1 items-center justify-center`}
            >
              <Button className="hidden md:block">
                <img
                  src={refreshIcon}
                  alt="change status"
                  className="max-w-6 hover:animate-spin"
                  onClick={() => handleTherapistStatusChange(entity.id)}
                />
              </Button>
              <p>{entity.status === 'active' ? 'ACTIF' : 'INACTIF'}</p>
            </td>
          ) : entity.status === 'pending' || entity.status === 'banned' ? (
            <td
              className={`border border-gray-300 ${
                entity.status === 'pending' ? 'bg-yellow-300' : 'bg-red-300'
              } p-2 text-center flex gap-1 items-center justify-center`}
            >
              <p>{entity.status === 'pending' ? 'EN ATTENTE' : 'BANNI'}</p>
            </td>
          ) : null)}

        {/* <td className="border border-gray-300 p-2 text-center ">
          <Link
            to={`/admin/therapists/${therapist.id}`}
            className="block md:hidden"
          >
            <img src={editIcon} alt="edit" className="mx-auto w-8" />
          </Link>

          <Link
            to={`/admin/therapists/${therapist.id}`}
            className="w-25 items-center justify-center hidden md:flex"
          >
            <img src={editIcon} alt="edit" className="w-5 h-5 mx-1" />{' '}
            <p className="text-blue-300 font-semibold ">Inspecter</p>
          </Link>
        </td>

        <td className="border border-gray-300 p-2 text-center ">
          <Button
            onClick={() =>
              openDeleteModal(therapist, undefined, undefined, undefined)
            }
            className="mx-auto block md:hidden"
          >
            <img src={deleteIcon} alt="delete" className="w-5 mx-1" />
          </Button>

          <Button
            className="w-25 mx-auto items-center hidden md:flex"
            onClick={() =>
              openDeleteModal(therapist, undefined, undefined, undefined)
            }
          >
            <img src={deleteIcon} alt="supprimer" className="w-5 mx-1" />
            <p className="text-red-600 font-semibold">Supprimer</p>
          </Button>
        </td> */}
      </tr>
    );
  });
}
