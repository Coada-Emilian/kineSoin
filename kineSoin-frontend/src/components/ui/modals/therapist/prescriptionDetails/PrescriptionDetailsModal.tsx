import { useEffect } from 'react';
import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { formatDate } from '../../../../../utils/functions/formatDate';
import EntityAfflictionOutput from '../../../outputs/EntityAfflictionOutput';
import EntityBodyRegionOutput from '../../../outputs/EntityBodyRegionOutput';
import EntityDateOutput from '../../../outputs/EntityDateOutput';
import EntityMedicOutput from '../../../outputs/EntityMedicOutput';
import EntityPatientOutput from '../../../outputs/EntityPatientOutput';
import TherapistModal from '../TherapistModal';

export default function PrescriptionDetailsModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { selectedPrescription } = useTherapistSelectionContext();

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
          <span className="block font-normal text-xl">
            n#
            <span className="font-semibold">
              {' '}
              {selectedPrescription?.prescription_number}
            </span>
            {''} du
            <span className="font-semibold">
              {' '}
              {formatDate(selectedPrescription?.date)}
            </span>
          </span>
        </>
      }
    >
      <EntityDateOutput date={selectedPrescription?.date} />

      <EntityPatientOutput patient={selectedPrescription?.patient} />

      <EntityMedicOutput medic={selectedPrescription?.medic} />

      <EntityAfflictionOutput affliction={selectedPrescription?.affliction} />

      <EntityBodyRegionOutput
        bodyRegionName={selectedPrescription?.affliction.body_region.name}
      />
    </TherapistModal>
  );
}
