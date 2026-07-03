import { Button, MenuItem } from '@headlessui/react';
import type { IAdminEditedEntity } from '../../../../../@types/interfaces/customInterfaces';
import type { AdminEntityStatusButtonsProps } from '../../../../../@types/props/adminProps';
import { getAdminEntityStatusButtonsDetails } from '../../../../../utils/functions/admin/adminEntityProfile/getAdminEntityStatusButtonsDetails';

export default function AdminEntityStatusButtons({
  entityType,
  entityStatus,
  setEditedEntity,
}: AdminEntityStatusButtonsProps) {
  const buttonDetails = getAdminEntityStatusButtonsDetails();

  // Filter out items based on entityType and current status
  const activeEntityDetails = buttonDetails.filter(
    (button) =>
      entityType === button.entityType && entityStatus !== button.status
  );

  const handleClick = (status: string) => {
    setEditedEntity((prev: IAdminEditedEntity) => ({
      ...prev,
      status,
    }));
  };

  return (
    <div className="w-full">
      {(entityType === 'therapist' || entityType === 'patient') && (
        <>
          {activeEntityDetails.map((item) => (
            <MenuItem key={item.status}>
              {({ focus }) => (
                <Button
                  className={`block px-4 py-2 w-full text-sm font-medium rounded-b cursor-pointer ${
                    focus ? item.hoverBackground : item.background
                  }`}
                  onClick={() => handleClick(item.status)}
                >
                  {item.text}
                </Button>
              )}
            </MenuItem>
          ))}
        </>
      )}
    </div>
  );
}
