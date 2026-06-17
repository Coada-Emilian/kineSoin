import { Link, useNavigate } from 'react-router-dom';
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
    <section className="min-h-screen flex items-center justify-center bg-[url('/images/therapistConnexionPage_main.webp')] bg-cover bg-center bg-no-repeat px-4">
      <div className="w-full max-w-md bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <Link to="/" className="flex justify-center">
            <img src={mainLogo} alt="Kinesoin" className="w-16 md:w-20" />
          </Link>

          <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic">
            Connexion Thérapeute
          </h2>

          <p className="text-center text-sm text-gray-500">
            Accédez à votre espace professionnel
          </p>

          {handleTherapistLogin.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-center text-red-600 text-sm">
                {handleTherapistLogin.error.message}
              </p>
            </div>
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

          <div className="flex justify-center mt-2">
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
