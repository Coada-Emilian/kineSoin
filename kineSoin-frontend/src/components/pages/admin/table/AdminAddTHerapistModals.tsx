import { useAdminContext } from '../../../../hooks/context/admin/useAdminContext';
import FirstAddTherapistModal from '../../../ui/modals/admin/addTherapist/FirstAddTherapistModal';
import SecondAddTherapistModal from '../../../ui/modals/admin/addTherapist/SecondAddTherapistModal';
import ThirdAddTherapistModal from '../../../ui/modals/admin/addTherapist/ThirdAddTherapistModal';

export default function AdminAddTherapistModals() {
  const { openModal, closeModal, setOpenModal } = useAdminContext();
  return (
    <>
      <FirstAddTherapistModal
        onClose={closeModal}
        isOpen={openModal === 'addTherapistP1'}
        setIsAddTherapistModalP2Open={() => setOpenModal('addTherapistP2')}
      />
      <SecondAddTherapistModal
        isOpen={openModal === 'addTherapistP2'}
        onClose={closeModal}
        setIsAddTherapistModalP3Open={() => setOpenModal('addTherapistP3')}
      />
      <ThirdAddTherapistModal
        isOpen={openModal === 'addTherapistP3'}
        onClose={closeModal}
      />
    </>
  );
}
