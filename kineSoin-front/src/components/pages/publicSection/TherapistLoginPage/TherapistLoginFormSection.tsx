import { useNavigate } from 'react-router-dom';
import { useAuthentificationContext } from '../../../../utils/contexts/AuthentificationContext/useAuthentificationContext';
import { useTherapistLoginMutation } from '../../../../utils/hooks/public/useTherapistLoginMutation';
import CustomButton from '../../../ui/buttons/CustomButton';
import DNALoader from '../../../ui/DNALoader';
import EmailInput from '../../../ui/inputs/EmailInput';
import PasswordInput from '../../../ui/inputs/PasswordInput';
import mainLogo from '/logos/new-logo.webp';

export default function TherapistLoginFormSection() {
  const navigate = useNavigate();

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
    <section className="bg-[url('/images/therapistConnexionPage_main.webp')] md:p-48 xl:p-56 2xl:p-72 bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative">
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-xl italic">
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

          <EmailInput
            input={{
              id: 'therapist-login-email_input',
              placeholder: 'Entrez votre adresse e-mail',
              name: 'email',
              autoComplete: 'current-email',
              labelName: 'E-mail',
            }}
          />

          <PasswordInput
            input={{
              id: 'therapist-login-password_input',
              name: 'password',
              labelName: 'Mot de passe',
              placeholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
            }}
          />

          <div className="flex items-center justify-center">
            <CustomButton
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
