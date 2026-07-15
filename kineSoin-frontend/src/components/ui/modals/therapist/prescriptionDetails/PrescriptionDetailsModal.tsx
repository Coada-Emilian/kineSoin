import { useEffect } from 'react';
import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { formatDate } from '../../../../../utils/functions/formatDate';
import TherapistModal from '../TherapistModal';
import PrescriptionProgressSection from './PrescriptionProgressSection';
import PrescriptionDetailsOutputs from './PrescriptionDetailsOutputs';

export default function PrescriptionDetailsModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { selectedPrescription } = useTherapistSelectionContext();
  const totalAppointments = selectedPrescription?.appointment_quantity;
  const completedAppointments =
    selectedPrescription?.completed_appointment_quantity;
  const progress = Math.round(
    (completedAppointments / totalAppointments) * 100
  );

  useEffect(() => {
    console.log('selectedPrescription:', selectedPrescription);
  }, [selectedPrescription]);
  return (
    <TherapistModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      header="Détails de l'ordonnance"
      size="md"
      message={
        <>
          <span className="block font-normal not-italic text-lg">
            Informations sur l'ordonnance
          </span>
          <span className="block font-normal text-xl not-italic">
            n#
            <span className="font-semibold italic">
              {' '}
              {selectedPrescription?.prescription_number}
            </span>
            {''} du
            <span className="font-semibold italic">
              {' '}
              {formatDate(selectedPrescription?.date)}
            </span>
          </span>
        </>
      }
    >
      <div className="p-6">
        <PrescriptionProgressSection
          completedAppointments={completedAppointments}
          totalAppointments={totalAppointments}
          progress={progress}
        />

        <PrescriptionDetailsOutputs prescription={selectedPrescription} />
      </div>
    </TherapistModal>
  );
}
