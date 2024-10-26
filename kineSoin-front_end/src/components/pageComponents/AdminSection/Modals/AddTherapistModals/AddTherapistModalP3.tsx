/**
 * @file AddTherapistModalP3.tsx
 * @description This modal component enables an admin to add a new therapist by
 * filling out a multi-step form. The third step requires essential information,
 * such as the therapist's email, password, status, and photo. It handles the
 * submission of the therapist's details to the server for registration.
 *
 * @interface AddTherapistModalP3Props
 * @param {Object} addForm - An object containing the details of the therapist to be added.
 * @param {string} addForm.name - The therapist's first name.
 * @param {string} addForm.surname - The therapist's last name.
 * @param {string} addForm.email - The therapist's email address.
 * @param {string} addForm.password - The therapist's account password.
 * @param {string} addForm.repeated_password - Confirmation of the password.
 * @param {string} addForm.description - A description of the therapist's practice.
 * @param {string} addForm.diploma - The therapist's diploma information.
 * @param {string} addForm.experience - The therapist's years of experience.
 * @param {string} addForm.specialty - The therapist's specialty.
 * @param {string} addForm.licence_code - The therapist's licensing code.
 * @param {string} addForm.status - The therapist's status (e.g., active or inactive).
 * @param {File|unknown} addForm.photo - The therapist's photo file.
 * @param {boolean} isAddTherapistModalP3Open - Indicates if the modal is open.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsAddTherapistModalP3Open -
 * Function to toggle the visibility of the modal.
 *
 * @returns {JSX.Element} The rendered AddTherapistModalP3 component, featuring input
 * fields for the therapist's email, password, status, and action buttons for submission
 * or cancellation.
 */

import { useState } from 'react';
import { isAxiosError } from 'axios';
import ReactModal from 'react-modal';
import CustomButton from '../../../../standaloneComponents/Button/CustomButton.tsx';
import axios from '../../../../../axios.ts';

import EmailInput from '../Components/EmailInput.tsx';
import PasswordInput from '../Components/PasswordInput.tsx';
import StatusInput from '../Components/StatusInput.tsx';

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

  const [submitError, setSubmitError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !therapistEmail ||
      !therapistPassword ||
      !therapistRepeatedPassword ||
      !therapistStatus
    ) {
      setErrorMessage('Veuillez remplir tous les champs.');
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

    try {
      const response = await axios.post('/admin/therapists', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log('Therapist added successfully:', response.data);
        setIsAddTherapistModalP3Open(false);
        window.location.reload();
      } else {
        setErrorMessage('Failed to add therapist. Please try again.');
        console.log('Failed to add therapist:', response.data);
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ||
            "Erreur lors de l'ajout du thérapeute."
        );
        console.log(
          'Failed to add therapist:',
          error.response?.data?.message || error.message
        );
      } else {
        setErrorMessage("Erreur lors de l'ajout du thérapeute.");
        console.log('Failed to add therapist:', error);
      }
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

        {errorMessage && (
          <p className="text-red-500 text-xs text-center">{errorMessage}</p>
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
