import { useEffect, useState } from 'react';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardTypes';

interface StatusOutputRefactorProps {
  entity: ITherapist | IPatient | IAffliction | IMedic | IInsurance | null;
}
export default function StatusOutputRefactor({
  entity,
}: StatusOutputRefactorProps) {
  const getStatusClassName = (status: string | undefined) => {
    switch (status) {
      case 'ACTIF':
        return 'bg-green-300 p-2 rounded-xl font-semibold';
      case 'INACTIF':
        return 'bg-gray-200 p-2 rounded-xl font-semibold';
      case 'EN ATTENTE':
        return 'bg-yellow-300 p-2 rounded-xl font-semibold';
      case 'BANNI':
        return 'bg-red-300 p-2 rounded-xl font-semibold';
      default:
        return 'bg-gray-200 p-2 rounded-xl font-semibold';
    }
  };

  const [entityStatus, setEntityStatus] = useState(
    entity && 'status' in entity ? entity.status : 'inactive'
  );

  useEffect(() => {
    if (entity && 'status' in entity) {
      if (entity.status === 'active') {
        setEntityStatus('ACTIF');
      } else if (entity.status === 'inactive') {
        setEntityStatus('INACTIF');
      } else if (entity.status === 'pending') {
        setEntityStatus('EN ATTENTE');
      } else if (entity.status === 'banned') {
        setEntityStatus('BANNI');
      }
    }
  }, [entity && 'status' in entity ? entity.status : undefined]);

  return (
    <div className="mb-2 md:mb-4 text-sm md:text-md lg:text-lg xl:text-xl ">
      <div className="flex gap-1 items-center">
        <h4 className="font-bold">Statut: </h4>
        <span
          className={`${getStatusClassName(entityStatus)} italic font-normal`}
        >
          {entityStatus}
        </span>
      </div>
    </div>
  );
}
