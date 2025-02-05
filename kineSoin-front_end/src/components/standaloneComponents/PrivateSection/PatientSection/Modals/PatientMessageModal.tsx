import ReactModal from 'react-modal';
import CustomButton from '../../../Button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { handlePatientMessageCreation } from '../../../../../utils/apiUtils';

interface PatientMessageModalProps {
  isMessageModalOpen: boolean;
  setIsMessageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientId?: number;
}

export default function PatientMessageModal({
  isMessageModalOpen,
  setIsMessageModalOpen,
  patientId,
}: PatientMessageModalProps) {
  const navigate = useNavigate();
  const handlePatientMessageSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await handlePatientMessageCreation(formData);
    if (response) {
      navigate('/patient/messages');
      setIsMessageModalOpen(false);
    } else {
      console.log("Erreur lors de l'envoi du message");
    }
  };

  return (
    <ReactModal
      isOpen={isMessageModalOpen}
      onRequestClose={() => setIsMessageModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <form method="POST" onSubmit={handlePatientMessageSubmit}>
        <h3 className="text-xl text-center font-semibold text-primaryBlue italic">
          Envoyez votre message
        </h3>

        <div className="flex flex-col gap-4 mt-4">
          <textarea
            name="content"
            id="patient-message_input"
            className="border border-primaryBlue rounded-lg p-2"
          ></textarea>

          <div className="flex">
            <CustomButton btnText="Envoyez" normalButton btnType="submit" />
          </div>
        </div>
      </form>
    </ReactModal>
  );
}
