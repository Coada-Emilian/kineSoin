import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../generalComponents/CustomButton/CustomButton.tsx';
import { useEffect, useState } from 'react';
import StandardPasswordInput from '../generalComponents/StandardInputs/StandardPasswordInput.tsx';
import StandardEmailInput from '../generalComponents/StandardInputs/StandardEmailInput.tsx';
import {
  handlePatientLogin,
  handlePatientRegistration,
  handleTherapistConnection,
} from '../../../utils/apiUtils';
import StandardTextInput from '../generalComponents/StandardInputs/StandardTextInput.tsx';
import StandardDateInput from '../generalComponents/StandardInputs/StandardDateInput.tsx';
import StandardDropdownInput from '../generalComponents/StandardInputs/StandardDropdownInput.tsx';
import StandardTelephoneInput from '../generalComponents/StandardInputs/StandardTelephoneInput.tsx';
import StandardFileInput from '../generalComponents/StandardInputs/StandardFileInput.tsx';
import { useNavigate } from 'react-router-dom';
import DNALoader from '../../../utils/DNALoader.tsx';

interface PublicMainFormSectionProps {
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
export default function PublicMainFormSection({
  isHomePageFormSection,
  isPatientLoginPageFormSection,
  isTherapistLoginPageFormSection,
  isPatientRegisterPageRendered,
  setIsPatientRegisterPageRendered,
  isFirstFormValidated,
  isSecondFormValidated,
  isThirdFormValidated,
  setPatientProfileToken,
  setTherapistProfileToken,
  setIsFirstFormValidated,
  setIsSecondFormValidated,
  setIsThirdFormValidated,
  setIsGlobalFormSubmitted,
  isGlobalFormSubmitted,
}: PublicMainFormSectionProps) {
  // Patient and therapist error messages states
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Sent patient data state
  const [sentPatientData, setSentPatientData] = useState({});

  // Patient registration forms validation states
  const [registeredPatientGender, setRegisteredPatientGender] = useState('');
  const [registeredPatientBirthDate, setRegisteredPatientBirthDate] =
    useState<string>();
  const [patientImage, setPatientImage] = useState<File | null>(null);

  const navigate = useNavigate();

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Patient login function
  const checkPatientCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage('');
      const formData = new FormData(e.currentTarget);
      const patientLoginEmail = formData.get('email') as string;
      const patientLoginPassword = formData.get('password') as string;

      // Check if the email and password fields are empty
      if (!patientLoginEmail || !patientLoginPassword) {
        setIsLoading(false);
        setErrorMessage('Veuillez remplir tous les champs');
        return;
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          patientLoginEmail as string
        )
      ) {
        setIsLoading(false);
        setErrorMessage('Veuillez entrer une adresse email valide');
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
          setIsLoading(false);
          navigate('/patient/dashboard');
        } else {
          setIsLoading(false);
          setErrorMessage('Email et/ou Mot de passe invalide');
        }
      } else {
        setIsLoading(false);
        setErrorMessage('Email et/ou Mot de passe invalide');
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      console.error(error);
    }
  };

  // Therapist login function
  const checkTherapistCredentials = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMessage('');
      const formData = new FormData(e.currentTarget);
      const therapistLoginEmail = formData.get('email') as string;
      const therapistLoginPassword = formData.get('password') as string;

      // Check if the email and password fields are empty
      if (!therapistLoginEmail || !therapistLoginPassword) {
        setIsLoading(false);
        setErrorMessage('Veuillez remplir tous les champs');
        return;
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          therapistLoginEmail
        )
      ) {
        setIsLoading(false);
        setErrorMessage('Veuillez entrer une adresse email valide');
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
          setIsLoading(false);
          navigate('/therapist/dashboard');
        } else {
          setErrorMessage('Email et/ou Mot de passe invalide');
        }
      } else {
        setErrorMessage('Email et/ou Mot de passe invalide');
      }
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      console.error(error);
    }
  };

  // Patient registration function for the first form
  const handleFirstPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      setErrorMessage('');

      // Retrieve the form data, the current date and year
      const form = e.currentTarget;
      const formData = new FormData(form);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const nameRegex = /^[A-Za-zÀ-ÿ\s'-]+$/;

      // Check if the name, birth name and surname fields are empty
      if (
        !formData.get('name') ||
        !formData.get('birth_name') ||
        !formData.get('surname') ||
        !formData.get('birth-date')
      ) {
        setErrorMessage('Veuillez remplir tous les champs');
        return;
      }
      // Check if the birth date is empty or invalid
      else if (
        registeredPatientBirthDate &&
        registeredPatientBirthDate > currentDate.toISOString().split('T')[0]
      ) {
        setErrorMessage('Veuillez entrer une date valide');
        return;
      } // Check if the patient gender is empty
      else if (registeredPatientGender === '') {
        setErrorMessage('Veuillez sélectionner votre genre');
      } else if (
        registeredPatientBirthDate &&
        registeredPatientBirthDate < '1900-01-01'
      ) {
        setErrorMessage(
          'Veuillez entrer une date de naissance valide (après 1900)'
        );
        return;
      } else if (
        !nameRegex.test(formData.get('name') as string) ||
        !nameRegex.test(formData.get('birth_name') as string) ||
        !nameRegex.test(formData.get('surname') as string)
      ) {
        setErrorMessage(
          'Le nom, le prénom et le nom de naissance ne doivent contenir que des lettres.'
        );
        return;
      }
      // Check if the patient is under 12 years old
      else {
        const age =
          currentYear - Number(registeredPatientBirthDate?.split('-')[0]);
        if (age < 12) {
          setErrorMessage(
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
      setErrorMessage('');
      // Set the sent patient data with the form data
      setSentPatientData(sentData);
      // Set the first form as validated and the second form as not validated
      setIsFirstFormValidated(true);
      if (setIsPatientRegisterPageRendered) {
        setIsPatientRegisterPageRendered(false);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      console.error(error);
    }
  };

  // Patient registration function for the second form
  const handleSecondPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      setErrorMessage('');

      // Retrieve the form data
      const form = e.currentTarget;
      const formData = new FormData(form);

      // Check if the postal code, city, street number, street name and phone number fields are empty
      if (
        !formData.get('postal_code') ||
        !formData.get('city') ||
        !formData.get('street_number') ||
        !formData.get('street_name') ||
        !formData.get('phone_number') ||
        !formData.get('prefix')
      ) {
        setErrorMessage('Veuillez remplir tous les champs');
      } else if (!/^\d{5}$/.test(formData.get('postal_code') as string)) {
        setErrorMessage('Veuillez entrer un code postal valide');
        return;
      } else if (!/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.get('city') as string)) {
        setErrorMessage('Veuillez entrer un nom de ville valide');
        return;
      } else if (!/^\d+$/.test(formData.get('street_number') as string)) {
        setErrorMessage('Veuillez entrer un numéro de rue valide');
        return;
      } else if (
        !/^[A-Za-zÀ-ÿ\s'-]+$/.test(formData.get('street_name') as string)
      ) {
        setErrorMessage('Veuillez entrer un nom de rue valide');
        return;
      } else if (
        !/^\+?\d{1,15}$/.test(formData.get('phone_number') as string)
      ) {
        setErrorMessage(
          "Veuillez entrer un numéro de téléphone valide (+ et jusqu'à 15 chiffres)"
        );
        return;
      } else {
        // Create an object with the form data
        const fullPhoneNumber = `${formData.get('prefix')}${formData.get('phone_number')}`;
        const sentData = {
          street_number: formData.get('street_number'),
          street_name: formData.get('street_name'),
          postal_code: formData.get('postal_code'),
          city: formData.get('city'),
          prefix: formData.get('prefix'),
          phone_number: formData.get('phone_number'),
          full_phone_number: fullPhoneNumber,
        };

        // Set the patient error message to an empty string
        setErrorMessage('');
        // Set the sent patient data with the form data
        setSentPatientData({ ...sentPatientData, ...sentData });
        // Set the second form as validated and the third form as not validated
        setIsFirstFormValidated(false);
        setIsSecondFormValidated(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  // Patient registration function for the third form
  const handleThirdPatientRegisterForm = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      setErrorMessage('');

      const form = e.currentTarget;
      const formData = new FormData(form);

      if (
        !patientImage ||
        !formData.get('email') ||
        !formData.get('password') ||
        !formData.get('confirm-password')
      ) {
        setErrorMessage('Veuillez remplir tous les champs');
        return;
      } else if (
        formData.get('password') !== formData.get('confirm-password')
      ) {
        setErrorMessage('Les mots de passe ne correspondent pas');
        return;
      } else if ((formData.get('password') as string).length < 12) {
        setErrorMessage('Le mot de passe doit contenir au moins 12 caractères');
        return;
      } else if (
        !/\d/.test(formData.get('password') as string) ||
        !/[a-z]/.test(formData.get('password') as string) ||
        !/[A-Z]/.test(formData.get('password') as string)
      ) {
        setErrorMessage(
          'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'
        );
        return;
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(
          formData.get('email') as string
        )
      ) {
        setErrorMessage('Veuillez entrer une adresse email valide');
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
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
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
                  : isPatientRegisterPageRendered
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
                  <Link to="/public/home" className="font-bold text-primaryRed">
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
                      to="/public/loginPatient"
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
