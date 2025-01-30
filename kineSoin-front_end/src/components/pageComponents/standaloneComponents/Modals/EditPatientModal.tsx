import ReactModal from 'react-modal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useState } from 'react';

interface EditPatientModalProps {
  setIsPhoneNumberEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isPhoneNumberEditModalOpen?: boolean;
  phone_number?: string;
  setNewPhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
}

export default function EditPatientModal({
  setIsPhoneNumberEditModalOpen,
  isPhoneNumberEditModalOpen,
  phone_number,
  setNewPhoneNumber,
}: EditPatientModalProps) {
  const handlePhoneNumberEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPhoneNumber = formData.get('phone_number') as string;
    if (newPhoneNumber.length !== 10) {
      setErrorMessage('Le numéro de téléphone doit contenir 10 chiffres');
    } else {
      setNewPhoneNumber && setNewPhoneNumber(newPhoneNumber);
      setIsPhoneNumberEditModalOpen && setIsPhoneNumberEditModalOpen(false);
    }
  };

  const [errorMessage, setErrorMessage] = useState('');

  return (
    <ReactModal
      isOpen={!!isPhoneNumberEditModalOpen}
      onRequestClose={() => setIsPhoneNumberEditModalOpen?.(false)}
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
      <h3 className="text-xl text-center font-semibold text-primaryBlue italic">
        {isPhoneNumberEditModalOpen ? 'Modifier le numéro de téléphone' : ''}
      </h3>

      {errorMessage && (
        <p className="text-red-500 text-center font-medium">{errorMessage}</p>
      )}
      
      <form
        onSubmit={handlePhoneNumberEdit}
        className="flex flex-col gap-4 mt-4 italic text-primaryBlue font-medium"
      >
        <div className="flex flex-col gap-4">
          <label>Ancien numéro de téléphone :</label>
          <input
            type="text"
            value={phone_number}
            className="border p-2 rounded-lg"
            readOnly
          />
        </div>

        <div className="flex flex-col gap-4">
          <label htmlFor="patient-new-phone_number">
            Nouveau numéro de téléphone :
          </label>
          <input
            type="text"
            name="phone_number"
            id="patient-new-phone_number"
            className="border p-2 rounded-lg"
          />
        </div>

        <div className="flex gap-2">
          <CustomButton btnText="Valider" normalButton btnType="submit" />
          <CustomButton
            btnText="Annuler"
            cancelButton
            onClick={() => setIsPhoneNumberEditModalOpen?.(false)}
          />
        </div>
      </form>
    </ReactModal>
  );
}
