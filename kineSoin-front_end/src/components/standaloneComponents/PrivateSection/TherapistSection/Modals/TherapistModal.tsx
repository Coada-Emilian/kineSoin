import ReactModal from 'react-modal';
import CustomButton from '../../../generalComponents/CustomButton/CustomButton';
import { useEffect, useState } from 'react';
import StandardTextInput from '../../../generalComponents/StandardInputs/StandardTextInput';
import {
  cancelAppointment,
  fetchPatientDataAsTherapist,
  reducePrescriptionQuantity,
  sendMessageToPatient,
} from '../../../../../utils/apiUtils';
import {
  IFullPatient,
  ISameDayAppointment,
  ITherapistPatient,
} from '../../../../../@types/types';
import { DNA } from 'react-loader-spinner';
import DNALoader from '../../../../../utils/DNALoader';

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

  isDeletePatientModal?: boolean;
  isDeletePatientModalOpen?: boolean;
  setIsDeletePatientModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  selected_patient?: ITherapistPatient | null;

  isPatientDetailsModal?: boolean;
  isPatientDetailsModalOpen?: boolean;
  setIsPatientDetailsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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

  isDeletePatientModal,
  isDeletePatientModalOpen,
  setIsDeletePatientModalOpen,
  selected_patient,

  isPatientDetailsModal,
  isPatientDetailsModalOpen,
  setIsPatientDetailsModalOpen,
}: TherapistModalProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [patientData, setPatientData] = useState<IFullPatient | null>(null);

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

  const handleAppointmentCancellation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      if (appointment && appointment.id) {
        const response = await cancelAppointment(appointment.id);
        if (response) {
          console.log('Appointment canceled');
        } else {
          setErrorMessage("Erreur lors de l'annulation du rendez-vous");
        }
      }
      if (prescription && prescription.id) {
        const response = await reducePrescriptionQuantity(prescription.id);
        if (response) {
          console.log('Prescription quantity reduced');
        } else {
          setErrorMessage("Erreur lors de l'annulation de la prescription");
        }
      }
      setIsCancelAppointmentModalOpen && setIsCancelAppointmentModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error canceling appointment:', error);
      setErrorMessage("Erreur lors de l'annulation du rendez-vous");
    }
  };

  const handlePatientDataRetrieval = async (id: number) => {
    try {
      setIsLoading(true);
      const response = await fetchPatientDataAsTherapist(id);
      if (response) {
        setPatientData(response);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrorMessage(
          'Erreur lors de la récupération des données du patient'
        );
      }
    } catch (error) {
      console.error('Error retrieving patient data:', error);
      setIsLoading(false);
      setErrorMessage('Erreur lors de la récupération des données du patient');
    }
  };

  useEffect(() => {
    const fetchPatientData = async () => {
      if (selected_patient && selected_patient.id) {
        await handlePatientDataRetrieval(selected_patient.id);
        console.log('Patient data:', patientData);
      }
    };
    fetchPatientData();
  }, [selected_patient]);

  return (
    <ReactModal
      isOpen={
        !!isSendMessageModalOpen ||
        !!isCancelAppointmentModalOpen ||
        !!isDeletePatientModalOpen ||
        !!isPatientDetailsModalOpen
      }
      onRequestClose={() => {
        setIsSendMessageModalOpen && setIsSendMessageModalOpen(false);
        setIsCancelAppointmentModalOpen &&
          setIsCancelAppointmentModalOpen(false);
        setIsDeletePatientModalOpen && setIsDeletePatientModalOpen(false);
        setIsPatientDetailsModalOpen && setIsPatientDetailsModalOpen(false);
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
            src={
              patient?.picture_url || selected_patient?.picture_url || undefined
            }
            alt={patient?.name || selected_patient?.fullName || undefined}
            className="w-24 h-24 object-cover rounded-full border-4 border-white absolute top-4"
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center text-sm md:text-md xl:text-xl font-medium">
            {errorMessage}
          </p>
        )}

        {isLoading && DNALoader()}

        {(isSendMessageModal ||
          isCancelAppointmentModal ||
          isDeletePatientModal) && (
          <form
            className="flex flex-col mt-2 italic text-primaryBlue font-medium"
            onSubmit={
              isSendMessageModal
                ? handleMessageSubmit
                : isCancelAppointmentModal
                  ? handleAppointmentCancellation
                  : undefined
            }
          >
            <h3 className="text-sm md:text-md xl:text-xl text-center font-medium text-primaryBlue italic py-2 flex flex-col items-center">
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
              ) : isDeletePatientModal && selected_patient ? (
                <>
                  <span>
                    {' Voulez-vous vraiment '}
                    <span className="text-red-500">supprimer</span>
                    {' le compte de '}
                    <span className="font-semibold">
                      {selected_patient.fullName}
                    </span>
                    {' ?'}
                  </span>
                  <span className="text-red-500 font-normal italic text-sm m-2">
                    Cette action est definitive et ne peut pas être annulée.
                  </span>
                </>
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
                  setIsDeletePatientModalOpen &&
                    setIsDeletePatientModalOpen(false);
                  setIsPatientDetailsModalOpen &&
                    setIsPatientDetailsModalOpen(false);
                }}
              />
            </div>
          </form>
        )}
      </div>
    </ReactModal>
  );
}
