import type { IAddTherapistFormData } from '../../../../@types/interfaces/formInterfaces';
import type { HandleAddTherapistStepTwoSubmitFunctionProps } from '../../../../@types/props/functionProps';
import { validateStepTwoForm } from './validators/validateStepTwoForm';

export const handleAddTherapistStepTwoSubmit = (
  e: React.SubmitEvent<HTMLFormElement>,
  {
    setError,
    setIsAddTherapistModalP2Open,
    setIsAddTherapistModalP3Open,
    setAddForm,
  }: HandleAddTherapistStepTwoSubmitFunctionProps
) => {
  try {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const diploma = formData.get('diploma') as string;
    const experience = formData.get('experience') as string;
    const specialty = formData.get('specialty') as string;
    const prefix = formData.get('prefix') as string;
    const phone_number = formData.get('phone_number') as string;
    const description = formData.get('description') as string;

    const validationError = validateStepTwoForm({
      diploma,
      experience,
      specialty,
      prefix,
      phone_number,
      description,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    const full_phone_number = `${prefix}${phone_number}`;

    setAddForm((prev: IAddTherapistFormData) => ({
      ...prev,
      description,
      diploma,
      experience,
      specialty,
      prefix,
      phone_number,
      full_phone_number,
    }));

    setError('');
    if (setIsAddTherapistModalP2Open) {
      setIsAddTherapistModalP2Open(false);
    }
    if (setIsAddTherapistModalP3Open) {
      setIsAddTherapistModalP3Open(false);
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
