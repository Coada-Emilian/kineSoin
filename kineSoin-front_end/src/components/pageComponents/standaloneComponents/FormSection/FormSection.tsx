import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useEffect, useState } from 'react';
import StandardPasswordInput from '../StandardInputs/StandardPasswordInput';
import StandardEmailInput from '../StandardInputs/StandardEmailInput';
import {
  handlePatientLogin,
  handlePatientRegistration,
  handleTherapistConnection,
} from '../../../../utils/apiUtils';
import StandardTextInput from '../StandardInputs/StandardTextInput';
import StandardDateInput from '../StandardInputs/StandardDateInput';
import StandardDropdownInput from '../StandardInputs/StandardDropdownInput';
import StandardTelephoneInput from '../StandardInputs/StandardTelephoneInput';
import StandardFileInput from '../StandardInputs/StandardFileInput';
import { useNavigate } from 'react-router-dom';

interface FormSectionProps {
  isHomePageFormSection?: boolean;
  isPatientLoginPageFormSection?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  isTherapistLoginPageFormSection?: boolean;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  isFirstFormValidated: boolean;
  isSecondFormValidated: boolean;
  isThirdFormValidated: boolean;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated: React.Dispatch<React.SetStateAction<boolean>>;

  isPatientRegisterPageFormSection?: boolean;
}
export default function FormSection({
  isHomePageFormSection,
  isPatientLoginPageFormSection,
  isTherapistLoginPageFormSection,
  isPatientRegisterPageFormSection,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  setPatientProfileToken,
  setTherapistProfileToken,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
}: FormSectionProps) {
  // Patient login data states
  const [patientLoginPassword, setPatientLoginPassword] = useState<string>('');
  const [patientLoginEmail, setPatientLoginEmail] = useState<string>('');

  // Therapist login data states
  const [therapistLoginPassword, setTherapistLoginPassword] =
    useState<string>('');
  const [therapistLoginEmail, setTherapistLoginEmail] = useState<string>('');

  // Patient and therapist error messages states
  const [patientErrorMessage, setPatientErrorMessage] = useState<string>('');
  const [therapistErrorMessage, setTherapistErrorMessage] =
    useState<string>('');

  // Sent patient data state
  const [sentPatientData, setSentPatientData] = useState({});

  // Patient registration forms validation states
  const [registeredPatientGender, setRegisteredPatientGender] = useState('');
  const [registeredPatientBirthDate, setRegisteredPatientBirthDate] =
    useState<string>();
  const [patientRegisterEmail, setPatientRegisterEmail] = useState<string>('');
  const [patientRegisterPassword, setPatientRegisterPassword] =
    useState<string>('');
  const [patientRegisterConfirmPassword, setPatientRegisterConfirmPassword] =
    useState<string>('');

  const [patientImage, setPatientImage] = useState<File | null>(null);

  const [isGlobalFormSubmitted, setIsGlobalFormSubmitted] =
    useState<boolean>(false);

  const navigate = useNavigate();

  // Patient login function
  const checkPatientCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPatientErrorMessage('');

    // Check if the email and password fields are empty
    if (!patientLoginEmail || !patientLoginPassword) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    // Call the handlePatientConnection function from the apiUtils file
    const response = await handlePatientLogin(
      patientLoginEmail,
      patientLoginPassword
    );

    // If the response is true, set the patient profile token
    if (response) {
      if (setPatientProfileToken) {
        setPatientProfileToken(response);

        navigate('/patient/dashboard');
      } else {
        setPatientErrorMessage('Email et/ou Mot de passe invalide');
      }
    } else {
      setPatientErrorMessage('Email et/ou Mot de passe invalide');
    }
  };

  // Therapist login function
  const checkTherapistCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setTherapistErrorMessage('');
    // Check if the email and password fields are empty
    if (!therapistLoginEmail || !therapistLoginPassword) {
      setTherapistErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    // Call the handleTherapistConnection function from the apiUtils file
    const response = await handleTherapistConnection(
      therapistLoginEmail,
      therapistLoginPassword
    );

    // If the response is true, set the therapist profile token
    if (response) {
      if (setTherapistProfileToken) {
        setTherapistProfileToken(response);
        console.log("great, you're connected");
      } else {
        setTherapistErrorMessage('Email et/ou Mot de passe invalide');
      }
    } else {
      setTherapistErrorMessage('Email et/ou Mot de passe invalide');
    }
  };

  // Patient registration function for the first form
  const handleFirstPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPatientErrorMessage('');

    // Retrieve the form data, the current date and year
    const form = e.currentTarget;
    const formData = new FormData(form);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Check if the name, birth name and surname fields are empty
    if (
      !formData.get('name') ||
      !formData.get('birth_name') ||
      !formData.get('surname') ||
      !formData.get('birth-date')
    ) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
      return;
    }
    // Check if the birth date is empty or invalid
    else if (
      registeredPatientBirthDate &&
      registeredPatientBirthDate > currentDate.toISOString().split('T')[0]
    ) {
      setPatientErrorMessage('Veuillez entrer une date valide');
      return;
    } // Check if the patient gender is empty
    else if (registeredPatientGender === '') {
      setPatientErrorMessage('Veuillez sélectionner votre genre');
    }
    // Check if the patient is under 12 years old
    else {
      const age =
        currentYear - Number(registeredPatientBirthDate?.split('-')[0]);
      if (age < 12) {
        setPatientErrorMessage(
          'Vous devez avoir au moins 12 ans pour vous inscrire'
        );
        return;
      }
    }

    // Create an object with the form data
    const sentData = {
      name: formData.get('name'),
      birth_name: formData.get('birth_name'),
      surname: formData.get('surname'),
      birth_date: registeredPatientBirthDate,
      gender: registeredPatientGender,
    };

    // Set the patient error message to an empty string
    setPatientErrorMessage('');
    // Set the sent patient data with the form data
    setSentPatientData(sentData);
    // Set the first form as validated and the second form as not validated
    setIsFirstFormValidated(true);
  };

  // Patient registration function for the second form
  const handleSecondPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPatientErrorMessage('');

    // Retrieve the form data
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Check if the postal code, city, street number, street name and phone number fields are empty
    if (
      !formData.get('postal_code') ||
      !formData.get('city') ||
      !formData.get('street_number') ||
      !formData.get('street_name') ||
      !formData.get('phone_number')
    ) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
    }

    // Create an object with the form data
    const sentData = {
      street_number: formData.get('street_number'),
      street_name: formData.get('street_name'),
      postal_code: formData.get('postal_code'),
      city: formData.get('city'),
      phone_number: formData.get('phone_number'),
    };

    // Set the patient error message to an empty string
    setPatientErrorMessage('');
    // Set the sent patient data with the form data
    setSentPatientData({ ...sentPatientData, ...sentData });
    // Set the second form as validated and the third form as not validated
    setIsFirstFormValidated(false);
    setIsSecondFormValidated(true);
  };

  // Patient registration function for the third form
  const handleThirdPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPatientErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (
      !patientImage ||
      !formData.get('email') ||
      !formData.get('password') ||
      !formData.get('confirm-password')
    ) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (formData.get('password') !== formData.get('confirm-password')) {
      setPatientErrorMessage('Les mots de passe ne correspondent pas');
      return;
    } else if ((formData.get('password') as string).length < 12) {
      setPatientErrorMessage(
        'Le mot de passe doit contenir au moins 12 caractères'
      );
      return;
    } else if (
      !/\d/.test(formData.get('password') as string) ||
      !/[a-z]/.test(formData.get('password') as string) ||
      !/[A-Z]/.test(formData.get('password') as string)
    ) {
      setPatientErrorMessage(
        'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'
      );
      return;
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
        formData.get('email') as string
      )
    ) {
      setPatientErrorMessage('Veuillez entrer une adresse email valide');
      return;
    } else {
      const sentData = {
        email: formData.get('email'),
        password: formData.get('password'),
        repeated_password: formData.get('confirm-password'),
        photo: patientImage,
      };
      setSentPatientData({ ...sentPatientData, ...sentData });
      setIsSecondFormValidated(false);
      setIsThirdFormValidated(true);
    }
  };

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
            console.log('Patient registered');
            setIsGlobalFormSubmitted(true);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    registerPatient();
  }, [sentPatientData]);

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
              : isPatientRegisterPageFormSection
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
        className={`${!isHomePageFormSection ? (isGlobalFormSubmitted ? 'max-w-2xl opacity-90' : 'opacity-90 max-w-80') : 'opacity-75 md:w-2/3 md:absolute md:top-32 md:left-16 md:text-base lg:text-lg lg:left-20 lg:w-2/4 xl:top-32 xl:text-xl 2xl:top-52 2xl:text-2xl'} font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-300 p-6 rounded-3xl italic`}
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
              <Link
                to="/public/registerPatient"
                className="font-bold text-primaryRed"
              >
                Inscrivez-vous ici !
              </Link>{' '}
            </p>
          </div>
        ) : (
          <form
            encType={isSecondFormValidated ? 'multipart/form-data' : undefined}
            onSubmit={
              isPatientLoginPageFormSection
                ? checkPatientCredentials
                : isTherapistLoginPageFormSection
                  ? checkTherapistCredentials
                  : isPatientRegisterPageFormSection
                    ? handleFirstPatientRegisterForm
                    : isFirstFormValidated
                      ? handleSecondPatientRegisterForm
                      : isSecondFormValidated
                        ? handleThirdPatientRegisterForm
                        : (e) => e.preventDefault()
            }
          >
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
              {(isPatientLoginPageFormSection ||
                isTherapistLoginPageFormSection) &&
                `Connexion ${isPatientLoginPageFormSection ? 'Patient' : 'Thérapeute'}`}

              {(isPatientRegisterPageFormSection ||
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

            {patientErrorMessage || therapistErrorMessage ? (
              <p className="text-center text-red-600 font-medium mb-2">
                {patientErrorMessage || therapistErrorMessage}
              </p>
            ) : null}

            {isPatientLoginPageFormSection && (
              <>
                <StandardEmailInput
                  isPatientLoginPageEmailInput
                  patientLoginEmail={patientLoginEmail}
                  setPatientLoginEmail={setPatientLoginEmail}
                />

                <StandardPasswordInput
                  isPatientLoginPagePasswordInput
                  patientLoginPassword={patientLoginPassword}
                  setPatientLoginPassword={setPatientLoginPassword}
                />
              </>
            )}

            {isTherapistLoginPageFormSection && (
              <>
                {' '}
                <StandardEmailInput
                  isTherapistLoginPageEmailInput
                  therapistLoginEmail={therapistLoginEmail}
                  setTherapistLoginEmail={setTherapistLoginEmail}
                />
                <StandardPasswordInput
                  isTherapistLoginPagePasswordInput
                  therapistLoginPassword={therapistLoginPassword}
                  setTherapistLoginPassword={setTherapistLoginPassword}
                />
              </>
            )}

            {isPatientRegisterPageFormSection && (
              <>
                <StandardTextInput isNameInput />

                <StandardTextInput isBirthNameInput />

                <StandardTextInput isSurnameInput />

                <StandardDateInput
                  isPatientRegisterBirthdateInput
                  setRegisteredPatientBirthDate={setRegisteredPatientBirthDate}
                />

                <StandardDropdownInput
                  isGenderDropdownInput
                  registeredPatientGender={registeredPatientGender}
                  setRegisteredPatientGender={setRegisteredPatientGender}
                />
              </>
            )}

            {isFirstFormValidated && (
              <>
                <div className="flex gap-2 items-center justify-between">
                  <StandardTextInput isStreetNumberInput />

                  <StandardTextInput isStreetNameInput />
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <StandardTextInput isPostalCodeInput />

                  <StandardTextInput isCityInput />
                </div>

                <StandardTelephoneInput isPatientTelephoneInput />
              </>
            )}

            {isSecondFormValidated && (
              <>
                <StandardFileInput
                  isPatientRegisterImageInput
                  setPatientImage={setPatientImage}
                />

                <StandardEmailInput
                  isPatientRegisterEmailInput
                  patientRegisterEmail={patientRegisterEmail}
                  setPatientRegisterEmail={setPatientRegisterEmail}
                />

                <StandardPasswordInput
                  isPatientRegisterPasswordInput
                  patientRegisterPassword={patientRegisterPassword}
                  setPatientRegisterPassword={setPatientRegisterPassword}
                />

                <StandardPasswordInput
                  isPatientRegisterConfirmPasswordInput
                  patientRegisterConfirmPassword={
                    patientRegisterConfirmPassword
                  }
                  setPatientRegisterConfirmPassword={
                    setPatientRegisterConfirmPassword
                  }
                />
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
                    <Link
                      to="/public/registerPatient"
                      className="text-primaryRed"
                    >
                      Inscrivez-vous ici
                    </Link>
                  </p>
                </div>
              </>
            )}

            {!isThirdFormValidated && (
              <div className="flex items-center">
                <CustomButton
                  btnText={`${isPatientRegisterPageFormSection || isFirstFormValidated ? 'Valider' : isSecondFormValidated ? 'Inscription' : 'Connexion'}`}
                  btnType="submit"
                  normalButton
                />
              </div>
            )}

            {(isPatientRegisterPageFormSection ||
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
                  {isPatientRegisterPageFormSection
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
