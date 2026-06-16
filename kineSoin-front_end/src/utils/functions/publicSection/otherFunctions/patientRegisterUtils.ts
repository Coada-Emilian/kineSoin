import { IFormOrders } from '../../../../@types/types/componentTypes';
import { handlePatientRegistration } from '../../../apiUtils/publicApiUtils';

interface RegisterFormUtilsProps {
  setError: (message: string | null) => void;
  setFormOrder?: React.Dispatch<React.SetStateAction<IFormOrders>>;
  formOrder?: IFormOrders;
  setSentPatientData?: React.Dispatch<
    React.SetStateAction<Record<string, string | Blob>>
  >;
  patientImage?: Blob | null;
  sentPatientData?: Record<string, string | Blob>;
}

export const registerPatient = async ({
  setError,
  formOrder,
  sentPatientData,
}: RegisterFormUtilsProps) => {
  if (formOrder === 'last') {
    try {
      const formData = new FormData();
      Object.entries(sentPatientData || {}).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });
      const response = await handlePatientRegistration(formData);
      if (response) {
        console.log('Patient registered successfully');
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      console.error(error);
    }
  }
};
