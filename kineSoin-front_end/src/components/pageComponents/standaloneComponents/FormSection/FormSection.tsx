import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import CustomButton from '../../../standaloneComponents/Button/CustomButton';
import { useState } from 'react';
import StandardPasswordInput from '../StandardInputs/StandardPasswordInput';
import StandardEmailInput from '../StandardInputs/StandardEmailInput';

interface FormSectionProps {
  isHomePageFormSection?: boolean;
  isPatientLoginPageFormSection?: boolean;
}
export default function FormSection({
  isHomePageFormSection,
  isPatientLoginPageFormSection,
}: FormSectionProps) {
  const [patientLoginPassword, setPatientLoginPassword] = useState('');
  const [patientLoginEmail, setPatientLoginEmail] = useState('');
  return (
    <section
      className={`${isHomePageFormSection ? 'bg-homePage' : isPatientLoginPageFormSection ? 'bg-patientConnectionPage' : ''} bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-screen md:relative`}
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
              Inscrivez-vous{' '}
              <Link to="#" className="font-bold">
                ici
              </Link>{' '}
              !
            </p>
          </>
        ) : isPatientLoginPageFormSection ? (
          <form action="#">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-2">
              Connexion patient
            </h2>
            <img src={mainLogo} alt="kinesoin" className="w-14 mx-auto mb-4" />

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
            <div className="flex items-center">
              <CustomButton btnText="Connexion" btnType="submit" normalButton />
            </div>
          </form>
        ) : null}
      </div>
    </section>
  );
}
