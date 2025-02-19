import ReactModal from 'react-modal';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import { useEffect, useState } from 'react';
import StandardTextInput from '../../../generalComponents/StandardInputs/StandardTextInput';
import { sendMessageToPatient } from '../../../../../utils/apiUtils';
import { ISameDayAppointment } from '../../../../../@types/types';

interface TherapistModalProps {
  isSendMessageModal?: boolean;
  setIsSendMessageModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isSendMessageModalOpen?: boolean;
  patient?: ISameDayAppointment['patient'] | null;

  isCancelAppointmentModal?: boolean;
  setIsCancelAppointmentModalOpen?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isCancelAppointmentModalOpen?: boolean;
  appointment?: ISameDayAppointment | null;
  prescription?: ISameDayAppointment['prescription'] | null;
}

export default function TherapistModal({
  isSendMessageModal,
  setIsSendMessageModalOpen,
  isSendMessageModalOpen,
  patient,

  isCancelAppointmentModal,
  setIsCancelAppointmentModalOpen,
  isCancelAppointmentModalOpen,
  appointment,
  prescription,
}: TherapistModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleMessageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      if (patient && patient.id) {
        const response = await sendMessageToPatient(patient.id, formData);
        if (response) {
          setIsSendMessageModalOpen && setIsSendMessageModalOpen(false);
        } else {
          setErrorMessage("Erreur lors de l'envoi du message");
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage("Erreur lors de l'envoi du message");
    }
  };

  useEffect(() => {
    console.log(prescription);
  }, [prescription]);
  
  return (
    <ReactModal
      isOpen={!!isSendMessageModalOpen || !!isCancelAppointmentModalOpen}
      onRequestClose={() => {
        setIsSendMessageModalOpen && setIsSendMessageModalOpen(false);
        setIsCancelAppointmentModalOpen &&
          setIsCancelAppointmentModalOpen(false);
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

        <div className="bg-primaryTeal py-8 w-full flex flex-col items-center relative mb-14">
          <img
            src={patient?.picture_url || undefined}
            alt={patient?.name || undefined}
            className="w-24 h-24 object-cover rounded-full border-4 border-white absolute top-4"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center text-sm md:text-md xl:text-xl font-medium">
            {errorMessage}
          </p>
        )}

        {(isSendMessageModal || isCancelAppointmentModal) && (
          <form
            className="flex flex-col mt-2 italic text-primaryBlue font-medium"
            onSubmit={handleMessageSubmit}
          >
            <h3 className="text-sm md:text-md xl:text-xl text-center font-medium text-primaryBlue italic py-2 ">
              {isSendMessageModal && patient ? (
                <span>
                  {'Envoyez un message à '}
                  <span className="font-semibold">
                    {patient.name} {patient.surname}
                  </span>
                </span>
              ) : isCancelAppointmentModal && appointment && patient ? (
                <span>
                  {' Voulez-vous '}
                  <span className="text-red-500">annuler</span>
                  {' le rendez-vous de '}
                  <span className="font-semibold">
                    {patient.name} {patient.surname}
                  </span>
                  {' prévu à '}
                  <span className="font-semibold">{appointment.time}</span>?
                </span>
              ) : (
                ''
              )}
            </h3>

            {isSendMessageModal && patient && (
              <div className={`flex flex-col gap-4 mb-2`}>
                <StandardTextInput
                  therapistMessage={{
                    isTherapistSendMessageInput: true,
                  }}
                />
              </div>
            )}

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
                  setIsCancelAppointmentModalOpen &&
                    setIsCancelAppointmentModalOpen(false);
                }}
              />
            </div>
          </form>
        )}
      </div>
    </ReactModal>
  );
}
