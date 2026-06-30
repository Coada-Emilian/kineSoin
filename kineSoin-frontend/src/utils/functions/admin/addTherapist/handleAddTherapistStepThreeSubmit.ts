import type { IAddTherapistFormData } from '../../../../@types/interfaces/formInterfaces';
import type { HandleAddTherapistStepThreeSubmitFunctionProps } from '../../../../@types/props/functionProps';
import { validateStepThreeForm } from './validators/validateStepThreeForm';

export const handleAddTherapistStepThreeSubmit = async (
  e: React.SubmitEvent<HTMLFormElement>,
  {
    setError,
    setIsAdminTherapistFormValid,
    setAddForm,
  }: HandleAddTherapistStepThreeSubmitFunctionProps
) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const repeated_password = formData.get('repeated_password') as string;
    const status = formData.get('status') as string;
    const prefix = formData.get('prefix') as string;
    const phone_number = formData.get('phone_number') as string;

    const validationError = validateStepThreeForm({
      email,
      password,
      repeated_password,
      status,
      prefix,
      phone_number,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    const full_phone_number = `${prefix}${phone_number}`;

    setAddForm((prev: IAddTherapistFormData) => ({
      ...prev,
      email,
      password,
      repeated_password,
      status,
      prefix,
      phone_number,
      full_phone_number,
    }));

    setError('');

    if (setIsAdminTherapistFormValid) {
      setIsAdminTherapistFormValid(true);
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
