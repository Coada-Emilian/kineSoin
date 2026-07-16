import { useTherapistUiContext } from '../../../../hooks/context/therapist/useTherapistUiContext';
import AfflictionDetailsModal from '../../../ui/modals/therapist/afflictionDetails/AfflictionDetailsModal';
import CancelAppointmentModal from '../../../ui/modals/therapist/cancelAppointment/CancelAppointmentModal';
import ExtendedCancelAppointmentModal from '../../../ui/modals/therapist/cancelAppointment/ExtendedCancelAppointmentModal';
import PatientDetailsModal from '../../../ui/modals/therapist/patientDetails/PatientDetailsModal';
import PatientHistoryModal from '../../../ui/modals/therapist/patientHistory/PatientHistoryModal';
import PrescriptionDetailsModal from '../../../ui/modals/therapist/prescriptionDetails/PrescriptionDetailsModal';
import ExtendedSendMessageModal from '../../../ui/modals/therapist/sendMessage/ExtendedSendMessageModal';
import SendMessageModal from '../../../ui/modals/therapist/sendMessage/SendMessageModal';

export default function TherapistDashboardModals() {
  const { openModal, closeModal } = useTherapistUiContext();

  return (
    <>
      <PatientDetailsModal
        isOpen={openModal === 'patientDetails'}
        onClose={closeModal}
      />

      <SendMessageModal isOpen={openModal === 'message'} onClose={closeModal} />

      <ExtendedSendMessageModal
        isOpen={openModal === 'extendedMessage'}
        onClose={closeModal}
      />

      <CancelAppointmentModal
        isOpen={openModal === 'cancel'}
        onClose={closeModal}
      />

      <ExtendedCancelAppointmentModal
        isOpen={openModal === 'extendedCancel'}
        onClose={closeModal}
      />

      <AfflictionDetailsModal
        isOpen={openModal === 'afflictionDetails'}
        onClose={closeModal}
      />

      <PrescriptionDetailsModal
        isOpen={openModal === 'prescriptionDetails'}
        onClose={closeModal}
      />

      <PatientHistoryModal
        isOpen={openModal === 'history'}
        onClose={closeModal}
      />
    </>
  );
}
