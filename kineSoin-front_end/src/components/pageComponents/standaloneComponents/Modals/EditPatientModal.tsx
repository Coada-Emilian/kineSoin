import ReactModal from 'react-modal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useState } from 'react';
import UserPhotoIcon from '/icons/user-photo.png';
import StandardFileInput from '../StandardInputs/StandardFileInput';

interface EditPatientModalProps {
  setIsPhoneNumberEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isPhoneNumberEditModalOpen?: boolean;
  phone_number?: string;
  setNewPhoneNumber?: React.Dispatch<React.SetStateAction<string>>;
  setIsPhotoEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isPhotoEditModalOpen?: boolean;
  setNewPhoto?: React.Dispatch<React.SetStateAction<File | null>>;
  old_photo?: string;
}

export default function EditPatientModal({
  setIsPhoneNumberEditModalOpen,
  isPhoneNumberEditModalOpen,
  phone_number,
  setNewPhoneNumber,
  setIsPhotoEditModalOpen,
  isPhotoEditModalOpen,
  setNewPhoto,
  old_photo,
}: EditPatientModalProps) {
  const handlePhoneNumberEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newPhoneNumber = formData.get('phone_number') as string;
    if (newPhoneNumber.length !== 10) {
      setErrorMessage('Le numéro de téléphone doit contenir 10 chiffres');
    } else if (newPhoneNumber === phone_number) {
      setErrorMessage(
        "Le nouveau numéro de téléphone doit être différent de l'ancien"
      );
    } else if (newPhoneNumber.match(/^[0-9]+$/) === null) {
      setErrorMessage(
        'Le numéro de téléphone doit contenir uniquement des chiffres'
      );
    } else {
      setNewPhoneNumber && setNewPhoneNumber(newPhoneNumber);
      setIsPhoneNumberEditModalOpen && setIsPhoneNumberEditModalOpen(false);
    }
  };

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [isNewPhotoAdded, setIsNewPhotoAdded] = useState<boolean>(false);

  return (
    <ReactModal
      isOpen={!!isPhoneNumberEditModalOpen || !!isPhotoEditModalOpen}
      onRequestClose={() => {
        if (setIsPhoneNumberEditModalOpen) setIsPhoneNumberEditModalOpen(false);
        if (setIsPhotoEditModalOpen) setIsPhotoEditModalOpen(false);
      }}
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
      <h3 className="text-xl text-center font-semibold text-primaryBlue italic mb-2">
        {isPhoneNumberEditModalOpen ? 'Modifier le numéro de téléphone' : ''}
        {isPhotoEditModalOpen ? 'Modifier votre photo' : ''}
      </h3>

      {errorMessage && (
        <p className="text-red-500 text-center text-sm font-medium">
          {errorMessage}
        </p>
      )}

      <form
        onSubmit={handlePhoneNumberEdit}
        className="flex flex-col gap-4 mt-4 italic text-primaryBlue font-medium"
      >
        <div
          className={`flex flex-col gap-4 ${isPhotoEditModalOpen ? 'justify-center items-center' : ''}`}
        >
          <label>
            {isPhoneNumberEditModalOpen ? 'Ancien numéro de téléphone :' : ''}
            {isPhotoEditModalOpen ? 'Ancienne photo :' : ''}
          </label>

          {isPhoneNumberEditModalOpen && (
            <input
              type="text"
              value={phone_number}
              className="border p-2 rounded-lg"
              readOnly
            />
          )}

          {isPhotoEditModalOpen && (
            <img
              src={old_photo}
              alt="ancienne photo"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>

        <div
          className={`flex flex-col gap-4 ${isPhotoEditModalOpen ? 'justify-center items-center' : ''}`}
        >
          <label
            htmlFor={
              isPhoneNumberEditModalOpen
                ? 'patient-new-phone_number'
                : isPhotoEditModalOpen
                  ? 'patient-new-photo'
                  : ''
            }
          >
            {isPhoneNumberEditModalOpen
              ? 'Nouveau numéro de téléphone :'
              : isPhotoEditModalOpen
                ? 'Nouvelle photo :'
                : ''}
          </label>

          {isPhoneNumberEditModalOpen && (
            <input
              type="text"
              name="phone_number"
              id="patient-new-phone_number"
              className="border p-2 rounded-lg"
            />
          )}

          {isPhotoEditModalOpen && !isNewPhotoAdded && (
            <div className="mb-2 flex flex-col items-center gap-2">
              <img
                src={UserPhotoIcon}
                alt="user icon"
                className="w-32 h-32  object-cover mb-2"
              />
              <label htmlFor="new-photo-input">
                Chargez votre nouvelle photo :
              </label>
              <input
                type="file"
                name="new_photo"
                id="new-photo-input"
                className="w-10/12"
              />
            </div>
          )}
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
