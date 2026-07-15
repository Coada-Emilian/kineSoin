import { MessageSquareMore, Paperclip, X } from 'lucide-react';
import { useState } from 'react';
import type { BasicModalProps } from '../../../../../@types/props/modalProps';
import { useTherapistSelectionContext } from '../../../../../hooks/context/therapist/useTherapistSelectionContext';
import { useSendMessageToPatientAsTherapistMutation } from '../../../../../hooks/therapist/useSendMessageToPatientAsTherapistMutation';
import CustomButton from '../../../buttons/CustomButton';
import DNALoader from '../../../DNALoader';
import TextInput from '../../../inputs/TextInput';
import TherapistModal from '../TherapistModal';

export default function ExtendedSendMessageModal({
  isOpen,
  onClose,
}: BasicModalProps) {
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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setSelectedFile(file);
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
      size="md"
      message={
        <>
          <span className="block font-normal not-italic text-lg">
            Envoyez un message à
          </span>
          <span className="block font-semibold text-xl">
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

      <div className="my-6 flex items-center gap-4 px-10">
        <div className="h-px flex-1 bg-slate-200" />

        <MessageSquareMore className="size-7 text-teal-500" />

        <div className="h-px flex-1 bg-slate-200" />
      </div>

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
              placeholder: 'Tapez votre message ici...',
              isRequired: true,
              autoComplete: 'message',
              additionalLabelClassName: 'text-sm',
              isTextArea: true,
            }}
          />
        </div>

        <div className="flex justify-between gap-4 px-4">
          <div className="mt-3 flex items-center justify-between">
            <label
              htmlFor="attachment"
              className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-slate-600 transition hover:bg-slate-100"
            >
              <Paperclip className="size-5 text-teal-500" />

              <input
                id="attachment"
                type="file"
                name="attachment"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
              />

              <span className="max-w-xs truncate">
                {selectedFile ? selectedFile.name : 'Joindre un fichier'}
              </span>

              <X
                className="size-4 cursor-pointer text-slate-400 hover:text-red-500"
                onClick={() => setSelectedFile(null)}
              />
            </label>

            <input
              id="attachment"
              type="file"
              name="attachment"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>

          <div className="flex justify-center gap-6 p-4">
            <CustomButton
              btn={{
                type: 'basic',
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
        </div>
      </form>
    </TherapistModal>
  );
}
