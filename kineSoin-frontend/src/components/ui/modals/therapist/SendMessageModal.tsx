import type React from 'react';
import type { BasicModalProps } from '../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useSendMessageToPatientAsTherapistMutation } from '../../../../hooks/therapist/useSendMessageToPatientAsTherapistMutation';
import CustomButton from '../../buttons/CustomButton';
import DNALoader from '../../DNALoader';
import TextInput from '../../inputs/TextInput';
import TherapistModal from '../therapist/TherapistModal';

export default function SendMessageModal({ isOpen, onClose }: BasicModalProps) {
  const { selectedPatient: patient, setSelectedPatient } =
    useTherapistSelectionContext();
  const handleClose = () => {
    setSelectedPatient(null);
    onClose();
  };

  const mutation = useSendMessageToPatientAsTherapistMutation(handleClose);

  const handleMessageSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!patient) {
      return;
    }

    const formData = new FormData(e.currentTarget);

    mutation.mutate({
      id: patient.id,
      formData,
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
    <TherapistModal
      isOpen={isOpen}
      onClose={handleClose}
      patient={patient}
      header="Messagerie patient"
      message={
        <>
          <span className="block">Envoyez un message à</span>
          <span className="block text-2xl font-semibold not-italic">
            {patient?.name} {patient?.surname}
          </span>
        </>
      }
    >
      {mutation.isError && (
        <p className="text-center text-sm font-medium text-red-500 md:text-md xl:text-xl">
          {mutation.error.message || "Erreur lors de l'envoi du message."}
        </p>
      )}

      <form
        className="mt-2 flex flex-col gap-2 italic font-medium text-primaryBlue"
        onSubmit={handleMessageSubmit}
      >
        <div className="mx-auto w-11/12">
          <TextInput
            input={{
              id: `send-message-${patient?.id}`,
              labelName: '',
              name: 'content',
              placeholder: 'Tapez votre message ici',
              isRequired: true,
              autoComplete: 'message',
              additionalLabelClassName: 'text-sm',
            }}
          />
        </div>

        <div className="flex justify-center gap-4 py-6">
          <CustomButton
            btn={{
              type: 'send',
              text: 'Envoyer',
              style: 'normal',
            }}
            type="submit"
            disabled={mutation.isPending}
          />

          <CustomButton
            btn={{
              type: 'cancel',
              text: 'Annuler',
              style: 'normal',
              onClick: handleClose,
            }}
          />
        </div>
      </form>
    </TherapistModal>
  );
}
