import ReactModal from 'react-modal';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import { useEffect, useState } from 'react';
import StandardTextInput from '../../../generalComponents/StandardInputs/StandardTextInput';

interface TherapistModalProps {
  isSendMessageModal?: boolean;
  setIsSendMessageModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isSendMessageModalOpen?: boolean;
  patient_name?: string | null;
  patient_url?: string | null;
}

export default function TherapistModal({
  isSendMessageModal,
  setIsSendMessageModalOpen,
  isSendMessageModalOpen,
  patient_name,
  patient_url,
}: TherapistModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <ReactModal
      isOpen={!!isSendMessageModalOpen}
      onRequestClose={() => {
        setIsSendMessageModalOpen && setIsSendMessageModalOpen(false);
      }}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '0px',
          borderRadius: '16px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div>
        <div className="bg-primaryBlue text-white py-8 px-6 md:py-10 md:px-8 rounded-t-xl rounded-tl-xl w-full text-center">
          <p className="text-base md:text-lg">Cabinet kinésithérapie Ruffec</p>
        </div>
        <div className="bg-primaryTeal py-4 w-full flex flex-col items-center">
          <h3 className="text-xl text-center font-semibold text-primaryBlue italic py-2 ">
            {isSendMessageModalOpen
              ? `Envoyer un message à ${patient_name}`
              : ''}
          </h3>
          <img
            src={patient_url || undefined}
            alt={patient_name || undefined}
            className="w-24 h-24 object-cover rounded-full border-4 border-white"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center text-sm font-medium">
            {errorMessage}
          </p>
        )}

        {isSendMessageModal && (
          <form className="flex flex-col mt-2 italic text-primaryBlue font-medium">
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
                  setIsSendMessageModalOpen && setIsSendMessageModalOpen(false);
                }}
              />
            </div>
          </form>
        )}
      </div>
    </ReactModal>
  );
}
