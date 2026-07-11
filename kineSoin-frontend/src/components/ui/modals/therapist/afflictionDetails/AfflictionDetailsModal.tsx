import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import CustomButton from '../../../buttons/CustomButton';
import TherapistModal from '../TherapistModal';
import AfflictionDetailsOutputs from './AfflictionDetailsOutputs';

export default function AfflictionDetailsModal({
  isOpen,
  onClose,
}: BasicModalProps) {
  const { selectedAppointment, setSelectedAppointment } =
    useTherapistSelectionContext();

  const selectedAffliction = selectedAppointment?.prescription.affliction;

  const handleClose = () => {
    setSelectedAppointment(null);
    onClose();
  };

  return (
    <TherapistModal
      isOpen={isOpen}
      onClose={handleClose}
      header="Détails de l'affection"
      size="md"
      message={
        <>
          <span className="block font-normal not-italic text-lg">
            Informations sur l'affection
          </span>
          <span className="block font-semibold text-xl">
            {selectedAffliction?.name}
          </span>
        </>
      }
    >
      <div className="w-full p-4 text-slate-600  text-xs md:text-sm lg:text-base xl:text-lg">
        {selectedAffliction && (
          <AfflictionDetailsOutputs selectedAffliction={selectedAffliction} />
        )}
      </div>

      <div className=" p-4 w-full flex flex-col gap-4 md:flex-row justify-around items-center rounded-b-xl">
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
    </TherapistModal>
  );
}
