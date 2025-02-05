// Purpose: Provide the first step of the modal to add a therapist.

import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../Button/CustomButton';
import NameInput from '../Modals/Components/NameInput';
import SurnameInput from '../Modals/Components/SurnameInput';
import LicenceCodeInput from '../Modals/Components/LicenceCodeInput';
import ImageInput from '../Modals/Components/ImageInput';
import StandardTextInput from '../../StandardInputs/StandardTextInput';
import StandardFileInput from '../../StandardInputs/StandardFileInput';

interface AdminModalProps {
  setAddForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      surname: string;
      email: string;
      password: string;
      repeated_password: string;
      description: string;
      diploma: string;
      experience: string;
      specialty: string;
      licence_code: string;
      status: string;
      photo: File | unknown;
    }>
  >;
  isAddTherapistModalP1Open: boolean;
  setIsAddTherapistModalP1Open: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstAddTherapistModal?: boolean;
}

export default function AdminModal({
  setAddForm,
  isAddTherapistModalP1Open,
  setIsAddTherapistModalP1Open,
  setIsAddTherapistModalP2Open,
  isFirstAddTherapistModal,
}: AdminModalProps) {
  // State to store the preview URL of the uploaded photo
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [codeErrorMessage, setCodeErrorMessage] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [therapistImageFile, setTherapistImageFile] = useState<File | null>(
    null
  );

  // Function to add form details and move to the next step
  const addFirstFormDetails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistName = formData.get('name') as string;
    const therapistSurname = formData.get('surname') as string;
    const therapistLicenceCode = formData.get('licence_code') as string;
    const file = therapistImageFile;

    console.log('therapistName', therapistName);
    console.log('therapistSurname', therapistSurname);
    console.log('therapistLicenceCode', therapistLicenceCode);
    console.log('file', file);

    if (!therapistName || !therapistSurname || !therapistLicenceCode) {
      setErrorMessage('Veuillez remplir tous les champs.');
      return;
    } else if (!file) {
      setErrorMessage('Veuillez ajouter une photo.');
      return;
    } else if (!/^[0-9]{9}$/.test(therapistLicenceCode)) {
      setCodeErrorMessage('Le code ADELI doit être composé de 9 chiffres.');
      return;
    }

    setAddForm({
      name: therapistName,
      surname: therapistSurname,
      email: '',
      password: '',
      repeated_password: '',
      description: '',
      diploma: '',
      experience: '',
      specialty: '',
      licence_code: therapistLicenceCode,
      status: '',
      photo: file,
    });

    setIsAddTherapistModalP1Open(false);
    setIsAddTherapistModalP2Open(true);
  };

  return (
    <ReactModal
      isOpen={isFirstAddTherapistModal ? isAddTherapistModalP1Open : false}
      onRequestClose={() =>
        isFirstAddTherapistModal && setIsAddTherapistModalP1Open(false)
      }
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
      <div className="space-y-4">
        <h2 className="text-md md:text-xl font-bold mb-2 md:mb-4">
          Ajouter un kinésithérapeute
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
        )}

        <form className="space-y-4" onSubmit={addFirstFormDetails}>
          <StandardTextInput isAdminTherapistAddNameInput />

          <StandardTextInput isAdminTherapistAddSurnameInput />

          <StandardTextInput isAdminTherapistAddLicenceCodeInput />

          <StandardFileInput
            isAdminTherapistImageAddInput
            setPreviewUrl={setPreviewUrl}
            setTherapistImageFile={setTherapistImageFile}
          />

          {codeErrorMessage && (
            <p className="text-red-500 text-xs">{codeErrorMessage}</p>
          )}

          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Therapist"
              className="w-32 h-32 rounded-full object-cover mx-auto"
            />
          ) : (
            <p className="text-xs md:text-sm text-center">
              Aucune image disponible
            </p>
          )}

          <p className="text-red-500 text-center text-xs md:text-sm">
            Etape 1 / 3 : Informations personnelles
          </p>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Continuer" btnType="submit" normalButton />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() =>
                isFirstAddTherapistModal && setIsAddTherapistModalP1Open(false)
              }
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
