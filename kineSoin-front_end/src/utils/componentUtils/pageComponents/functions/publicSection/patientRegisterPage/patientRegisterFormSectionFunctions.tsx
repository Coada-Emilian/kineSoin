import { IFormOrders } from '../../../../../../@types/componentTypes';
import ConfirmationFormSection from '../../../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/ConfirmationFormSection';
import FirstPatientRegisterFormSection from '../../../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/FirstPatientRegisterFormSection';
import SecondPatientRegisterFormSection from '../../../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/SecondPatientRegisterFormSection';
import ThirdPatientRegisterFormSection from '../../../../../../components/standaloneComponents/PublicSection/new_components/formSections/registerFormSections/ThirdPatientRegisterFormSection';
import {
  handleFirstPatientRegisterForm,
  handleSecondPatientRegisterForm,
  handleThirdPatientRegisterForm,
} from './patientRegisterUtils';

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

export const getSectionBackground = ({ formOrder }: FunctionsProps) => {
  switch (formOrder) {
    case 'first':
      return 'bg-patientFirstRegisterPage';
    case 'second':
      return 'bg-patientSecondRegisterPage';
    case 'third':
      return 'bg-patientThirdRegisterPage';
    default:
      return 'bg-confirmationPage';
  }
};

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

export const getFormElement = ({
  formOrder,
  setPatientImage,
}: FunctionsProps) => {
  switch (formOrder) {
    case 'first':
      return <FirstPatientRegisterFormSection />;
    case 'second':
      return <SecondPatientRegisterFormSection />;
    case 'third':
      return (
        <ThirdPatientRegisterFormSection setPatientImage={setPatientImage} />
      );
    case 'last':
      return <ConfirmationFormSection />;
  }
};

export const getStepParagraph = (formOrder: IFormOrders) => {
  switch (formOrder) {
    case 'first':
      return 'Etape 1/3: Informations personnelles';
    case 'second':
      return 'Etape 2/3: Informations de connexion';
    case 'third':
      return 'Etape 3/3: Photo de profil';
    case 'last':
      return '';
  }
};
