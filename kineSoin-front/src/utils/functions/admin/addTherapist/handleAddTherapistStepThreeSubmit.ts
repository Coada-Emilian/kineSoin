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

    const validationError = validateStepThreeForm({
      email,
      password,
      repeated_password,
      status,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    setAddForm((prev: IAddTherapistFormData) => ({
      ...prev,
      email,
      password,
      repeated_password,
      status,
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
