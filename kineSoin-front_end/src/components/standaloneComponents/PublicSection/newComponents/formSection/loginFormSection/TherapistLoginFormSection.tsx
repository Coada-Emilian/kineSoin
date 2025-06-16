import { useAuthentificationContext } from '../../../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import DNALoader from '../../../../../../utils/DNALoader';
import { useTherapistLoginMutation } from '../../../../../../utils/functions/public_section/mutations/useTherapistLoginMutation';
import CustomBtn from '../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import StandardEmailInputRefactor from '../../../../generalComponents/standardInputs/newInputs/StandardEmailInputRefactor';
import StandardPasswordInputRefactor from '../../../../generalComponents/standardInputs/newInputs/StandardPasswordInputRefactor';
import mainLogo from '/logos/Main-Logo.png';

export default function TherapistLoginFormSection() {
  const { navigate } = useGlobalContext();

  const { setTherapistProfileToken } = useAuthentificationContext();

  const handleTherapistLogin = useTherapistLoginMutation(
    setTherapistProfileToken,
    navigate
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleTherapistLogin.mutate(formData);
  };

  if (handleTherapistLogin.isPending) {
    return DNALoader();
  }

  return (
    // Render the form section with the corresponding background image and form content
    <section className="md:p-48 xl:p-56 2xl:p-72 bg-therapistConnectionPage bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative">
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Connexion Thérapeute
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {handleTherapistLogin.error && (
            <p className="text-center text-red-600 font-medium mb-2">
              {handleTherapistLogin.error.message}
            </p>
          )}

          <StandardEmailInputRefactor
            emailInput={{
              id: 'therapist-login-email_input',
              name: 'email',
              placeholder: 'Entrez votre adresse e-mail',
              autoComplete: 'current-email',
              labelName: 'E-mail',
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
              id: 'therapist-login-password_input',
              name: 'password',
              labelName: 'Mot de passe',
              placeholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
            }}
          />

          <div className="flex items-center justify-center">
            <CustomBtn
              btn={{
                type: 'basic',
                text: 'Connexion',
                style: 'normal',
              }}
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
