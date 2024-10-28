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

interface FormSectionProps {
  isHomePageFormSection?: boolean;
  isPatientLoginPageFormSection?: boolean;
  isTherapistLoginPageFormSection?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
  isPatientRegisterPageFormSection?: boolean;
  isPatientRegisterPageSecondFormSection?: boolean;
  isPatientRegisterPageThirdFormSection?: boolean;
  isPatientConfirmationSection?: boolean;
  setIsFirstFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSecondFormValidated: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function FormSection({
  isHomePageFormSection,
  isPatientLoginPageFormSection,
  isTherapistLoginPageFormSection,
  setPatientProfileToken,
  setTherapistProfileToken,
  isPatientRegisterPageFormSection,
  isPatientRegisterPageSecondFormSection,
  isPatientRegisterPageThirdFormSection,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  isPatientConfirmationSection,
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

  useEffect(() => {
    console.log(sentPatientData);
  }),
    [sentPatientData];

  const [patientRegisterName, setPatientRegisterName] = useState<string>('');
  const [patientRegisterSurname, setPatientRegisterSurname] =
    useState<string>('');
  const [patientRegisterBirthName, setPatientRegisterBirthName] =
    useState<string>('');
  const [patientRegisterBirthDate, setPatientRegisterBirthDate] =
    useState<Date>(new Date());
  const [patientRegisterStreetNumber, setPatientRegisterStreetNumber] =
    useState<string>('');
  const [patientRegisterStreetName, setPatientRegisterStreetName] =
    useState<string>('');
  const [patientRegisterPostalCode, setPatientRegisterPostalCode] =
    useState<string>('');
  const [patientRegisterCity, setPatientRegisterCity] = useState<string>('');
  const [patientRegisterTelephone, setPatientRegisterTelephone] =
    useState<string>('');

  useEffect(() => {
    console.log(isPatientRegisterPageFormSection);
  }, [isPatientRegisterPageFormSection]);

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

    // Check if all required fields are filled
    if (
      !patientRegisterName ||
      !patientRegisterSurname ||
      !patientRegisterBirthName ||
      !patientRegisterBirthDate
    ) {
      setPatientErrorMessage('Veuillez remplir tous les champs');
      return;
    }

    const currentDate = new Date();
    const birthYear = patientRegisterBirthDate.getFullYear();
    const age = currentDate.getFullYear() - birthYear;

    if (currentDate <= patientRegisterBirthDate) {
      setPatientErrorMessage('Date de naissance invalide');
      return;
    }

    if (
      age < 18 ||
      (age === 18 &&
        currentDate <
          new Date(patientRegisterBirthDate.setFullYear(birthYear + 18)))
    ) {
      setPatientErrorMessage('Vous devez être majeur pour vous inscrire');
      return;
    }

    const patientData = {
      name: patientRegisterName,
      surname: patientRegisterSurname,
      birthName: patientRegisterBirthName,
      birthDate: patientRegisterBirthDate,
    };
    setSentPatientData(patientData);

    setIsFirstFormValidated(true);
    isPatientRegisterPageFormSection = false;
  };

  return (
    <section
      className={`${
        isHomePageFormSection
          ? 'bg-homePage'
          : isPatientLoginPageFormSection
            ? 'bg-patientConnectionPage'
            : isTherapistLoginPageFormSection
              ? 'bg-therapistConnectionPage'
              : isPatientRegisterPageFormSection
                ? 'bg-patientFirstRegisterPage'
                : isPatientRegisterPageSecondFormSection
                  ? 'bg-patientSecondRegisterPage'
                  : isPatientRegisterPageThirdFormSection
                    ? 'bg-patientSecondRegisterPage'
                    : isPatientConfirmationSection
                      ? 'bg-confirmationPage'
                      : ''
      } bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative`}
    >
      {' '}
      <div
        className={`${!isHomePageFormSection ? 'opacity-90 max-w-80' : 'opacity-75 md:absolute md:top-32 md:left-16 lg:left-20 xl:top-16 2xl:top-24'} font-normal text-sm h-fit my-auto lg:text-base xl:text-xs w-10/12 md:w-1/3 text-primaryBlue bg-white p-6 rounded-3xl italic`}
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
        ) : isPatientLoginPageFormSection ||
          isTherapistLoginPageFormSection ||
          isPatientRegisterPageFormSection ||
          isPatientRegisterPageSecondFormSection ||
          isPatientRegisterPageThirdFormSection ||
          isPatientConfirmationSection ? (
          <form
            action="#"
            onSubmit={
              isPatientLoginPageFormSection
                ? checkPatientCredentials
                : isTherapistLoginPageFormSection
                  ? checkTherapistCredentials
                  : isPatientRegisterPageFormSection
                    ? handleFirstPatientRegisterForm
                    : undefined
            }
          >
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
              {(isPatientLoginPageFormSection ||
                isTherapistLoginPageFormSection) &&
                `Connexion ${isPatientLoginPageFormSection ? 'Patient' : 'Thérapeute'}`}
              {(isPatientRegisterPageFormSection ||
                isPatientRegisterPageSecondFormSection ||
                isPatientRegisterPageThirdFormSection) &&
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

            {isPatientRegisterPageFormSection && (
              <>
                <StandardTextInput
                  isNameInput
                  patientRegisterName={patientRegisterName}
                  setPatientRegisterName={setPatientRegisterName}
                />
                <StandardTextInput
                  isBirthNameInput
                  patientRegisterBirthName={patientRegisterBirthName}
                  setPatientRegisterBirthName={setPatientRegisterBirthName}
                />
                <StandardTextInput
                  isSurnameInput
                  patientRegisterSurname={patientRegisterSurname}
                  setPatientRegisterSurname={setPatientRegisterSurname}
                />
                <StandardDateInput
                  patientRegisterBirthDate={patientRegisterBirthDate}
                  setPatientRegisterBirthDate={setPatientRegisterBirthDate}
                />
              </>
            )}

            {isPatientRegisterPageSecondFormSection && (
                <>
                  <StandardTextInput
                    isStreetNumberInput
                    patientRegisterStreetNumber={patientRegisterStreetNumber}
                    setPatientRegisterStreetNumber={
                      setPatientRegisterStreetNumber
                    }
                  />
                  <StandardTextInput
                    isStreetNameInput
                    patientRegisterStreetName={patientRegisterStreetName}
                    setPatientRegisterStreetName={setPatientRegisterStreetName}
                  />
                  <StandardTextInput
                    isPostalCodeInput
                    patientRegisterPostalCode={patientRegisterPostalCode}
                    setPatientRegisterPostalCode={setPatientRegisterPostalCode}
                  />
                  <StandardTextInput
                    isCityInput
                    patientRegisterCity={patientRegisterCity}
                    setPatientRegisterCity={setPatientRegisterCity}
                  />
                  <StandardTextInput
                    isTelephoneInput
                    patientRegisterTelephone={patientRegisterTelephone}
                    setPatientRegisterTelephone={setPatientRegisterTelephone}
                  />
                </>
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
            <div className="flex items-center">
              <CustomButton
                btnText={`${isPatientRegisterPageFormSection ? 'Valider' : 'Connexion'}`}
                btnType="submit"
                normalButton
              />
            </div>
            {isPatientRegisterPageFormSection && (
              <>
                <div className="text-xs mb-4 text-center mt-4">
                  <p>
                    Déjà membre?{' '}
                    <Link to="/loginPatient" className="text-primaryRed">
                      Connectez-vous ici
                    </Link>
                  </p>
                </div>
                <div className="text-sm mb-4 text-center mt-4">
                  Etape 1/3: Informations personnelles
                </div>
              </>
            )}
          </form>
        ) : null}
      </div>
    </section>
  );
}
