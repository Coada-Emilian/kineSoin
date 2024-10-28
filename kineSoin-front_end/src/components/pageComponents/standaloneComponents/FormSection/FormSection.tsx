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

interface FormSectionProps {
  isHomePageFormSection?: boolean;
  isPatientLoginPageFormSection?: boolean;
  isTherapistLoginPageFormSection?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsThirdFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterPageRendered: boolean;
  isFirstFormValidated: boolean;
  isSecondFormValidated: boolean;
  isThirdFormValidated: boolean;
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
  const [patientLoginPassword, setPatientLoginPassword] = useState<string>('');
  const [patientLoginEmail, setPatientLoginEmail] = useState<string>('');
  const [therapistLoginPassword, setTherapistLoginPassword] =
    useState<string>('');
  const [therapistLoginEmail, setTherapistLoginEmail] = useState<string>('');
  const [patientErrorMessage, setPatientErrorMessage] = useState<string>('');
  const [therapistErrorMessage, setTherapistErrorMessage] =
    useState<string>('');
  const [sentPatientData, setSentPatientData] = useState({});
  const [registeredPatientGender, setRegisteredPatientGender] = useState('');
  const [registeredPatientBirthDate, setRegisteredPatientBirthDate] =
    useState<string>();

  const checkPatientCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPatientErrorMessage('');

    if (!patientLoginEmail || !patientLoginPassword) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    const response = await handlePatientConnection(
      patientLoginEmail,
      patientLoginPassword
    );

    if (response) {
      if (setPatientProfileToken) {
        setPatientProfileToken(response);
        console.log("great, you're connected");
      } else {
        setPatientErrorMessage('Email et/ou Mot de passe invalide');
      }
    } else {
      setPatientErrorMessage('Email et/ou Mot de passe invalide');
    }
  };

  const checkTherapistCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setTherapistErrorMessage('');
    if (!therapistLoginEmail || !therapistLoginPassword) {
      setTherapistErrorMessage('Veuillez remplir tous les champs');
      return;
    }
    const response = await handleTherapistConnection(
      therapistLoginEmail,
      therapistLoginPassword
    );

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

  const handleFirstPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPatientErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    if (
      !formData.get('name') ||
      !formData.get('birth_name') ||
      !formData.get('surname')
    ) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
      return;
    } else if (
      registeredPatientBirthDate &&
      registeredPatientBirthDate > currentDate.toISOString().split('T')[0]
    ) {
      setPatientErrorMessage('Veuillez entrer une date valide');
      return;
    } else {
      const age =
        currentYear - Number(registeredPatientBirthDate?.split('-')[0]);
      if (age < 18) {
        setPatientErrorMessage('Vous devez être majeur pour vous inscrire');
        return;
      }
    }

    const sentData = {
      name: formData.get('name'),
      birth_name: formData.get('birth_name'),
      surname: formData.get('surname'),
      birth_date: registeredPatientBirthDate,
    };
    setPatientErrorMessage('');
    setSentPatientData(sentData);
    setIsRegisterPageRendered(false);
    setIsFirstFormValidated(true);
  };

  const handleSecondPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setPatientErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    if (
      !formData.get('postal_code') ||
      !formData.get('city') ||
      !formData.get('street_number') ||
      !formData.get('street_name') ||
      !formData.get('phone_number')
    ) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
    } else if (registeredPatientGender === '') {
      setPatientErrorMessage('Veuillez sélectionner votre genre');
    }
    const sentData = {
      street_number: formData.get('street_number'),
      street_name: formData.get('street_name'),
      postal_code: formData.get('postal_code'),
      city: formData.get('city'),
      phone_number: formData.get('phone_number'),
      gender: registeredPatientGender,
    };

    setPatientErrorMessage('');
    setSentPatientData({ ...sentPatientData, ...sentData });
    setIsFirstFormValidated(false);
    setIsSecondFormValidated(true);
  };

  useEffect(() => {
    console.log(sentPatientData);
  }, [sentPatientData]);

  return (
    <section
      className={`${
        isHomePageFormSection
          ? 'bg-homePage md:p-96'
          : isPatientLoginPageFormSection
            ? 'bg-patientConnectionPage'
            : isTherapistLoginPageFormSection
              ? 'bg-therapistConnectionPage'
              : isRegisterPageRendered
                ? 'bg-patientFirstRegisterPage'
                : isFirstFormValidated
                  ? 'bg-patientSecondRegisterPage'
                  : isSecondFormValidated
                    ? 'bg-patientThirdRegisterPage'
                    : isThirdFormValidated
                      ? 'bg-confirmationPage'
                      : ''
      } bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative`}
    >
      {' '}
      <div
        className={`${!isHomePageFormSection ? 'opacity-90 max-w-80' : 'opacity-75 md:w-72 md:absolute md:top-32 md:left-16 lg:left-20 lg:w-96 xl:top-32 xl:w-1/3 xl:text-lg 2xl:top-52'} font-normal text-sm h-fit my-auto lg:text-base xl:text-xs w-10/12 md:w-2/3 text-primaryBlue bg-white p-6 rounded-3xl italic`}
      >
        {isHomePageFormSection ? (
          <>
            <p className="mb-2">Bienvenue sur kineSoin !</p>
            <p className="mb-2">
              Votre espace dédié à la kinésithérapie et à votre bien-être.
              Prenez soin de votre santé en toute simplicité en prenant
              rendez-vous avec nos professionnels qualifiés. Inscrivez-vous dès
              maintenant pour accéder à tous nos services personnalisés et
              planifier vos séances en ligne.
            </p>
            <p>
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
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
              {(isPatientLoginPageFormSection ||
                isTherapistLoginPageFormSection) &&
                `Connexion ${isPatientLoginPageFormSection ? 'Patient' : 'Thérapeute'}`}
              {(isRegisterPageRendered ||
                isFirstFormValidated ||
                isSecondFormValidated) &&
                'Inscription'}
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
                <StandardTextInput isTelephoneInput />
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
