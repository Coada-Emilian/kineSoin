/**
 * @file AddTherapistModalP1.tsx
 * @description A modal component for collecting initial details about a therapist,
 * including their name, surname, license code, and photo. This modal is the first step
 * in a multi-step form for adding a therapist. It allows users to input relevant
 * information and either proceed to the next step or cancel the action.
 *
 * @interface AddTherapistModalP1Props
 * @param {React.Dispatch<React.SetStateAction<{
 *   name: string;
 *   surname: string;
 *   email: string;
 *   password: string;
 *   repeated_password: string;
 *   description: string;
 *   diploma: string;
 *   experience: string;
 *   specialty: string;
 *   licence_code: string;
 *   status: string;
 *   photo: File | unknown;
 * }>>} setAddForm - A function to update the state of the therapist's form details.
 * @param {boolean} isAddTherapistModalP1Open - A boolean indicating whether the
 * add therapist modal (step 1) is open or closed.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddTherapistModalP1Open -
 * A function to update the state of the modal's visibility.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddTherapistModalP2Open -
 * A function to open the next step modal in the multi-step form.
 *
 * @returns {JSX.Element} The rendered AddTherapistModalP1 component, containing
 * input fields for therapist details and action buttons for continuing
 * or cancelling the form process.
 */

import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton';
import NameInput from '../Components/NameInput';
import SurnameInput from '../Components/SurnameInput';
import LicenceCodeInput from '../Components/LicenceCodeInput';
import ImageInput from '../Components/ImageInput';

interface AddTherapistModalP1Props {
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
}

export default function AddTherapistModalP1({
  setAddForm,
  isAddTherapistModalP1Open,
  setIsAddTherapistModalP1Open,
  setIsAddTherapistModalP2Open,
}: AddTherapistModalP1Props) {
  // State to store therapist details
  const [therapistName, setTherapistName] = useState('');
  const [therapistSurname, setTherapistSurname] = useState('');
  const [therapistLicenceCode, setTherapistLicenceCode] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // State to store the preview URL of the uploaded photo
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [codeErrorMessage, setCodeErrorMessage] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  // Function to handle file input change and set the file and
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Function to add form details and move to the next step
  const addFormDetails = () => {
    if (!therapistName || !therapistSurname || !therapistLicenceCode || !file) {
      setErrorMessage('Veuillez remplir tous les champs');
      return;
    }
    const name = therapistName;
    const surname = therapistSurname;
    if (therapistLicenceCode.length > 9 || therapistLicenceCode.length < 9) {
      setCodeErrorMessage('Le code ADELI doit contenir 9 chiffres');
      return;
    }
    const licence_code = therapistLicenceCode;
    const photo = file;

    setAddForm({
      name,
      surname,
      email: '',
      password: '',
      repeated_password: '',
      description: '',
      diploma: '',
      experience: '',
      specialty: '',
      licence_code,
      status: '',
      photo,
    });
    setIsAddTherapistModalP1Open(false);
    setIsAddTherapistModalP2Open(true);
  };

  return (
    <ReactModal
      isOpen={isAddTherapistModalP1Open}
      onRequestClose={() => setIsAddTherapistModalP1Open(false)}
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

        <form className="space-y-4">
          <NameInput
            therapist
            therapistName={therapistName}
            setTherapistName={setTherapistName}
          />

          <SurnameInput
            therapist
            therapistName={therapistSurname}
            setTherapistName={setTherapistSurname}
          />

          <LicenceCodeInput
            therapist
            therapistLicenceCode={therapistLicenceCode}
            setTherapistLicenceCode={setTherapistLicenceCode}
          />

          {codeErrorMessage && (
            <p className="text-red-500 text-xs">{codeErrorMessage}</p>
          )}

          <ImageInput handleFileChange={handleFileChange} />

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
            <CustomButton
              btnText="Continuer"
              btnType="button"
              normalButton
              onClick={addFormDetails}
            />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddTherapistModalP1Open(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
