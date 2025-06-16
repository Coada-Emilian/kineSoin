import { useEffect, useState } from 'react';
import { getProfileStatusClassName } from '../../../../../../utils/functions/component_utils/page_components/admin_profile_details/getProfileStatusClassName';
import { getProfileStatusText } from '../../../../../../utils/functions/component_utils/page_components/admin_profile_details/getProfileStatusText';

interface StatusOutputRefactorProps {
  status: string | undefined;
}
export default function StatusOutputRefactor({
  status,
}: StatusOutputRefactorProps) {
  // State variables
  const [entityStatus, setEntityStatus] = useState(status ? status : '');

  // Set the entity status
  useEffect(() => {
    setEntityStatus(getProfileStatusText(status));
  }, [status]);

  if (!status) {
    return null;
  }

  return (
    <div className="mb-2 text-sm md:text-md lg:text-lg xl:text-xl ">
      <div className="flex gap-2 items-center">
        <h4 className="font-bold">Statut: </h4>
        <span
          className={`${getProfileStatusClassName(entityStatus)}py-1 px-2 rounded-xl font-semibold italic`}
        >
          {entityStatus}
        </span>
      </div>
    </div>
  );
}
