/**
 * @function RegionModal
 *
 * A modal component that displays a list of all body regions and allows the user to manage them.
 * It uses the `useFetchBodyRegions` hook to fetch the body regions and display them in a table.
 * The modal also provides a button to close it and navigate to the add region modal.
 *
 * @param isOpen - A boolean indicating if the modal is open or closed.
 * @param onClose - A function to close the modal.
 * @param setIsAddRegionModalOpen - A function to open the add region modal.
 *
 * @returns {JSX.Element} - The modal UI component with a list of body regions and action buttons.
 *
 * @example
 * <RegionModal isOpen={true} onClose={handleClose} setIsAddRegionModalOpen={setIsAddRegionModalOpen} />
 *
 * @remarks
 * - The modal fetches the body regions using the `useFetchBodyRegions` hook when it is mounted.
 * - If the fetch is in progress, it displays a loading spinner (`DNALoader`).
 * - The modal also provides a button to cancel and close it.
 * - Any errors during fetching are displayed in a red error message.
 */

import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import DNALoader from '../../../../../../utils/DNALoader';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import { useFetchBodyRegionsMutation } from '../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/useFetchBodyRegionsMutation';
import BaseModal from '../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import CustomBtn from '../../../../generalComponents/CustomButton/CustomButtonRefactor';
import RegionTable from './RegionTable';

interface RegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAddRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegionModal({
  isOpen,
  onClose,
  setIsAddRegionModalOpen,
}: RegionModalProps) {
  // State to store all body regions fetched
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);
  const { errorMessage, setError } = useGlobalContext();

  const regionFetchMutation = useFetchBodyRegionsMutation(
    setBodyRegions,
    setError
  );

  useEffect(() => {
    regionFetchMutation.mutate();
  }, []);

  if (regionFetchMutation.isPending) {
    return DNALoader();
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Toutes les regions
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <RegionTable
          allBodyRegions={bodyRegions}
          setIsRegionModalOpen={onClose}
          setIsAddRegionModalOpen={setIsAddRegionModalOpen}
        />
      </div>

      <div className="flex gap-2 mt-6 w-fit mx-auto mb-4">
        <CustomBtn
          btn={{
            type: 'cancel',
            text: 'Annuler',
            style: 'normal',
            onClick: () => {
              onClose && onClose();
            },
          }}
        />
      </div>
    </BaseModal>
  );
}
