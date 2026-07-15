import { useUTherapistUiContext } from '../../../../hooks/context/therapist/useTherapistUiContext';
import PatientDetailsModal from '../../../ui/modals/therapist/patientDetails/PatientDetailsModal';

export default function PatientsPageModals() {
  const { openModal, closeModal } = useUTherapistUiContext();
  return (
    <PatientDetailsModal
      isOpen={openModal === 'patientDetails'}
      onClose={closeModal}
    />
  );
}
