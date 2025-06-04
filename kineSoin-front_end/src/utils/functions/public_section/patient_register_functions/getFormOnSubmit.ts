import { IFormOrders } from '../../../../@types/types/componentTypes';
import {
  handleFirstPatientRegisterForm,
  handleSecondPatientRegisterForm,
  handleThirdPatientRegisterForm,
} from './patient_register_form_functions';

interface FunctionsProps {
  setError?: (message: string | null) => void;
  setFormOrder?: React.Dispatch<React.SetStateAction<IFormOrders>>;
  setSentPatientData?: React.Dispatch<
    React.SetStateAction<Record<string, string | Blob>>
  >;
  patientImage?: Blob | null;
  sentPatientData?: Record<string, string | Blob>;
  formOrder?: IFormOrders;
  setPatientImage?: React.Dispatch<React.SetStateAction<File | null>>;
}

export const getFormOnSubmit = (
  e: React.FormEvent<HTMLFormElement>,
  {
    setError,
    setFormOrder,
    setSentPatientData,
    patientImage,
    sentPatientData,
    formOrder,
  }: FunctionsProps
) => {
  switch (formOrder) {
    case 'first':
      return handleFirstPatientRegisterForm(e, {
        setError: setError || (() => null),
        setFormOrder,
        setSentPatientData,
      });
    case 'second':
      return handleSecondPatientRegisterForm(e, {
        setError: setError || (() => null),
        setFormOrder,
        setSentPatientData,
        sentPatientData,
      });
    case 'third':
      return handleThirdPatientRegisterForm(e, {
        setError: setError || (() => null),
        setFormOrder,
        setSentPatientData,
        patientImage,
        sentPatientData,
      });
    case 'last':
      return undefined;
  }
};
