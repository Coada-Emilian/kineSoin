import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useFetchPrescriptionDetailsAsTherapistQuery } from '../../../../../hooks/therapist/useFetchPrescriptionDetailsAsTherapistQuery';
import { formatDate } from '../../../../../utils/functions/formatDate';
import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import PrescriptionProgressBar from '../PrescriptionProgressBar';
import TherapistModal from '../TherapistModal';
import PrescriptionDetailsOutputs from './PrescriptionDetailsOutputs';

export default function PrescriptionDetailsModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const {
    selectedDashboardPrescription,
    selectedPatient,
    setSelectedPatient,
    setSelectedDashboardPrescription,
  } = useTherapistSelectionContext();

  const {
    data: prescription,
    isLoading: isPrescriptionDetailsLoading,
    isFetching,
  } = useFetchPrescriptionDetailsAsTherapistQuery({
    prescription_id: selectedDashboardPrescription?.id ?? 0,
  });

  const totalAppointments = prescription?.appointment_quantity ?? 0;

  const completedAppointments =
    prescription?.completed_appointment_quantity ?? 0;

  const progress = Math.round(
    (completedAppointments / totalAppointments) * 100
  );

  const handleViewPrescription = () => {
    if (!prescription?.picture_url) return;

    window.open(prescription.picture_url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setSelectedPatient(null);
    setSelectedDashboardPrescription(null);
    onClose();
  };

  if (isPrescriptionDetailsLoading || isFetching) {
    return <DNALoader />;
  }

  return (
    <TherapistModal
      isOpen={isOpen}
      onClose={handleClose}
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
              {prescription?.prescription_number}
            </span>
            {''} du
            <span className="font-semibold italic">
              {' '}
              {prescription?.date ? formatDate(prescription.date) : ''}
            </span>
          </span>
        </>
      }
    >
      <div className="px-6">
        <PrescriptionProgressBar
          completedAppointments={completedAppointments}
          totalAppointments={totalAppointments}
          progress={progress}
        />

        {selectedPatient && prescription && (
          <PrescriptionDetailsOutputs
            prescription={prescription}
            patient={selectedPatient}
          />
        )}

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
                onClick: handleClose,
              }}
            />
          </div>
        </div>
      </div>
    </TherapistModal>
  );
}
