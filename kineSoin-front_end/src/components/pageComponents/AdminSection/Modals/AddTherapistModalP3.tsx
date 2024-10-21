import { useState } from 'react';
import ReactModal from 'react-modal';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import axios from '../../../../axios.ts';
import { isAxiosError } from 'axios';
import openedEyeIcon from '/icons/eye.svg';
import closedEyeIcon from '/icons/eye-closed.svg';

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
  const [therapistData, setTherapistData] = useState({
    email: '',
    password: '',
    repeated_password: '',
    status: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Immediately prepare the addForm state for submission
    const updatedAddForm = {
      ...addForm,
      ...therapistData,
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
      // Check if the error is an Axios error and log the message
      if (isAxiosError(error)) {
        console.log(
          'Failed to add therapist:',
          error.response?.data?.message || error.message
        );
      } else {
        // Log any other error types
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
              value={therapistData.email}
              onChange={(e) =>
                setTherapistData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label
              htmlFor="therapist-password_input"
              className="block text-xs md:text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>

            <div className="flex justify-between bg-white rounded-md shadow-sm border">
              <input
                type={showPassword ? 'text' : 'password'}
                id="therapist-password_input"
                name="password"
                className=" block text-xs md:text-sm w-full p-1 md:p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs"
                value={therapistData.password}
                onChange={(e) =>
                  setTherapistData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
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
                value={therapistData.repeated_password}
                onChange={(e) =>
                  setTherapistData((prev) => ({
                    ...prev,
                    repeated_password: e.target.value,
                  }))
                }
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
              value={therapistData.status}
              onChange={(e) =>
                setTherapistData((prev) => ({
                  ...prev,
                  status: e.target.value,
                }))
              }
            >
              {' '}
              <option value="">Choisir un statut</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="flex gap-2 mt-6 w-fit mx-auto">
            <CustomButton btnText="Valider" btnType="submit" normalBtn />
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
