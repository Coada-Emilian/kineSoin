import { IPatientAppointmentDetails } from '../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useCancelAppointmentByTherapistMutation } from '../../../../../utils/functions/privateSection/therapistSection/mutations/useCancelAppointmentByTherapistMutation';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import BaseModal from './BaseModal';

interface CancelPatientAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: IPatientAppointmentDetails;
}

export default function CancelPatientAppointmentModal({
  isOpen,
  onClose,
  appointment,
}: CancelPatientAppointmentModalProps) {
  const handleAppointmentCancellationMutation =
    useCancelAppointmentByTherapistMutation(onClose);

  const { patientDetails: patient } = usePatientsContext();

  const prescription = appointment.prescription;

  const appointment_time = `${appointment.time.split(':')[0]}h${appointment.time.split(':')[1]}`;

  const handleAppointmentCancellation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!appointment || !prescription) {
      console.error('Appointment or prescription data is missing');
      return;
    }
    handleAppointmentCancellationMutation.mutate({
      appointmentId: appointment.id,
      prescriptionId: prescription.id,
    });
  };

  if (handleAppointmentCancellationMutation.isPending) {
    return (
      <div className="flex w-full items-center justify-center">
        {DNALoader()};
      </div>
    );
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-primaryBlue text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl rounded-tl-xl w-full text-center">
        <p className="text-base md:text-lg">Cabinet kinésithérapie Ruffec</p>
      </div>

      <div className="bg-primaryTeal py-8 w-full flex flex-col items-center relative mb-14">
        <img
          src={patient?.picture_url || undefined}
          alt={patient?.name || undefined}
          className="w-24 h-24 object-cover rounded-full border-4 border-white absolute top-4"
        />
      </div>

      {handleAppointmentCancellationMutation.isError && (
        <p className="text-red-500 text-center text-sm md:text-md xl:text-xl font-medium">
          {handleAppointmentCancellationMutation.error.message ||
            "Une erreur est survenue lors de l'annulation du rendez-vous."}
        </p>
      )}

      <form
        className="flex flex-col mt-2 italic text-primaryBlue font-medium"
        onSubmit={handleAppointmentCancellation}
      >
        <h3 className="text-sm md:text-md xl:text-xl text-center font-medium text-primaryBlue italic flex flex-col items-center">
          <span>
            {' Voulez-vous '}
            <span className="text-red-500">annuler</span>
            {' le rendez-vous de '}
            <span className="font-semibold">
              {patient?.name} {patient?.surname}
            </span>
            {' prévu à '}
            <span className="font-semibold">{appointment_time}</span>?
          </span>
          <span className="text-red-500 font-normal italic text-sm m-2">
            Cette action est definitive et ne peut pas être annulée.
          </span>
        </h3>

        <div className="flex gap-4 justify-center py-4  bg-primaryTeal">
          <CustomBtn
            btn={{
              type: 'send',
              text: 'Valider',
              style: 'normal',
            }}
            type="submit"
          />

          <CustomBtn
            btn={{
              type: 'cancel',
              text: 'Annuler',
              style: 'normal',
              onClick: () => {
                onClose && onClose();
              },
            }}
          />
        </div>
      </form>
    </BaseModal>
  );
}
