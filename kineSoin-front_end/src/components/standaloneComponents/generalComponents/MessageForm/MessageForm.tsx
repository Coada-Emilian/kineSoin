import { handlePatientMessageCreation } from '../../../../utils/apiUtils';
import CustomButton from '../CustomButton/CustomButton';
import StandardTextInput from '../StandardInputs/StandardTextInput';

interface MessageFormProps {
  isPatientMessageForm?: boolean;
}

export default function MessageForm({
  isPatientMessageForm,
}: MessageFormProps) {
  const handlePatientMessageSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await handlePatientMessageCreation(formData);
    if (response) {
      window.location.reload();
    } else {
      console.log("Erreur lors de l'envoi du message");
    }
  };

  return (
    <form
      method="POST"
      onSubmit={isPatientMessageForm ? handlePatientMessageSubmit : undefined}
    >
      <StandardTextInput patientSection={{ isPatientMessageInput: true }} />

      <CustomButton btnText={'Envoyez'} btnType="submit" normalButton />
    </form>
  );
}
