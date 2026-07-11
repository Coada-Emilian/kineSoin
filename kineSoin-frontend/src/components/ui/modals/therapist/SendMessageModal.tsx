import type React from 'react';
import type { BasicModalProps } from '../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useSendMessageToPatientAsTherapistMutation } from '../../../../hooks/therapist/useSendMessageToPatientAsTherapistMutation';
import CustomButton from '../../buttons/CustomButton';
import DNALoader from '../../DNALoader';
import TextInput from '../../inputs/TextInput';
import BaseModal from '../BaseModal';

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
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <div>
        <div className="bg-primaryBlue text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl rounded-tl-xl w-full text-center">
          <p className="text-base md:text-lg">Cabinet kinésithérapie Ruffec</p>
        </div>

        <div className="bg-primaryTeal py-8 w-full flex flex-col items-center relative mb-14">
          <img
            src={patient?.picture_url}
            alt={patient?.name}
            className="w-24 h-24 object-cover rounded-full border-4 border-white absolute top-4"
          />
        </div>

        {mutation.isError && (
          <p className="text-red-500 text-center text-sm md:text-md xl:text-xl font-medium">
            {mutation.error.message || "Erreur lors de l'envoi du message."}
          </p>
        )}

        <form
          className="flex flex-col gap-2 mt-2 italic text-primaryBlue font-medium"
          onSubmit={handleMessageSubmit}
        >
          <h3 className="text-sm md:text-md xl:text-xl text-center font-medium text-primaryBlue italic flex flex-col items-center">
            <span>
              {'Envoyez un message à '}
              <span className="font-semibold">
                {patient?.name} {patient?.surname}
              </span>
            </span>
          </h3>

          <div className="w-11/12 mx-auto">
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

          <div className="flex gap-4 justify-center py-4  bg-primaryTeal">
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
      </div>
    </BaseModal>
  );
}
