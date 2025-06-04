import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DNALoader from '../../../../../../utils/DNALoader.tsx';
import {
  checkPatientCredentials,
  checkTherapistCredentials,
} from '../../../../../../utils/componentUtils/pageComponents/functions/publicSection/loginPage/authentificationUtils.ts';
import {
  handleFirstPatientRegisterForm,
  handleSecondPatientRegisterForm,
  handleThirdPatientRegisterForm,
  registerPatient,
} from '../../../../../../utils/componentUtils/pageComponents/functions/publicSection/patientRegisterPage/patientRegisterUtils.ts';
import CustomButton from '../../../../generalComponents/CustomButton/CustomButton.tsx';
import FirstPatientRegisterFormSection from '../../new_components/formSections/registerFormSections/patient_form_sections/FirstPatientRegisterFormSection.tsx';
import SecondPatientRegisterFormSection from '../../new_components/formSections/registerFormSections/patient_form_sections/SecondPatientRegisterFormSection.tsx';
import ThirdPatientRegisterFormSection from '../../new_components/formSections/registerFormSections/patient_form_sections/ThirdPatientRegisterFormSection.tsx';
import HomePageFormSection from './sections/HomePageFormSection.tsx';
import PatientLoginFormSection from './sections/PatientLoginFormSection.tsx';
import TherapistLoginFormSection from './sections/TherapistLoginFormSection.tsx';
import mainLogo from '/logos/Main-Logo.png';

interface FormSectionProps {
  isHomePageFormSection?: boolean;

  isPatientLoginPageFormSection?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;

  isTherapistLoginPageFormSection?: boolean;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;

