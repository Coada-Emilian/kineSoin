import { IModalProps } from '../../../../../@types/interfaces/customInterfaces';
import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import DNALoader from '../../../../../utils/DNALoader';
import { useSendMessageToPatientMutation } from '../../../../../utils/functions/privateSection/therapistSection/mutations/useSendMessageToPatientMutation';
import CustomBtn from '../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import { StandardTextInputRefactor } from '../../../generalComponents/standardInputs/newInputs';
import BaseModal from './BaseModal';

export default function SendMessageModal({ isOpen, onClose }: IModalProps) {
  const { selectedPatient: patient, setSelectedPatient } = usePatientsContext();

  const handleMessageSubmitMutation = useSendMessageToPatientMutation(onClose);

  const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patient?.id) {
      console.error('Patient ID is invalid');
      return;
    }
    const formData = new FormData(e.currentTarget);

    handleMessageSubmitMutation.mutate({
      id: patient.id,
      formData,
    });
  };

  if (handleMessageSubmitMutation.isPending) {
    return (
      <div className="flex w-full items-center justify-center">
        {DNALoader()};
      </div>
    );
  }

  const handleCancelClick = () => {
    setSelectedPatient(null);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
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

        {handleMessageSubmitMutation.isError && (
          <p className="text-red-500 text-center text-sm md:text-md xl:text-xl font-medium">
            {handleMessageSubmitMutation.error.message ||
              "Erreur lors de l'envoi du message."}
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
            <StandardTextInputRefactor
              textInput={{
                id: `therapist-${patient?.name}_${patient?.surname}-send-message_input`,
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
            <CustomBtn
              btn={{
                type: 'send',
                text: 'Envoyer',
                style: 'normal',
              }}
              type="submit"
            />

            <CustomBtn
              btn={{
                type: 'cancel',
                text: 'Annuler',
                style: 'normal',
                onClick: handleCancelClick,
              }}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
