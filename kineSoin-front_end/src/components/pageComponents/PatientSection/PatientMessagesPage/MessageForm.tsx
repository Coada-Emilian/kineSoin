import { handlePatientMessageCreation } from '../../../../utils/apiUtils';
import CustomButton from '../../../standaloneComponents/generalComponents/CustomButton/CustomButton';
import StandardTextInput from '../../../standaloneComponents/generalComponents/StandardInputs/StandardTextInput';

interface MessageFormProps {
  patientId?: number;
}

export default function MessageForm({ patientId }: MessageFormProps) {
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
    <form method="POST" onSubmit={handlePatientMessageSubmit}>
      <StandardTextInput patientSection={{ isPatientMessageInput: true }} />
      <CustomButton btnText={'Envoyez'} btnType="submit" normalButton />
    </form>
  );
}
