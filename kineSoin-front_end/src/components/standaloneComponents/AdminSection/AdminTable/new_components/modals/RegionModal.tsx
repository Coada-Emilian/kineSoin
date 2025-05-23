import { useEffect, useState } from 'react';
import { IBodyRegion } from '../../../../../../@types/interfaces/modelInterfaces';
import DNALoader from '../../../../../../utils/DNALoader';
import { useFetchBodyRegionsMutation } from '../../../../../../utils/functions/component_utils/page_components/admin_table/modal_mutations/region_mutations/useFetchBodyRegionsMutation';
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

  const regionFetchMutation = useFetchBodyRegionsMutation(setBodyRegions);

  useEffect(() => {
    if (location.pathname.includes('affliction')) {
      regionFetchMutation.mutate();
    }
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

        {regionFetchMutation.error && (
          <p className="text-red-500 text-xs text-center">
            {regionFetchMutation.error.message}
          </p>
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
