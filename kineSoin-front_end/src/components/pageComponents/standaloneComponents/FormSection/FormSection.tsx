import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useState } from 'react';
import StandardPasswordInput from '../StandardInputs/StandardPasswordInput';
import StandardEmailInput from '../StandardInputs/StandardEmailInput';
import {
  handlePatientConnection,
  handleTherapistConnection,
} from '../../../../utils/apiUtils';

interface FormSectionProps {
  isHomePageFormSection?: boolean;
  isPatientLoginPageFormSection?: boolean;
  isTherapistLoginPageFormSection?: boolean;
  setPatientProfileToken?: React.Dispatch<React.SetStateAction<string | null>>;
  setTherapistProfileToken?: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}
export default function FormSection({
  isHomePageFormSection,
  isPatientLoginPageFormSection,
  isTherapistLoginPageFormSection,
  setPatientProfileToken,
  setTherapistProfileToken,
}: FormSectionProps) {
  const [patientLoginPassword, setPatientLoginPassword] = useState<string>('');
  const [patientLoginEmail, setPatientLoginEmail] = useState<string>('');
  const [therapistLoginPassword, setTherapistLoginPassword] =
    useState<string>('');
  const [therapistLoginEmail, setTherapistLoginEmail] = useState<string>('');
  const [patientErrorMessage, setPatientErrorMessage] = useState<string>('');
  const [therapistErrorMessage, setTherapistErrorMessage] =
    useState<string>('');

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
  return (
    <section
      className={`${isHomePageFormSection ? 'bg-homePage' : isPatientLoginPageFormSection ? 'bg-patientConnectionPage' : isTherapistLoginPageFormSection ? 'bg-therapistConnectionPage' : ''} bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-screen md:relative`}
    >
      {' '}
      <div
        className={`${!isHomePageFormSection ? 'opacity-90 max-w-80' : 'opacity-75 md:absolute md:top-32 md:left-16 lg:left-20 xl:top-16 2xl:top-24'} font-normal text-sm h-fit my-auto lg:text-base xl:text-xl w-10/12 md:w-1/3 text-primaryBlue bg-white p-6 rounded-3xl italic`}
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
              <Link to="#" className="font-bold text-primaryRed">
                Inscrivez-vous ici !
              </Link>{' '}
            </p>
          </>
        ) : isPatientLoginPageFormSection || isTherapistLoginPageFormSection ? (
          <form
            action="#"
            onSubmit={
              isPatientLoginPageFormSection
                ? checkPatientCredentials
                : isTherapistLoginPageFormSection
                  ? checkTherapistCredentials
                  : undefined
            }
          >
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
              Connexion{' '}
              {isPatientLoginPageFormSection ? 'Patient' : 'Thérapeute'}
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

            {isPatientLoginPageFormSection && (
              <>
                <div className="text-base mb-4 text-center mt-4">
                  <p>
                    Pas encore membre?{' '}
                    <Link to="/" className="text-primaryRed">
                      Inscrivez-vous ici
                    </Link>
                  </p>
                </div>
              </>
            )}
            <div className="flex items-center">
              <CustomButton btnText="Connexion" btnType="submit" normalButton />
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
}
