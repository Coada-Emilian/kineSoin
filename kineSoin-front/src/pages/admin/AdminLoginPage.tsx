import { Link } from 'react-router-dom';
import CustomButton from '../../components/ui/buttons/CustomButton';
import DNALoader from '../../components/ui/DNALoader';
import EmailInput from '../../components/ui/inputs/EmailInput';
import PasswordInput from '../../components/ui/inputs/PasswordInput';
import { useAuthentificationContext } from '../../contexts/AuthentificationContext/useAuthentificationContext';
import { useAdminLoginMutation } from '../../utils/hooks/admin/useAdminLoginMutation';
import logo from '/logos/new-logo.webp';

export default function AdminLoginPage() {
  const { setIsAdminAuthenticated, setAdminProfileToken } =
    useAuthentificationContext();

  const handleAdminLogin = useAdminLoginMutation(
    setAdminProfileToken,
    setIsAdminAuthenticated
  );

  const handleFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleAdminLogin.mutate(formData);
  };

  if (handleAdminLogin.isPending) {
    return DNALoader();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-white via-gray-50 to-gray-200 px-4">
      <section className="w-full max-w-md bg-white/85 rounded-3xl shadow-xl p-8 md:p-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <Link to="/" className="flex justify-center">
            <img src={logo} alt="kinesoin" className="w-16 md:w-20 mb-2" />
          </Link>

          <h1 className="text-center text-2xl md:text-3xl font-semibold italic text-primaryBlue">
            Connexion Administrateur
          </h1>

          <p className="text-center text-sm text-gray-500">
            Accédez à votre espace administrateur
          </p>

          {handleAdminLogin.error && (
            <p className="text-center font-medium text-red-600 text-sm">
              {handleAdminLogin.error.message}
            </p>
          )}

          <EmailInput
            input={{
              id: 'admin-login-email_input',
              name: 'email',
              placeholder: 'Entrez votre adresse e-mail',
              autoComplete: 'current-email',
              labelName: 'E-mail',
            }}
          />

          <PasswordInput
            input={{
              id: 'admin-login-password_input',
              name: 'password',
              placeholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
              labelName: 'Mot de passe',
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
      </section>
    </main>
  );
}
