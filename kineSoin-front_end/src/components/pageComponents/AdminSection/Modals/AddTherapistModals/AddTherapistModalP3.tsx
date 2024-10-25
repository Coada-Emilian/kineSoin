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
import openedEyeIcon from '/icons/eye.svg';
import closedEyeIcon from '/icons/eye-closed.svg';
import questionIcon from '/icons/question-circle.svg';

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
  const [showPassword, setShowPassword] = useState(false);

  // State to store error messages
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (therapistPassword.length < 12) {
      setErrorMessage('Le mot de passe doit contenir au moins 12 caractères.');
    } else if (!/(?=.*[a-z])/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins une minuscule.');
    } else if (!/(?=.*[A-Z])/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins une majuscule.');
    } else if (!/(?=.*\d)/.test(therapistPassword)) {
      setErrorMessage('Le mot de passe doit contenir au moins un chiffre.');
    } else if (!/(?=.*\W)/.test(therapistPassword)) {
      setErrorMessage(
        'Le mot de passe doit contenir au moins un caractère spécial.'
      );
    } else if (therapistPassword !== therapistRepeatedPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
    }

    if (errorMessage) {
      return;
    }

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
        console.log('Failed to add therapist:', response.data);
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        console.log(
          'Failed to add therapist:',
          error.response?.data?.message || error.message
        );
      } else {
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

        <form className="space-y-4" onSubmit={handleSubmit} method="post">
          <div>
            <label
              htmlFor="therapist-email_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              E-mail
            </label>

            <input
              type="email"
              id="therapist-email_input"
              name="email"
              className="mt-1 block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
              value={therapistEmail}
              onChange={(e) => setTherapistEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-password_input"
              className=" text-xs md:text-sm font-medium text-gray-700 flex justify-start items-center mb-2"
            >
              Mot de passe{' '}
              <p
                className="text-sm text-center ml-4"
                title="12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre
                & 1 caractère spécial"
              >
                <img
                  src={questionIcon}
                  alt="aide"
                  className="w-6 cursor-help"
                />
                <span className="sr-only">
                  12 caractères minimum avec 1 majuscule, 1 minuscule, 1 chiffre
                  & 1 caractère spécial
                </span>
              </p>
            </label>

            <div className="flex justify-between bg-white rounded-md shadow-sm border">
              <input
                type={showPassword ? 'text' : 'password'}
                id="therapist-password_input"
                name="password"
                className=" block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                value={therapistPassword}
                onChange={(e) => setTherapistPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  src={showPassword ? closedEyeIcon : openedEyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="h-6 my-auto px-2 w-auto"
                />
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="therapist-repeated-password_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Confirmer mot de passe
            </label>

            <div className="flex justify-between bg-white rounded-md shadow-sm border">
              <input
                type={showPassword ? 'text' : 'password'}
                id="therapist-repeated-password_input"
                name="repeated_password"
                className=" block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                value={therapistRepeatedPassword}
                onChange={(e) => setTherapistRepeatedPassword(e.target.value)}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  src={showPassword ? closedEyeIcon : openedEyeIcon}
                  alt={showPassword ? 'Hide password' : 'Show password'}
                  className="h-6 my-auto px-2 w-auto"
                />
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="therapistStatus"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Statut
            </label>

            <select
              id="therapistStatus"
              className="mt-1 text-xs md:text-sm block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={therapistStatus}
              onChange={(e) => setTherapistStatus(e.target.value as string)}
            >
              {' '}
              <option value="">Choisir un statut</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

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
