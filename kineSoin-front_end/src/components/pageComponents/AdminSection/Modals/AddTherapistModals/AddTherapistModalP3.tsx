// Purpose: The purpose of this component is to render the third part of the add therapist modal.

import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton.tsx';
import EmailInput from '../Components/EmailInput.tsx';
import PasswordInput from '../Components/PasswordInput.tsx';
import StatusInput from '../Components/StatusInput.tsx';
import { handleTherapistCreation } from '../../../../../utils/apiUtils.ts';

interface AddTherapistModalP3Props {
  addForm: {
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
  };
  isAddTherapistModalP3Open: boolean;
  setIsAddTherapistModalP3Open: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTherapistModalP3({
  addForm,
  isAddTherapistModalP3Open,
  setIsAddTherapistModalP3Open,
}: AddTherapistModalP3Props) {
  // State to store the therapist's email, password, and status
  const [therapistEmail, setTherapistEmail] = useState('');
  const [therapistPassword, setTherapistPassword] = useState('');
  const [therapistRepeatedPassword, setTherapistRepeatedPassword] =
    useState('');
  const [therapistStatus, setTherapistStatus] = useState('');

  // State to toggle password visibility

  // State to store error messages
  const [errorMessage, setErrorMessage] = useState('');

  const [submitErrorMessage, setSubmitErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !therapistEmail ||
      !therapistPassword ||
      !therapistRepeatedPassword ||
      !therapistStatus
    ) {
      setSubmitErrorMessage('Veuillez remplir tous les champs.');
      return;
    }
    let valid = true;

    if (therapistPassword.length < 12) {
      setErrorMessage('Le mot de passe doit contenir au moins 12 caractères.');
      valid = false;
    } else if (!/(?=.*[a-z])/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins une minuscule.');
      valid = false;
    } else if (!/(?=.*[A-Z])/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins une majuscule.');
      valid = false;
    } else if (!/(?=.*\d)/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins un chiffre.');
      valid = false;
    } else if (!/(?=.*\W)/.test(therapistPassword)) {
      setErrorMessage(
        'Le mot de passe doit contenir au moins un caractère spécial.'
      );
      valid = false;
    } else if (therapistPassword !== therapistRepeatedPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      valid = false;
    }

    if (!valid) {
      // Prevent form submission if validation failed
      return;
    }

    // Clear any previous error message if validation passed
    setErrorMessage('');

    const updatedAddForm = {
      ...addForm,
      email: therapistEmail,
      password: therapistPassword,
      repeated_password: therapistRepeatedPassword,
      status: therapistStatus,
    };

    const formData = new FormData();
    formData.append('name', updatedAddForm.name);
    formData.append('surname', updatedAddForm.surname);
    formData.append('email', updatedAddForm.email);
    formData.append('password', updatedAddForm.password);
    formData.append('repeated_password', updatedAddForm.repeated_password);
    formData.append('description', updatedAddForm.description);
    formData.append('diploma', updatedAddForm.diploma);
    formData.append('experience', updatedAddForm.experience);
    formData.append('specialty', updatedAddForm.specialty);
    formData.append('licence_code', updatedAddForm.licence_code);
    formData.append('status', updatedAddForm.status);
    formData.append('photo', updatedAddForm.photo as Blob);

    const success = await handleTherapistCreation(formData);

    if (success) {
      console.log('Therapist added successfully');
      setIsAddTherapistModalP3Open(false);
      window.location.reload();
    } else {
      setErrorMessage("Erreur lors de l'ajout du thérapeute.");
    }
  };

  return (
    <ReactModal
      isOpen={isAddTherapistModalP3Open}
      onRequestClose={() => setIsAddTherapistModalP3Open(false)}
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

        {submitErrorMessage && (
          <p className="text-red-500 text-xs text-center">
            {submitErrorMessage}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} method="post">
          <EmailInput
            therapistEmail={therapistEmail}
            setTherapistEmail={setTherapistEmail}
          />

          <PasswordInput
            therapistPassword={therapistPassword}
            setTherapistPassword={setTherapistPassword}
          />

          <PasswordInput
            repeatedPassword
            therapistRepeatedPassword={therapistRepeatedPassword}
            setTherapistRepeatedPassword={setTherapistRepeatedPassword}
          />

          <StatusInput
            therapistStatus={therapistStatus}
            setTherapistStatus={setTherapistStatus}
          />

          {errorMessage && (
            <p className="text-xs text-red-500 text-center">{errorMessage}</p>
          )}

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalButton />

            <CustomButton
              btnText="Annuler"
              btnType="button"
              cancelButton
              onClick={() => setIsAddTherapistModalP3Open(false)}
            />
          </div>
        </form>
      </div>
    </ReactModal>
  );
}
