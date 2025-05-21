import { Button, MenuItem } from '@headlessui/react';
import DNALoader from '../../../../../../../utils/DNALoader';
import { usePatientStatusChangeMutation } from '../../../../../../../utils/functions/component_utils/page_components/admin_profile_details/mutations/usePatientStatusChangeMutation';
import { useTherapistStatusChangeMutation } from '../../../../../../../utils/functions/component_utils/page_components/admin_profile_details/mutations/useTherapistStatusChangeMutation';
import { getStatusButtonsItemDetails } from './getStatusButtonsItemDetails';

interface StatusButtonsRefactorProps {
  entityType: string;
  id?: number | null | undefined;
  entityStatus: string;
}

export default function StatusButtonsRefactor({
  entityType,
  id,
  entityStatus,
}: StatusButtonsRefactorProps) {
  const handleTherapistStatusChange = useTherapistStatusChangeMutation();
  const handlePatientStatusChange = usePatientStatusChangeMutation();

  if (
    handleTherapistStatusChange.isPending ||
    handlePatientStatusChange.isPending
  ) {
    return DNALoader();
  }

  const itemDetails = getStatusButtonsItemDetails({
    handlePatientStatusChange,
    handleTherapistStatusChange,
  });

  // Filter out items based on entityType and current status
  const activeEntityDetails = itemDetails.filter(
    (item) => entityType === item.entityType && entityStatus !== item.status
  );

  return (
    <div className="w-full">
      {(entityType === 'therapist' || entityType === 'patient') && (
        <>
          {activeEntityDetails.map((item) => (
            <MenuItem key={item.status}>
              <Button
                className={`block px-4 py-2 w-full text-sm text-gray-700 ${item.background} font-medium data-[focus]:${item.hoverBackground} data-[focus]:text-gray-900`}
                onClick={() => {
                  if (id) {
                    item.function.mutate({
                      id,
                      status: item.status,
                    });
                  }
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
