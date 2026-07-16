import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { formatDate } from '../../../../../utils/functions/formatDate';
import CustomButton from '../../../buttons/CustomButton';
import PrescriptionProgressSection from '../PrescriptionProgressSection';
import TherapistModal from '../TherapistModal';
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

  const handleViewPrescription = () => {
    if (!selectedPrescription?.picture_url) return;

    window.open(
      selectedPrescription.picture_url,
      '_blank',
      'noopener,noreferrer'
    );
  };

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
      <div className="px-6">
        <PrescriptionProgressSection
          completedAppointments={completedAppointments}
          totalAppointments={totalAppointments}
          progress={progress}
        />

        <PrescriptionDetailsOutputs prescription={selectedPrescription} />

        <div className=" p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
          <div className="flex gap-3 items-center ">
            <CustomButton
              btn={{
                type: 'basic',
                text: "Consulter l'ordonnance",
                style: 'normal',
                hasBorder: true,
                onClick: handleViewPrescription,
              }}
            />

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
      </div>
    </TherapistModal>
  );
}
