/**
 * @component StatusOutputRefactor
 *
 * Displays the status of an entity with styled text and a status label.
 * Uses helper functions to convert status codes into user-friendly text and CSS class names.
 *
 * @param {Object} props
 * @param {string | undefined} props.status - The current status string of the entity.
 *
 * @returns {JSX.Element | null} A styled status display component or null if no status is provided.
 *
 * @description
 * - Internally manages the display status text state, updating when the input status changes.
 * - Applies dynamic CSS classes based on the status for visual distinction.
 *
 * @example
 * <StatusOutputRefactor status="active" />
 */

import { useEffect, useState } from 'react';
import { getProfileStatusClassName } from '../../../../../../utils/functions/adminSection/adminProfileDetails/getProfileStatusClassName';
import { getProfileStatusText } from '../../../../../../utils/functions/adminSection/adminProfileDetails/getProfileStatusText';

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
