import { checkTherapistCredentials } from '../../../../../../utils/componentUtils/pageComponents/functions/publicSection/loginPage/authentificationUtils';
import { useAuthentificationContext } from '../../../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import DNALoader from '../../../../../../utils/DNALoader';
import CustomBtn from '../../../../generalComponents/CustomButton/CustomButtonRefactor';
import StandardEmailInput from '../../../../generalComponents/StandardInputs/new_inputs/StandardEmailInput';
import StandardPasswordInput from '../../../../generalComponents/StandardInputs/new_inputs/StandardPasswordInput';
import mainLogo from '/logos/Main-Logo.png';
import { useEffect } from 'react';

export default function TherapistLoginFormSection() {
  const { errorMessage, setError, isLoading, setLoading, location, navigate } =
    useGlobalContext();

  const { setTherapistProfileToken } = useAuthentificationContext();

  useEffect(() => {
    setError('');
  }, [location.pathname]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    // Render the form section with the corresponding background image and form content
    <section className="md:p-48 xl:p-56 2xl:p-72 bg-therapistConnectionPage bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative">
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <form
          onSubmit={(e) => {
            setLoading(true);
            checkTherapistCredentials(e, {
              setError,
              setTherapistProfileToken,
              navigate,
            }).finally(() => setLoading(false));
          }}
        >
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Connexion Thérapeute
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {errorMessage && (
            <p className="text-center text-red-600 font-medium mb-2">
              {errorMessage}
            </p>
          )}

          <StandardEmailInput
            emailInput={{
              inputId: 'therapist-login-email_input',
              inputName: 'email',
              inputPlaceholder: 'Entrez votre adresse e-mail',
              autoComplete: 'current-email',
            }}
          />

          <StandardPasswordInput
            passwordInput={{
              inputId: 'therapist-login-password_input',
              inputName: 'password',
              labelName: 'Mot de passe',
              inputPlaceholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
            }}
          />

          <div className="flex items-center">
            <CustomBtn
              btn={{
                btnType: 'basicBtn',
                btnText: 'Connexion',
                isNormalBtn: true,
                isFormBtn: true,
              }}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
