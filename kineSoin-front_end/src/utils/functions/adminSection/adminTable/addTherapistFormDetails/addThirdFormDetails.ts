/**
 * @function addThirdFormDetails
 *
 * Validates and updates the final step of the therapist creation form. This step handles
 * account-related inputs such as email, password, and status. If all validations pass,
 * it updates the global form state and triggers the final form submission.
 *
 * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
 * @param {Object} params - An object containing state setters and context handlers.
 * @param {(msg: string | null) => void} params.setError - Function to display validation or system error messages.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} [params.setIsAdminTherapistFormValid] - Optional state handler to confirm form validation.
 * @param {(form: IAddForm | any) => void} params.setAddForm - Function to update the global form state with new values.
 *
 * @returns {Promise<void>} - No return value; function updates external state.
 *
 * @example
 * addThirdFormDetails(e, {
 *   setError,
 *   setAddForm,
 *   setIsAdminTherapistFormValid,
 * });
 *
 * @validations
 * - Email format must be valid.
 * - Password must:
 *   - Be at least 12 characters long.
 *   - Contain at least one lowercase letter.
 *   - Contain at least one uppercase letter.
 *   - Contain at least one digit.
 *   - Contain at least one special character.
 * - Passwords must match.
 *
 * @remarks
 * - Designed for use in the third step of a multi-part form for adding therapists.
 * - Displays appropriate error messages for each validation failure.
 * - Safely catches and handles runtime exceptions.
 */

import { IAddForm } from '../../../../../@types/interfaces/customInterfaces';

interface addFormDetailsProps {
  setError: (message: string | null) => void;
  setIsAdminTherapistFormValid?: React.Dispatch<React.SetStateAction<boolean>>;
  setAddForm: (form: IAddForm | any) => void;
}

export const addThirdFormDetails = async (
  e: React.FormEvent<HTMLFormElement>,
  { setError, setIsAdminTherapistFormValid, setAddForm }: addFormDetailsProps
) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const therapistEmail = formData.get('email') as string;
    const therapistPassword = formData.get('password') as string;
    const therapistRepeatedPassword = formData.get(
      'repeated_password'
    ) as string;
    const therapistStatus = formData.get('status') as string;

    if (
      !therapistEmail ||
      !therapistPassword ||
      !therapistRepeatedPassword ||
      !therapistStatus
    ) {
      setError('Veuillez remplir tous les champs.');
      return;
    } else if (therapistPassword.length < 12) {
      setError('Le mot de passe doit contenir au moins 12 caractères.');
      return;
    } else if (!/(?=.*[a-z])/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins une minuscule.');
      return;
    } else if (!/(?=.*[A-Z])/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins une majuscule.');
      return;
    } else if (!/(?=.*\d)/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins un chiffre.');
      return;
    } else if (!/(?=.*\W)/.test(therapistPassword)) {
      setError('Le mot de passe doit contenir au moins un caractère spécial.');
      return;
    } else if (therapistPassword !== therapistRepeatedPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(therapistEmail)
    ) {
      setError("L'email n'est pas valide.");
      return;
    }

    setAddForm &&
      setAddForm((prev: IAddForm) => ({
        ...prev,
        email: therapistEmail,
        password: therapistPassword,
        repeated_password: therapistRepeatedPassword,
        status: therapistStatus,
      }));

    setError('');

    setIsAdminTherapistFormValid && setIsAdminTherapistFormValid(true);
  } catch (error) {
    setError('Une erreur est survenue. Veuillez réessayer.');
    return;
  }
};
