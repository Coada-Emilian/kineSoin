import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useFetchPatientHistoryAsTherapistQuery } from '../../../../../hooks/therapist/useFetchPatientHistoryAsTherapistQuery';
import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import TherapistModal from '../TherapistModal';
import PatientHistoryContainer from './PatientHistoryContainer';
import PatientPrescriptionsStats from './PatientPrescriptionsStats';

export default function PatientHistoryModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  // Context
  const { selectedPatient } = useTherapistSelectionContext();

  // Data fetching
  const { data: patientDataHistory, isLoading: isPatientHistoryLoading } =
    useFetchPatientHistoryAsTherapistQuery({
      patientId: selectedPatient?.id,
    });

  // Early returns
  if (isPatientHistoryLoading) {
    return <DNALoader />;
  }

  if (!patientDataHistory) {
    return null;
  }

  // Derived values
  const patientDetails = {
    surname: patientDataHistory.surname,
    name: patientDataHistory.name,
    picture_url: patientDataHistory.picture_url,
  };

  const totalPrescriptions = patientDataHistory.prescriptions.length;

  return (
    <TherapistModal
      isOpen={isOpen}
      onClose={onClose}
      header="Historique du patient"
      patient={patientDetails}
      size="xl"
      message={
        <>
          <span className="block text-2xl font-semibold not-italic">
            {patientDetails.surname} {patientDetails.name}
          </span>

          <p className="mt-1 text-base italic text-slate-500">
            Total : {totalPrescriptions} ordonnance
            {totalPrescriptions > 1 ? 's' : ''}
          </p>
        </>
      }
    >
      <div className="flex flex-col gap-6 p-6">
        <PatientPrescriptionsStats data={patientDataHistory} />

        <PatientHistoryContainer data={patientDataHistory} />

        <div className="flex justify-center pt-2">
          <CustomButton
            btn={{
              type: 'cancel',
              text: 'Retour',
              style: 'normal',
              hasBorder: true,
              onClick: onClose,
            }}
          />
        </div>
      </div>
    </TherapistModal>
  );
}
