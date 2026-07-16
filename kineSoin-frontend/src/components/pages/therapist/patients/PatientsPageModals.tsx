import { useTherapistUiContext } from '../../../../hooks/context/therapist/useTherapistUiContext';
import PatientDetailsModal from '../../../ui/modals/therapist/patientDetails/PatientDetailsModal';
import PatientHistoryModal from '../../../ui/modals/therapist/patientHistory/PatientHistoryModal';
import ExtendedSendMessageModal from '../../../ui/modals/therapist/sendMessage/ExtendedSendMessageModal';

export default function PatientsPageModals() {
  const { openModal, closeModal } = useTherapistUiContext();
  return (
    <>
      <PatientDetailsModal
        isOpen={openModal === 'patientDetails'}
        onClose={closeModal}
      />

      <ExtendedSendMessageModal
        isOpen={openModal === 'extendedMessage'}
        onClose={closeModal}
      />

      <PatientHistoryModal
        isOpen={openModal === 'history'}
        onClose={closeModal}
      />
    </>
  );
}
