import type { BasicModalProps } from '../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useCancelAppointmentAsTherapistMutation } from '../../../../hooks/therapist/useCancelAppointmentAsTherapistMutation';
import CustomButton from '../../buttons/CustomButton';
import DNALoader from '../../DNALoader';
import TherapistModal from './TherapistModal';

export default function CancelAppointmentModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const {
    selectedAppointment: appointment,
    selectedPrescription: prescription,
    selectedPatient: patient,
  } = useTherapistSelectionContext();

  const mutation = useCancelAppointmentAsTherapistMutation(onClose);

  const handleAppointmentCancellation = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!appointment || !prescription) {
      console.error('Appointment or prescription data is missing');
      return;
    }
    mutation.mutate({
      appointmentId: appointment.id,
      prescriptionId: prescription.id,
    });
  };

  if (mutation.isPending) {
    return (
      <div className="flex w-full items-center justify-center">
        <DNALoader />
      </div>
    );
  }

  return (
    <>
      <TherapistModal
        isOpen={isOpen}
        onClose={onClose}
        patient={patient}
        header="Annulation de rendez-vous"
        size="sm"
        message={
          <>
            <span className="block font-normal not-italic text-lg">
              Voulez-vous{' '}
              <span className="font-semibold text-red-500">annuler</span> le
              rendez-vous de
            </span>
            <span className="block font-semibold text-xl">
              {patient?.name} {patient?.surname}
            </span>
            <span className="block font-normal not-italic text-lg">
              prévu à
              <span className="font-semibold text-xl">
                {' '}
                {appointment?.time}?
              </span>
            </span>
          </>
        }
        isDestructive={true}
      >
        {mutation.isError && (
          <p className="text-red-500 text-center text-sm md:text-md xl:text-xl font-medium">
            {mutation.error.message ||
              "Une erreur est survenue lors de l'annulation du rendez-vous."}
          </p>
        )}

        <form
          className="flex flex-col mt-2 italic text-primaryBlue font-medium"
          onSubmit={handleAppointmentCancellation}
        >
          <div className="flex justify-center gap-4 py-4">
            <CustomButton
              btn={{
                type: 'delete',
                text: 'Valider',
                style: 'normal',
              }}
              type="submit"
            />

            <CustomButton
              btn={{
                type: 'cancel',
                text: 'Annuler',
                style: 'normal',
                onClick: () => {
                  if (onClose) {
                    onClose();
                  }
                },
              }}
            />
          </div>
        </form>
      </TherapistModal>{' '}
    </>
  );
}
