import { useUTherapistUiContext } from '../../../../hooks/context/therapist/useTherapistUiContext';
import CancelAppointmentModal from '../../../ui/modals/therapist/CancelAppointmentModal';
import PatientDetailsModal from '../../../ui/modals/therapist/patientDetails/PatientDetailsModal';
import SendMessageModal from '../../../ui/modals/therapist/SendMessageModal';

export default function TherapistDashboardModals() {
  const { openModal, closeModal } = useUTherapistUiContext();

  return (
    <>
      <SendMessageModal isOpen={openModal === 'message'} onClose={closeModal} />

      <CancelAppointmentModal
        isOpen={openModal === 'cancel'}
        onClose={closeModal}
      />

      <PatientDetailsModal
        isOpen={openModal === 'patientDetails'}
        onClose={closeModal}
      />

      {/* {isAfflictionDetailsModalOpen && (
          <AfflictionDetailsModal
            isOpen={isAfflictionDetailsModalOpen}
            onClose={() => {
              setIsAfflictionDetailsModalOpen(false);
            }}
          />
        )} */}
    </>
  );
}
