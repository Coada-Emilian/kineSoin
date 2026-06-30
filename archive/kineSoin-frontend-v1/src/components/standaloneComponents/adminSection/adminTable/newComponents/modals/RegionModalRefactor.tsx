/**
 * @component RegionModalRefactor
 *
 * Modal component that displays a list of body regions fetched from the admin API.
 *
 * @param {boolean} isOpen - Controls whether the modal is open or closed.
 * @param {() => void} onClose - Callback to close the modal.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddRegionModalOpen - Setter to control opening of the "Add Region" modal.
 *
 * @returns {JSX.Element} The modal UI showing body regions in a table or loading/error states.
 *
 * @details
 * - Fetches body regions when the modal opens and the current URL path includes 'afflictions'.
 * - Uses a mutation hook `useFetchBodyRegionsMutation` to perform fetching and manage state.
 * - Shows a loader while fetching, an error message if fetching fails, or a `RegionTable` with the data.
 * - Provides a cancel button to close the modal.
 */

import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import DNALoader from '../../../../../../utils/DNALoader';
import { useFetchBodyRegionsMutation } from '../../../../../../utils/functions/adminSection/adminTable/mutations/modalMutations/bodyRegionModalMutations/useFetchBodyRegionsMutation';
import CustomBtn from '../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from '../../../../privateSection/therapistSection/modals/BaseModal';
import RegionTable from './RegionTable';

interface RegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setIsAddRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegionModalRefactor({
  isOpen,
  onClose,
  setIsAddRegionModalOpen,
}: RegionModalProps) {
  // State to store all body regions fetched
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  // Mutation to fetch body regions
  const regionFetchMutation = useFetchBodyRegionsMutation(setBodyRegions);

  // Effect to fetch body regions when the modal opens and the path includes 'afflictions'
  useEffect(() => {
    if (isOpen && location.pathname.includes('afflictions')) {
      regionFetchMutation.mutate();
      console.log('Fetching body regions...');
    }
  }, [isOpen]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-4 p-8">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Toutes les regions
        </h2>

        {regionFetchMutation.isPending ? (
          DNALoader()
        ) : regionFetchMutation.error ? (
          <p className="text-red-500 text-xs text-center">
            {regionFetchMutation.error.message}
          </p>
        ) : (
          <RegionTable
            allBodyRegions={bodyRegions}
            setIsRegionModalOpen={onClose}
            setIsAddRegionModalOpen={setIsAddRegionModalOpen}
          />
        )}
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
