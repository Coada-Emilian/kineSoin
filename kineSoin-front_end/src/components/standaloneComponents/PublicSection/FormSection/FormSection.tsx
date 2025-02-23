import { Link, useLocation } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../../generalComponents/CustomButton/CustomButton.tsx';
import { useEffect, useState } from 'react';
import StandardPasswordInput from '../../generalComponents/StandardInputs/StandardPasswordInput.tsx';
import StandardEmailInput from '../../generalComponents/StandardInputs/StandardEmailInput.tsx';
import StandardTextInput from '../../generalComponents/StandardInputs/StandardTextInput.tsx';
import StandardDateInput from '../../generalComponents/StandardInputs/StandardDateInput.tsx';
import StandardDropdownInput from '../../generalComponents/StandardInputs/StandardDropdownInput.tsx';
import StandardTelephoneInput from '../../generalComponents/StandardInputs/StandardTelephoneInput.tsx';
import StandardFileInput from '../../generalComponents/StandardInputs/StandardFileInput.tsx';
import { useNavigate } from 'react-router-dom';
import DNALoader from '../../../../utils/DNALoader.tsx';
import { handlePatientRegistration } from '../../../../utils/apiUtils/publicApiUtils.tsx';
import {
  checkPatientCredentials,
  checkTherapistCredentials,
} from './authentificationUtils.ts';
import {
  handleFirstPatientRegisterForm,
  handleSecondPatientRegisterForm,
  handleThirdPatientRegisterForm,
} from './registerFormUtils.ts';

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
    const registerPatient = async () => {
      if (isThirdFormValidated) {
        try {
          const formData = new FormData();
          Object.entries(sentPatientData).forEach(([key, value]) => {
            formData.append(key, value as string | Blob);
          });
          const response = await handlePatientRegistration(formData);
          if (response) {
            if (setIsGlobalFormSubmitted) {
              setIsGlobalFormSubmitted(true);
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    registerPatient();
  }, [sentPatientData]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    // Render the form section with the corresponding background image and form content
    <section
      className={`${
        isHomePageFormSection
          ? 'bg-homePage md:p-96'
          : isPatientLoginPageFormSection
            ? 'bg-patientConnectionPage md:p-48 xl:p-56 2xl:p-72'
            : isTherapistLoginPageFormSection
              ? 'bg-therapistConnectionPage md:p-48 xl:p-56 2xl:p-72'
              : isPatientRegisterPageRendered
                ? 'bg-patientFirstRegisterPage md:p-48 xl:p-56 2xl:p-72'
                : isFirstFormValidated
                  ? 'bg-patientSecondRegisterPage md:p-48 xl:p-56 2xl:p-72'
                  : isSecondFormValidated
                    ? 'bg-patientThirdRegisterPage md:p-48 xl:p-56 2xl:p-72'
                    : isThirdFormValidated
                      ? 'bg-confirmationPage md:p-48 xl:p-56 2xl:p-72'
                      : ''
      } bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative`}
    >
      {' '}
      <div
        className={`${!isHomePageFormSection ? (isGlobalFormSubmitted ? 'max-w-2xl opacity-90' : 'opacity-90 max-w-80') : 'opacity-75 md:w-2/3 md:absolute md:top-32 md:left-16 md:text-base lg:text-lg lg:left-20 lg:w-2/4 xl:top-32 xl:text-xl 2xl:top-52 2xl:text-2xl'} font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic`}
      >
        {isHomePageFormSection ? (
          <div className="indent-4">
            <p className="mb-2">
              Bienvenue sur <span className="font-bold">kineSoin</span> !
            </p>

            <p className="mb-2">
              Votre espace dédié à la kinésithérapie et à votre bien-être.
              Prenez soin de votre santé en toute simplicité en prenant
              rendez-vous avec nos professionnels qualifiés.
            </p>

            <p className="mb-2">
              Inscrivez-vous dès maintenant pour accéder à tous nos services
              personnalisés et planifier vos séances en ligne.
            </p>

            <p>
              <Link to="/registerPatient" className="font-bold text-primaryRed">
                Inscrivez-vous ici !
              </Link>{' '}
            </p>
          </div>
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

              //   : isSecondFormValidated
              //     ? handleThirdPatientRegisterForm
              //     : (e) => e.preventDefault()
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

            <img src={mainLogo} alt="kinesoin" className="w-14 mx-auto mb-4" />

            {errorMessage && (
              <p className="text-center text-red-600 font-medium mb-2">
                {errorMessage}
              </p>
            )}

            {isPatientLoginPageFormSection && (
              <>
                <StandardEmailInput isPatientLoginPageEmailInput />

                <StandardPasswordInput isPatientLoginPagePasswordInput />
              </>
            )}

            {isTherapistLoginPageFormSection && (
              <>
                <StandardEmailInput isTherapistLoginPageEmailInput />
                <StandardPasswordInput isTherapistLoginPagePasswordInput />
              </>
            )}

            {isPatientRegisterPageRendered && (
              <>
                <StandardTextInput patientRegister={{ isNameInput: true }} />

                <StandardTextInput
                  patientRegister={{ isBirthNameInput: true }}
                />

                <StandardTextInput patientRegister={{ isSurnameInput: true }} />

                <StandardDateInput isPatientRegisterBirthdateInput />

                <StandardDropdownInput isGenderDropdownInput />
              </>
            )}

            {isFirstFormValidated && (
              <>
                <div className="flex gap-2 items-center justify-between">
                  <StandardTextInput
                    patientRegister={{ isStreetNumberInput: true }}
                  />

                  <StandardTextInput
                    patientRegister={{ isStreetNameInput: true }}
                  />
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <StandardTextInput
                    patientRegister={{ isPostalCodeInput: true }}
                  />

                  <StandardTextInput patientRegister={{ isCityInput: true }} />
                </div>

                <div className="flex gap-2 items-center justify-between">
                  {' '}
                  <StandardDropdownInput isCountryDropdownInput />
                  <StandardTelephoneInput isPatientTelephoneInput />
                </div>
              </>
            )}

            {isSecondFormValidated && (
              <>
                <StandardFileInput
                  isPatientRegisterImageInput
                  setPatientImage={setPatientImage}
                />

                <StandardEmailInput isPatientRegisterEmailInput />

                <StandardPasswordInput isPatientRegisterPasswordInput />

                <StandardPasswordInput isPatientRegisterConfirmPasswordInput />
              </>
            )}

            {isGlobalFormSubmitted && (
              <div className="text-base">
                <p className="mb-4 indent-4">
                  {isGlobalFormSubmitted
                    ? 'Votre inscription a bien été enregistrée !'
                    : "Nous avons rencontré un problème lors de l'inscription. Veuillez réessayer ultérieurement."}
                </p>

                <p className="mb-4 indent-4">
                  {isGlobalFormSubmitted
                    ? 'Merci de vous être inscrit sur KineSoin. Votre compte est en cours de validation et sera activé prochainement. Vous recevrez une confirmation dès son activation.'
                    : "Une erreur est survenue lors de l'inscription. Cela peut être dû à une connexion instable ou à un problème temporaire sur nos serveurs. Veuillez vérifier votre connexion Internet et réessayer dans quelques minutes. Si le problème persiste, contactez notre support technique pour obtenir de l'aide."}
                </p>

                <p className="indent-4">
                  <Link to="/" className="font-bold text-primaryRed">
                    Retour à l'accueil
                  </Link>{' '}
                </p>
              </div>
            )}

            {isPatientLoginPageFormSection && (
              <>
                <div className="text-xs mb-4 text-center mt-4">
                  <p>
                    Pas encore membre?{' '}
                    <Link to="/registerPatient" className="text-primaryRed">
                      Inscrivez-vous ici
                    </Link>
                  </p>
                </div>
              </>
            )}

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
