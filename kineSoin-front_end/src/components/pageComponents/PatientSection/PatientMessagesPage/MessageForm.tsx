import { handlePatientMessageCreation } from '../../../../utils/apiUtils';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import StandardTextInput from '../../standaloneComponents/StandardInputs/StandardTextInput';

interface MessageFormProps {
  patientId?: number;
}

export default function MessageForm({ patientId }: MessageFormProps) {
  const handlePatientMessageSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (patientId !== undefined) {
      const response = await handlePatientMessageCreation(patientId, formData);
      if (response) {
        window.location.reload();
      } else {
        console.log("Erreur lors de l'envoi du message");
      }
    }
  };
  return (
    <form method="POST" onSubmit={handlePatientMessageSubmit}>
      <StandardTextInput isPatientMessageInput />
      <CustomButton btnText={'Envoyez'} btnType="submit" normalButton />
    </form>
  );
}
