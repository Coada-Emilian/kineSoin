import { Button, MenuItem } from '@headlessui/react';
import type { AdminEntityStatusButtonsProps } from '../../../../../@types/props/adminProps';
import { getAdminEntityStatusButtonsDetails } from '../../../../../utils/functions/admin/adminEntityProfile/getAdminEntityStatusButtonsDetails';

export default function AdminEntityStatusButtons({
  entityType,
  entityStatus,
  setEntityStatus,
}: AdminEntityStatusButtonsProps) {
  const buttonDetails = getAdminEntityStatusButtonsDetails();

  // Filter out items based on entityType and current status
  const activeEntityDetails = buttonDetails.filter(
    (button) =>
      entityType === button.entityType && entityStatus !== button.status
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
                className={`block px-4 py-2 w-full text-sm text-gray-700 ${item.background} font-medium data-[focus]:${item.hoverBackground} data-focus:text-gray-900`}
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