  isPatientRegisterPageRendered?: boolean;
  setIsPatientRegisterPageRendered?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  isFirstFormValidated: boolean;
  isSecondFormValidated: boolean;
  isThirdFormValidated: boolean;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGlobalFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>;
  isGlobalFormSubmitted?: boolean;
}
export default function FormSection({
  isHomePageFormSection,

  isPatientLoginPageFormSection,
  setPatientProfileToken,

  isTherapistLoginPageFormSection,
  setTherapistProfileToken,

  isPatientRegisterPageRendered,
  setIsPatientRegisterPageRendered,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsGlobalFormSubmitted,
  isGlobalFormSubmitted,
}: FormSectionProps) {
  // Patient and therapist error messages states
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sent patient data state
  const [sentPatientData, setSentPatientData] = useState({});

  const navigate = useNavigate();

  const [patientImage, setPatientImage] = useState<File | null>(null);

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    setErrorMessage('');
  }, [location.pathname]);

  // useEffect hook to register the patient
  useEffect(() => {
    registerPatient({
      isThirdFormValidated,
      setIsLoading,
      sentPatientData,
      setIsGlobalFormSubmitted,
      setErrorMessage,
      setIsFirstFormValidated,
      setIsSecondFormValidated,
      setIsThirdFormValidated,
      setSentPatientData,
    });
  }, [sentPatientData]);

  if (isLoading) {
    return DNALoader();
  }

  const sectionPadding = isHomePageFormSection
    ? 'md:p-96'
    : isPatientLoginPageFormSection ||
        isTherapistLoginPageFormSection ||
        isPatientRegisterPageRendered ||
        isFirstFormValidated ||
        isSecondFormValidated ||
        isThirdFormValidated
      ? ' md:p-48 xl:p-56 2xl:p-72'
      : '';

  const sectionBackground = isHomePageFormSection
    ? 'bg-homePage'
    : isPatientLoginPageFormSection
      ? 'bg-patientConnectionPage'
      : isTherapistLoginPageFormSection
        ? 'bg-therapistConnectionPage'
        : isPatientRegisterPageRendered
          ? 'bg-patientFirstRegisterPage'
          : isFirstFormValidated
            ? 'bg-patientSecondRegisterPage'
            : isSecondFormValidated
              ? 'bg-patientThirdRegisterPage'
              : isThirdFormValidated
                ? 'bg-confirmationPage'
                : '';

  return (
    // Render the form section with the corresponding background image and form content
    <section
      className={`${sectionPadding} ${sectionBackground} bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative`}
    >
      <div
        className={`${
          !isHomePageFormSection
            ? isGlobalFormSubmitted
              ? 'max-w-2xl opacity-90'
              : 'opacity-90 max-w-80'
            : 'opacity-75 md:w-2/3 md:absolute md:top-32 md:left-16 md:text-base lg:text-lg lg:left-20 lg:w-2/4 xl:top-32 xl:text-xl 2xl:top-52 2xl:text-2xl'
        } font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic`}
      >
        {isHomePageFormSection ? (
          <HomePageFormSection />
        ) : (
          <form
            encType={isSecondFormValidated ? 'multipart/form-data' : undefined}
            onSubmit={
              isPatientLoginPageFormSection
                ? (e) =>
                    checkPatientCredentials(e, {
                      setIsLoading,
                      setErrorMessage,
                      setPatientProfileToken,
                      navigate,
                    })
                : isTherapistLoginPageFormSection
                  ? (e) =>
                      checkTherapistCredentials(e, {
                        setIsLoading,
                        setErrorMessage,
                        setTherapistProfileToken,
                        navigate,
                      })
                  : isPatientRegisterPageRendered
                    ? (e) =>
                        handleFirstPatientRegisterForm(e, {
                          setIsLoading,
                          setErrorMessage,
                          setIsFirstFormValidated,
                          setIsSecondFormValidated,
                          setIsThirdFormValidated,
                          setIsPatientRegisterPageRendered,
                          setSentPatientData,
                        })
                    : isFirstFormValidated
                      ? (e) =>
                          handleSecondPatientRegisterForm(e, {
                            setIsLoading,
                            setErrorMessage,
                            setIsFirstFormValidated,
                            setIsSecondFormValidated,
                            setIsThirdFormValidated,
                            setSentPatientData,
                            sentPatientData,
                          })
                      : isSecondFormValidated
                        ? (e) =>
                            handleThirdPatientRegisterForm(e, {
                              setIsLoading,
                              setErrorMessage,
                              setIsFirstFormValidated,
                              setIsSecondFormValidated,
                              setIsThirdFormValidated,
                              setSentPatientData,
                              patientImage,
                              sentPatientData,
                            })
                        : (e) => e.preventDefault()
            }
          >
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
              {(isPatientLoginPageFormSection ||
                isTherapistLoginPageFormSection) &&
                `Connexion ${isPatientLoginPageFormSection ? 'Patient' : 'Thérapeute'}`}

              {(isPatientRegisterPageRendered ||
                isFirstFormValidated ||
                isSecondFormValidated) &&
                !(
                  isPatientLoginPageFormSection ||
                  isTherapistLoginPageFormSection
                ) &&
                'Inscription Patient'}

              {isGlobalFormSubmitted && "Confirmation d'inscription"}
            </h2>

            <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

            {errorMessage && (
              <p className="text-center text-red-600 font-medium mb-2">
                {errorMessage}
              </p>
            )}

            {isPatientLoginPageFormSection && <PatientLoginFormSection />}

            {isTherapistLoginPageFormSection && <TherapistLoginFormSection />}

            {isPatientRegisterPageRendered && (
              <FirstPatientRegisterFormSection />
            )}

            {isFirstFormValidated && <SecondPatientRegisterFormSection />}

            {isSecondFormValidated && (
              <ThirdPatientRegisterFormSection
                setPatientImage={setPatientImage}
              />
            )}

            {isGlobalFormSubmitted &&
              (isLoading ? (
                DNALoader()
              ) : (
                <div className="text-base">
                  <p className="mb-4 indent-4">
                    Votre inscription a bien été enregistrée !
                  </p>
                  <p className="mb-4 indent-4">
                    Merci de vous être inscrit sur KineSoin. Votre compte est en
                    cours de validation et sera activé prochainement. Vous
                    recevrez une confirmation dès son activation.
                  </p>
                  <p className="indent-4">
                    <Link to="/" className="font-bold text-primaryRed">
                      Retour à l'accueil
                    </Link>
                  </p>
                </div>
              ))}

            {!isThirdFormValidated && (
              <div className="flex items-center">
                <CustomButton
                  btnText={`${isPatientRegisterPageRendered || isFirstFormValidated ? 'Valider' : isSecondFormValidated ? 'Inscription' : 'Connexion'}`}
                  btnType="submit"
                  normalButton
                />
              </div>
            )}

            {(isPatientRegisterPageRendered ||
              isFirstFormValidated ||
              isSecondFormValidated) && (
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
                  {isPatientRegisterPageRendered
                    ? 'Etape 1/3: Informations personnelles'
                    : isFirstFormValidated
                      ? 'Etape 2/3: Informations de contact'
                      : isSecondFormValidated
                        ? 'Etape 3/3: Informations de compte'
                        : ''}
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
