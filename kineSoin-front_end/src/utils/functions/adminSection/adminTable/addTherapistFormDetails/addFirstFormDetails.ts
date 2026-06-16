/**
 * @function addFirstFormDetails
 *
 * Handles the submission of the first step of the "Add Therapist" form in the admin panel.
 * Validates input fields such as name, surname, and ADELI license code, and ensures an image file is provided.
 * If validation passes, it updates the global `addForm` context and transitions to the next modal step.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
 * @param {Object} props - Object containing handler functions and the selected image file.
 * @param {File | null} [props.therapistImage] - The selected therapist image file.
 * @param {(message: string | null) => void} props.setError - Function to display validation or server errors.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [props.setIsAddTherapistModalP1Open] - Function to close the current modal (step 1).
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [props.setIsAddTherapistModalP2Open] - Function to open the next modal (step 2).
 * @param {(form: IAddForm | any) => void} props.setAddForm - Function to update the global add form state.
 *
 * @returns {Promise<void>} Does not return anything explicitly. Handles internal side effects.
 *
 * @example
 * await addFirstFormDetails(e, {
 *   therapistImage,
 *   setError,
 *   setIsAddTherapistModalP1Open: closeStep1,
 *   setIsAddTherapistModalP2Open: openStep2,
 *   setAddForm
 * });
 *
 * @validation
 * - All fields must be filled in.
 * - Name and surname must contain only letters and spaces.
 * - ADELI code must be exactly 9 digits.
 * - A photo must be provided.
 *
 * @remarks
 * - If validation passes, updates the `addForm` state with partial form data.
 * - Moves to step 2 of the therapist registration process by updating modal visibility.
 * - Displays user-friendly error messages for common validation issues.
 */

import { IAddForm } from '../../../../../@types/interfaces/customInterfaces';

interface addFormDetailsProps {
  therapistImage?: File | null;
  setError: (message: string | null) => void;
  setIsAddTherapistModalP1Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddTherapistModalP2Open?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddForm | any) => void;
}

export const addFirstFormDetails = async (
  e: React.FormEvent<HTMLFormElement>,
  {
    therapistImage,
    setError,
    setIsAddTherapistModalP1Open,
    setIsAddTherapistModalP2Open,
    setAddForm,
  }: addFormDetailsProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const therapistName = formData.get('name') as string;
    const therapistSurname = formData.get('surname') as string;
    const therapistLicenceCode = formData.get('licence_code') as string;
    const file = therapistImage;

    // Field Validation
    if (!therapistName || !therapistSurname || !therapistLicenceCode) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (!file) {
      setError('Veuillez ajouter une photo.');
      return;
    }
    if (!/^[0-9]{9}$/.test(therapistLicenceCode)) {
      setError('Le code ADELI doit être composé de 9 chiffres.');
      return;
    }
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistName)) {
      setError('Le nom ne doit contenir que des lettres et des espaces.');
      return;
    }
    if (
      !/^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/.test(therapistSurname)
    ) {
      setError('Le prénom ne doit contenir que des lettres et des espaces.');
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
      prefix: '',
      phone_number: '',
      full_phone_number: '',
    });

    setError('');

    setIsAddTherapistModalP1Open && setIsAddTherapistModalP1Open(false);
    setIsAddTherapistModalP2Open && setIsAddTherapistModalP2Open(true);
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    return;
  }
};
