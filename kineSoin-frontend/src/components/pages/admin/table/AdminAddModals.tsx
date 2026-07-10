import { useAdminContext } from '../../../../hooks/context/admin/useAdminContext';
import AddAfflictionModal from '../../../ui/modals/admin/AddAfflictionModal';
import AddBodyRegionModal from '../../../ui/modals/admin/AddBodyRegionModal';
import AddInsuranceModal from '../../../ui/modals/admin/AddInsuranceModal';
import AddMedicModal from '../../../ui/modals/admin/AddMedicModal';
import BodyRegionsModal from '../../../ui/modals/admin/bodyRegionsModal/BodyRegionsModal';

export default function AdminAddModals() {
  const { openModal, closeModal, setOpenModal } = useAdminContext();
  return (
    <>
      <AddAfflictionModal
        isOpen={openModal === 'addAffliction'}
        onClose={closeModal}
      />

      <AddMedicModal isOpen={openModal === 'addMedic'} onClose={closeModal} />

      <AddInsuranceModal
        isOpen={openModal === 'addInsurance'}
        onClose={closeModal}
      />

      <BodyRegionsModal
        isOpen={openModal === 'region'}
        onClose={closeModal}
        setIsAddRegionModalOpen={() => setOpenModal('addRegion')}
      />

      <AddBodyRegionModal
        isOpen={openModal === 'addRegion'}
        onClose={closeModal}
        setIsRegionModalOpen={() => setOpenModal('region')}
      />
    </>
  );
}
