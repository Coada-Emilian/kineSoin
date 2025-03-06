import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../../generalComponents/CustomButton/CustomButton.tsx';
import { useEffect, useState } from 'react';
import DNALoader from '../../../../utils/DNALoader.tsx';
import {
  handleFirstPatientRegisterForm,
  registerPatient,
} from './utils/registerFormUtils.ts';
import { useGlobalContext } from '../../../../utils/contexts/GlobalContext.tsx';
import { usePatientRegisterContext } from '../../../../utils/contexts/PatientRegisterContext.tsx';
import StandardTextInput from '../../generalComponents/StandardInputs/standardTextFields/StandardTextInput.tsx';
import StandardDateInput from '../../generalComponents/StandardInputs/StandardDateInput.tsx';
import StandardDropdownInput from '../../generalComponents/StandardInputs/standardDropdownInput/StandardDropdownInput.tsx';

export default function PatientRegisterFormSection() {
  const { errorMessage, setError, isLoading, setLoading, location, navigate } =
    useGlobalContext();

  const {
    isSecondFormValidated,
    isThirdFormValidated,
    setIsGlobalFormSubmitted,
    setIsFirstFormValidated,
    setIsSecondFormValidated,
    setIsThirdFormValidated,
  } = usePatientRegisterContext();

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
      isThirdFormValidated,
      sentPatientData,
      setIsGlobalFormSubmitted,
      setError,
      setIsFirstFormValidated,
      setIsSecondFormValidated,
      setIsThirdFormValidated,
      setSentPatientData,
    }).finally(() => setLoading(false));
  }, [sentPatientData]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    // Render the form section with the corresponding background image and form content
    <section className="md:p-48 xl:p-56 2xl:p-72 bg-patientFirstRegisterPage bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative">
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <form
          encType={isSecondFormValidated ? 'multipart/form-data' : undefined}
          onSubmit={(e) => {
            setLoading(true);
            handleFirstPatientRegisterForm(e, {
              setError,
              setIsFirstFormValidated,
              setIsSecondFormValidated,
              setIsThirdFormValidated,
              setSentPatientData,
            }).finally(() => setLoading(false));
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

          <StandardTextInput patientRegister={{ isNameInput: true }} />

          <StandardTextInput patientRegister={{ isBirthNameInput: true }} />

          <StandardTextInput patientRegister={{ isSurnameInput: true }} />

          <StandardDateInput isPatientRegisterBirthdateInput />

          <StandardDropdownInput isGenderDropdownInput />

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
                    setIsFirstFormValidated(false),
                      setIsSecondFormValidated(false);
                  }}
                >
                  Connectez-vous ici
                </Link>
              </p>
            </div>

            <div className="text-sm mb-4 text-center mt-4">
              Etape 1/3: Informations personnelles
            </div>
          </>
        </form>
      </div>
    </section>
  );
}
