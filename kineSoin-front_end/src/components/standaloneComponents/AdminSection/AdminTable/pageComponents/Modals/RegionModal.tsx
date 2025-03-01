import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import AdminTable from '../../old_components/AdminTable';
import {
  IAffliction,
  IBodyRegion,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../@types/standardTypes';
import BaseModal from '../../../../PrivateSection/TherapistSection/Modals/BaseModal';
import RegionTable from '../../RegionTable';
import CustomButton from '../../../../generalComponents/CustomButton/CustomButton';
import { fetchBodyRegionsAsAdmin } from '../../../../../../utils/apiUtils/adminApiUtils/adminBodyRegionApiUtils';

interface RegionModalProps {
  isOpen: boolean;
  onClose: () => void;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setIsAddRegionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDeleteModal: (
    entity:
      | ITherapist
      | IPatient
      | IAffliction
      | IMedic
      | IInsurance
      | IBodyRegion
  ) => void;
}

export default function RegionModal({
  isOpen,
  onClose,
  setErrorMessage,
  setIsAddRegionModalOpen,
  errorMessage,
  openDeleteModal,
}: RegionModalProps) {
  // State to store all body regions fetched
  const [bodyRegions, setBodyRegions] = useState<IBodyRegion[]>([]);

  useEffect(() => {
    fetchBodyRegionsAsAdmin().then((bodyRegions) => {
      setBodyRegions(bodyRegions);
    });
  }, []);

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
          openDeleteModal={openDeleteModal}
        />
      </div>
      <div className="flex gap-2 mt-6 w-fit mx-auto mb-4">
        <CustomButton
          btnText="Annuler"
          btnType="button"
          mobileCancelButton
          onClick={() => {
            onClose && onClose();
          }}
        />
      </div>
    </BaseModal>
  );
}
