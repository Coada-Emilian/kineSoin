import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../../generalComponents/CustomButton/CustomButton.tsx';
import { useEffect, useState } from 'react';
import DNALoader from '../../../../utils/DNALoader.tsx';
import {
  handleFirstPatientRegisterForm,
  handleSecondPatientRegisterForm,
  handleThirdPatientRegisterForm,
  registerPatient,
} from './utils/registerFormUtils.ts';
import { useGlobalContext } from '../../../../utils/contexts/GlobalContext.tsx';
import { usePatientRegisterContext } from '../../../../utils/contexts/PatientRegisterContext.tsx';
import { IFormOrders } from '../../../../@types/componentTypes';
import FirstPatientRegisterFormSection from './sections/RegisterForms/FirstPatientRegisterFormSection.tsx';
import SecondPatientRegisterFormSection from './sections/RegisterForms/SecondPatientRegisterFormSection.tsx';
import ThirdPatientRegisterFormSection from './sections/RegisterForms/ThirdPatientRegisterFormSection.tsx';
import ConfirmationFormSection from './sections/RegisterForms/ConfirmationFormSection.tsx';

interface PatientRegisterFormProps {
  setFormOrder: React.Dispatch<React.SetStateAction<IFormOrders>>;
  formOrder: IFormOrders;
}

export default function PatientRegisterFormSection({
  setFormOrder,
  formOrder,
}: PatientRegisterFormProps) {
  const { errorMessage, setError, isLoading, setLoading, location, navigate } =
    useGlobalContext();

  const { setIsGlobalFormSubmitted } = usePatientRegisterContext();

  useEffect(() => {
    setError('');
  }, [location.pathname]);

  // Sent patient data state
  const [sentPatientData, setSentPatientData] = useState({});

  const [patientImage, setPatientImage] = useState<File | null>(null);

  // useEffect hook to register the patient
  useEffect(() => {
    setLoading(true);
    registerPatient({
      formOrder,
      sentPatientData,
      setIsGlobalFormSubmitted,
      setError,
    }).finally(() => setLoading(false));
  }, [sentPatientData]);

  if (isLoading) {
    return DNALoader();
  }

  const getSectionBackground = () => {
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

  const getFormOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    switch (formOrder) {
      case 'first':
        return handleFirstPatientRegisterForm(e, {
          setError,
          setFormOrder,
          setSentPatientData,
        });
      case 'second':
        return handleSecondPatientRegisterForm(e, {
          setError,
          setFormOrder,
          setSentPatientData,
          sentPatientData,
        });
      case 'third':
        return handleThirdPatientRegisterForm(e, {
          setError,
          setFormOrder,
          setSentPatientData,
          patientImage,
          sentPatientData,
        });
      case 'last':
        return undefined;
    }
  };

  const getFormElement = () => {
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

  const getStepParagraph = () => {
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

  return (
    // Render the form section with the corresponding background image and form content
    <section
      className={`${getSectionBackground()} md:p-48 xl:p-56 2xl:p-72  bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative`}
    >
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <form
          onSubmit={(e) => {
            setLoading(true);
            const formSubmitResult = getFormOnSubmit(e);
            if (formSubmitResult) {
              formSubmitResult.finally(() => setLoading(false));
            } else {
              setLoading(false);
            }
          }}
        >
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Inscription Patient
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {errorMessage && (
            <p className="text-center text-red-600 font-medium mb-2">
              {errorMessage}
            </p>
          )}

          {getFormElement()}

          <div className="flex items-center">
            <CustomButton btnText="Valider" btnType="submit" normalButton />
          </div>

          <>
            <div className="text-xs mb-4 text-center mt-4">
              <p>
                Déjà membre?{' '}
                <Link
                  to="/loginPatient"
                  className="text-primaryRed"
                  onClick={() => {
                    setFormOrder('first');
                  }}
                >
                  Connectez-vous ici
                </Link>
              </p>
            </div>

            <div className="text-sm mb-4 text-center mt-4">
              {getStepParagraph()}
            </div>
          </>
        </form>
      </div>
    </section>
  );
}
