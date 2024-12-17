import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useEffect, useState } from 'react';
import StandardPasswordInput from '../StandardInputs/StandardPasswordInput';
import StandardEmailInput from '../StandardInputs/StandardEmailInput';
import {
  handlePatientConnection,
  handleTherapistConnection,
} from '../../../../utils/apiUtils';
import StandardTextInput from '../StandardInputs/StandardTextInput';
import StandardDateInput from '../StandardInputs/StandardDateInput';
import StandardDropdownInput from '../StandardInputs/StandardDropdownInput';
import StandardTelephoneInput from '../StandardInputs/StandardTelephoneInput';

interface FormSectionProps {
  isHomePageFormSection?: boolean;
  isPatientLoginPageFormSection?: boolean;
  isTherapistLoginPageFormSection?: boolean;
  isRegisterPageRendered: boolean;
  isFirstFormValidated: boolean;
  isSecondFormValidated: boolean;
  isThirdFormValidated: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRegisterPageRendered: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FormSection({
  isHomePageFormSection,
  isPatientLoginPageFormSection,
  isTherapistLoginPageFormSection,
  isRegisterPageRendered,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  setPatientProfileToken,
  setTherapistProfileToken,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsRegisterPageRendered,
}: FormSectionProps) {
  // Patient login data states
  const [patientLoginPassword, setPatientLoginPassword] = useState<string>('');
  const [patientLoginEmail, setPatientLoginEmail] = useState<string>('');

  // Therapist login data states
  const [therapistLoginPassword, setTherapistLoginPassword] =
    useState<string>('');
  const [therapistLoginEmail, setTherapistLoginEmail] = useState<string>('');

  // Patient and therapist error messages
  const [patientErrorMessage, setPatientErrorMessage] = useState<string>('');
  const [therapistErrorMessage, setTherapistErrorMessage] =
    useState<string>('');

  const [sentPatientData, setSentPatientData] = useState({});
  const [registeredPatientGender, setRegisteredPatientGender] = useState('');
  const [registeredPatientBirthDate, setRegisteredPatientBirthDate] =
    useState<string>();

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
    const response = await handlePatientConnection(
      patientLoginEmail,
      patientLoginPassword
    );

    // If the response is true, set the patient profile token
    if (response) {
      if (setPatientProfileToken) {
        setPatientProfileToken(response);
        console.log("Great, you're connected!");
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
      !formData.get('surname')
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
    }
    // Check if the patient is under 18 years old
    else {
      const age =
        currentYear - Number(registeredPatientBirthDate?.split('-')[0]);
      if (age < 18) {
        setPatientErrorMessage('Vous devez être majeur pour vous inscrire');
        return;
      }
    }

    // Create an object with the form data
    const sentData = {
      name: formData.get('name'),
      birth_name: formData.get('birth_name'),
      surname: formData.get('surname'),
      birth_date: registeredPatientBirthDate,
    };

    // Set the patient error message to an empty string
    setPatientErrorMessage('');
    // Set the sent patient data with the form data
    setSentPatientData(sentData);
    // Set the first form as validated and the second form as not validated
    setIsRegisterPageRendered(false);
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
    // Check if the patient gender is empty
    else if (registeredPatientGender === '') {
      setPatientErrorMessage('Veuillez sélectionner votre genre');
    }

    // Create an object with the form data
    const sentData = {
      street_number: formData.get('street_number'),
      street_name: formData.get('street_name'),
      postal_code: formData.get('postal_code'),
      city: formData.get('city'),
      phone_number: formData.get('phone_number'),
      gender: registeredPatientGender,
    };

    // Set the patient error message to an empty string
    setPatientErrorMessage('');
    // Set the sent patient data with the form data
    setSentPatientData({ ...sentPatientData, ...sentData });
    // Set the second form as validated and the third form as not validated
    setIsFirstFormValidated(false);
    setIsSecondFormValidated(true);
  };

  useEffect(() => {
    console.log(sentPatientData);
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
              : isRegisterPageRendered
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
        className={`${!isHomePageFormSection ? 'opacity-90 max-w-80' : 'opacity-75 md:w-96 md:absolute md:top-32 md:left-16 lg:left-20 md:text-xl lg:w-96 xl:top-32 xl:w-1/3 xl:text-2xl 2xl:top-52'} font-normal text-sm h-fit my-auto lg:text-base xl:text-xs w-10/12 md:w-2/3 text-primaryBlue bg-white p-6 rounded-3xl italic`}
      >
        {isHomePageFormSection ? (
          <>
            <p className="mb-2 indent-4">
              Bienvenue sur <span className="font-bold">kineSoin</span> !
            </p>
            <p className="mb-2 indent-4">
              Votre espace dédié à la kinésithérapie et à votre bien-être.
              Prenez soin de votre santé en toute simplicité en prenant
              rendez-vous avec nos professionnels qualifiés.
            </p>
            <p className="mb-2 indent-4">
              Inscrivez-vous dès maintenant pour accéder à tous nos services
              personnalisés et planifier vos séances en ligne.
            </p>
            <p className="indent-4">
              <Link to="/registerPatient" className="font-bold text-primaryRed">
                Inscrivez-vous ici !
              </Link>{' '}
            </p>
          </>
        ) : (
          <form
            action="#"
            onSubmit={
              isPatientLoginPageFormSection
                ? checkPatientCredentials
                : isTherapistLoginPageFormSection
                  ? checkTherapistCredentials
                  : isRegisterPageRendered
                    ? handleFirstPatientRegisterForm
                    : isFirstFormValidated
                      ? handleSecondPatientRegisterForm
                      : undefined
            }
          >
            <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
              {(isPatientLoginPageFormSection ||
                isTherapistLoginPageFormSection) &&
                `Connexion ${isPatientLoginPageFormSection ? 'Patient' : 'Thérapeute'}`}
              {(isRegisterPageRendered ||
                isFirstFormValidated ||
                isSecondFormValidated) &&
                'Inscription Patient'}
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

            {isRegisterPageRendered && (
              <>
                <StandardTextInput isNameInput />
                <StandardTextInput isBirthNameInput />
                <StandardTextInput isSurnameInput />
                <StandardDateInput
                  setRegisteredPatientBirthDate={setRegisteredPatientBirthDate}
                />
              </>
            )}

            {isFirstFormValidated && (
              <>
                <StandardDropdownInput
                  isGenderDropdownInput
                  registeredPatientGender={registeredPatientGender}
                  setRegisteredPatientGender={setRegisteredPatientGender}
                />

                <div className="flex gap-2 items-center justify-between">
                  <StandardTextInput isStreetNumberInput />
                  <StandardTextInput isStreetNameInput />
                </div>

                <div className="flex gap-2 items-center justify-between">
                  <StandardTextInput isPostalCodeInput />
                  <StandardTextInput isCityInput />
                </div>

                {/* <StandardTextInput isTelephoneInput /> */}
                <StandardTelephoneInput isPatientTelephoneInput />
              </>
            )}

            {isSecondFormValidated && <StandardTextInput />}

            {isPatientLoginPageFormSection && (
              <>
                <div className="text-xs mb-4 text-center mt-4">
                  <p>
                    Pas encore membre?{' '}
                    <Link
                      to="/registerPatient"
                      className="text-primaryRed"
                      onClick={() => setIsRegisterPageRendered(true)}
                    >
                      Inscrivez-vous ici
                    </Link>
                  </p>
                </div>
              </>
            )}
            <div className="flex items-center">
              <CustomButton
                btnText={`${isRegisterPageRendered || isFirstFormValidated ? 'Valider' : 'Connexion'}`}
                btnType="submit"
                normalButton
              />
            </div>
            {isRegisterPageRendered ||
              (isFirstFormValidated && (
                <>
                  <div className="text-xs mb-4 text-center mt-4">
                    <p>
                      Déjà membre?{' '}
                      <Link
                        to="/loginPatient"
                        className="text-primaryRed"
                        onClick={() => setIsRegisterPageRendered(false)}
                      >
                        Connectez-vous ici
                      </Link>
                    </p>
                  </div>
                  <div className="text-sm mb-4 text-center mt-4">
                    {isRegisterPageRendered
                      ? 'Etape 1/3: Informations personnelles'
                      : 'Etape 2/3: Informations de contact'}
                  </div>
                </>
              ))}
          </form>
        )}
      </div>
    </section>
  );
}
