/**
 * @component StatusButtonsRefactor
 *
 * Displays a set of status buttons for a given entity type (e.g., therapist or patient),
 * allowing the user to change the entity's status.
 *
 * It filters available status options based on the current status and entity type,
 * then renders buttons to switch to other valid statuses.
 *
 * @param {Object} props
 * @param {string} props.entityType - The type of entity (e.g., 'therapist' or 'patient').
 * @param {string} props.entityStatus - The current status of the entity.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setEntityStatus -
 *   Function to update the entity's status.
 * @param {number | null | undefined} [props.id] - Optional entity ID (not used directly here).
 *
 * @returns {JSX.Element} A set of buttons to select and update the entity's status.
 *
 * @example
 * <StatusButtonsRefactor
 *   entityType="therapist"
 *   entityStatus="active"
 *   setEntityStatus={setStatus}
 * />
 */

import { Button, MenuItem } from '@headlessui/react';
import { getStatusButtonsItemDetails } from '../../../../../utils/functions/adminSection/adminMain/getStatusButtonsItemDetails';

interface StatusButtonsRefactorProps {
  entityType: string;
  id?: number | null | undefined;
  entityStatus: string;
  setEntityStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function StatusButtonsRefactor({
  entityType,
  entityStatus,
  setEntityStatus,
}: StatusButtonsRefactorProps) {
  const itemDetails = getStatusButtonsItemDetails();

  // Filter out items based on entityType and current status
  const activeEntityDetails = itemDetails.filter(
    (item) => entityType === item.entityType && entityStatus !== item.status
  );

  const handleClick = (status: string) => {
    setEntityStatus(status);
  };

  return (
    <div className="w-full">
      {(entityType === 'therapist' || entityType === 'patient') && (
        <>
          {activeEntityDetails.map((item) => (
            <MenuItem key={item.status}>
              <Button
                className={`block px-4 py-2 w-full text-sm text-gray-700 ${item.background} font-medium data-[focus]:${item.hoverBackground} data-[focus]:text-gray-900`}
                onClick={() => {
                  handleClick(item.status);
                }}
              >
                {item.text}
              </Button>
            </MenuItem>
          ))}
        </>
      )}
    </div>
  );
}
