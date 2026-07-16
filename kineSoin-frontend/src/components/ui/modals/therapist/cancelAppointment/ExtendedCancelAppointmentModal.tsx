import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useCancelAppointmentAsTherapistMutation } from '../../../../../hooks/therapist/useCancelAppointmentAsTherapistMutation';
import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import TherapistModal from '../TherapistModal';
import AppointmentDetailsCard from './AppointmentDetailsCard';

export default function ExtendedCancelAppointmentModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const {
    selectedDashboardAppointment,
    selectedPrescription,
    selectedPatient,
  } = useTherapistSelectionContext();

  const mutation = useCancelAppointmentAsTherapistMutation(onClose);

  const handleAppointmentCancellation = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!selectedDashboardAppointment || !selectedPrescription) {
      console.error('Appointment or prescription data is missing');
      return;
    }
    mutation.mutate({
      appointmentId: selectedDashboardAppointment.id,
      prescriptionId: selectedPrescription.id,
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
        patient={selectedPatient}
        header="Annulation de rendez-vous"
        size="md"
        message={
          <>
            <span className="block font-normal not-italic text-lg">
              Voulez-vous{' '}
              <span className="font-semibold text-red-500">annuler</span> le
              rendez-vous de
            </span>

            <span className="font-semibold text-xl">
              {selectedPatient?.name} {selectedPatient?.surname}
            </span>
            <span className="font-normal not-italic text-lg">
              {''} prévu à
              <span className="font-semibold text-xl">
                {' '}
                {selectedDashboardAppointment?.time}?
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
        <div className="p-4">
          <AppointmentDetailsCard appointment={selectedDashboardAppointment} />

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
        </div>
      </TherapistModal>{' '}
    </>
  );
}
