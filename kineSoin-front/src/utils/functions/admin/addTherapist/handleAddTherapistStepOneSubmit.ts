import type { HandleAddTherapistStepOneSubmitFunctionProps } from '../../../../@types/props/functionProps';
import { validateStepOneForm } from './validators/validateStepOneForm';

export const handleAddTherapistStepOneSubmit = async (
  e: React.SubmitEvent<HTMLFormElement>,
  {
    therapistImage,
    setError,
    setIsAddTherapistModalP1Open,
    setIsAddTherapistModalP2Open,
    setAddForm,
  }: HandleAddTherapistStepOneSubmitFunctionProps
) => {
  e.preventDefault();
  try {
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    const licence_code = formData.get('licence_code') as string;

    const validationError = validateStepOneForm({
      name,
      surname,
      licence_code,
      file: therapistImage,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

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
      photo: therapistImage,
      prefix: '',
      phone_number: '',
      full_phone_number: '',
    });

    setError('');

    if (setIsAddTherapistModalP1Open) {
      setIsAddTherapistModalP1Open(false);
    }

    if (setIsAddTherapistModalP2Open) {
      setIsAddTherapistModalP2Open(false);
    }
  } catch (error: unknown) {
    let message = 'Une erreur est survenue. Veuillez réessayer.';

    if (error instanceof Error) {
      message = error.message;
    }

    console.error(error);
    setError(message);
  }
};
