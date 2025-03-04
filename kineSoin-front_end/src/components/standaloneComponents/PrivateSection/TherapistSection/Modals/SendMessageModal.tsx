import { useState } from 'react';
import BaseModal from './BaseModal';
import { sendMessageToPatient } from '../../../../../utils/apiUtils/therapistApiUtils';
import StandardTextInput from '../../../generalComponents/StandardInputs/standardTextFields/StandardTextInput';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import { ISameDayAppointment } from '../../../../../@types/customInterfaces';

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: ISameDayAppointment['patient'] | null;
}

export default function SendMessageModal({
  isOpen,
  onClose,
  patient,
}: SendMessageModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      if (patient && patient.id) {
        const response = await sendMessageToPatient(patient.id, formData);
        if (response) {
          onClose && onClose();
        } else {
          setErrorMessage("Erreur lors de l'envoi du message");
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage("Erreur lors de l'envoi du message");
    }
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

        {errorMessage && (
          <p className="text-red-500 text-center text-sm md:text-md xl:text-xl font-medium">
            {errorMessage}
          </p>
        )}

        <form
          className="flex flex-col mt-2 italic text-primaryBlue font-medium"
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

          <div className={`flex flex-col gap-4 mb-2`}>
            <StandardTextInput
              therapistMessage={{
                isTherapistSendMessageInput: true,
              }}
            />
          </div>

          <div className="flex gap-4 justify-center py-4  bg-primaryTeal">
            <CustomButton
              btnText="Valider"
              profileCardModifyProfileButton
              btnType="submit"
            />

            <CustomButton
              btnText="Annuler"
              mobileCancelButton
              onClick={() => {
                onClose && onClose();
              }}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
