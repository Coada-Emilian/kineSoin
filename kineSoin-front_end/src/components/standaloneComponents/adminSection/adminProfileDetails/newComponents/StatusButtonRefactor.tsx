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
  id,
  entityStatus,
  setEntityStatus,
}: StatusButtonsRefactorProps) {
  // const handleTherapistStatusChange = useTherapistStatusChangeMutation();
  // const handlePatientStatusChange = usePatientStatusChangeMutation();

  // if (
  //   handleTherapistStatusChange.isPending ||
  //   handlePatientStatusChange.isPending
  // ) {
  //   return DNALoader();
  // }

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
