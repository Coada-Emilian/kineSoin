import { useEffect, useState } from 'react';

interface StatusOutputRefactorProps {
  status: string | undefined;
}
export default function StatusOutputRefactor({
  status,
}: StatusOutputRefactorProps) {
  // Function to get the status class name
  const getStatusClassName = (status: string | undefined) => {
    switch (status) {
      case 'ACTIF':
        return 'bg-green-300 ';
      case 'INACTIF':
        return 'bg-gray-200 ';
      case 'EN ATTENTE':
        return 'bg-yellow-300 ';
      case 'BANNI':
        return 'bg-red-300 ';
      default:
        return 'bg-gray-200 ';
    }
  };

  // State variables
  const [entityStatus, setEntityStatus] = useState(status ? status : '');

  // Set the entity status
  useEffect(() => {
    if (status) {
      if (status === 'active') {
        setEntityStatus('ACTIF');
      } else if (status === 'inactive') {
        setEntityStatus('INACTIF');
      } else if (status === 'pending') {
        setEntityStatus('EN ATTENTE');
      } else if (status === 'banned') {
        setEntityStatus('BANNI');
      }
    }
  }, [status]);

  if (!status) {
    return null;
  }

  return (
    <div className="mb-2 text-sm md:text-md lg:text-lg xl:text-xl ">
      <div className="flex gap-2 items-center">
        <h4 className="font-bold">Statut: </h4>
        <span
          className={`${getStatusClassName(entityStatus)}py-1 px-2 rounded-xl font-semibold italic`}
        >
          {entityStatus}
        </span>
      </div>
    </div>
  );
}
