import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DNALoader from '../../../utils/DNALoader.tsx';
import { useGlobalContext } from '../../../utils/contexts/GlobalContext.tsx';
import { useAuthentificationContext } from '../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext.tsx';
import { useAdminLoginMutation } from '../../../utils/functions/public_section/mutations/useAdminLoginMutation.ts';
import CustomBtn from '../../standaloneComponents/generalComponents/CustomButton/CustomButtonRefactor.tsx';
import StandardEmailInputRefactor from '../../standaloneComponents/generalComponents/StandardInputs/new_inputs/StandardEmailInputRefactor.tsx';
import StandardPasswordInputRefactor from '../../standaloneComponents/generalComponents/StandardInputs/new_inputs/StandardPasswordInputRefactor.tsx';
import logo from '/logos/Main-Logo.png';

export default function AdminLoginPage() {
  // Destructure the necessary variables from the global context
  const { navigate } = useGlobalContext();

  // Destructure the necessary variables from the authentification context
  const { adminProfileToken, setAdminProfileToken } =
    useAuthentificationContext();

  // Create a mutation to handle the admin login
  const handleAdminLogin = useAdminLoginMutation(setAdminProfileToken);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleAdminLogin.mutate(formData);
  };

  // // Ensure navigation happens only when adminProfileToken is set
  useEffect(() => {
    if (adminProfileToken && adminProfileToken !== null) {
      navigate('/admin/therapists');
    }
  }, [adminProfileToken]);

  // If the admin login is pending, display the loader
  if (handleAdminLogin.isPending) {
    return DNALoader();
  }

  return (
    <main className="flex items-center justify-center min-h-screen w-11/12 mx-auto md:w-full bg-gradient-to-r from-white to-gray-200 ">
      <section className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h1 className="text-2xl font-semibold text-center mb-6 text-primaryBlue italic">
            Connexion administrateur
          </h1>

          <Link to="/">
            <img
              src={logo}
              alt="kinesoin"
              className="w-14 md:w-16 xl:w-20 2xl:w-24 mx-auto mb-6"
            />
          </Link>

          {handleAdminLogin.error && (
            <p className="text-center text-red-600 font-semibold">
              {handleAdminLogin.error.message}
            </p>
          )}

          <StandardEmailInputRefactor
            emailInput={{
              id: 'admin-login-email_input',
              name: 'email',
              placeholder: 'Entrez votre adresse e-mail',
              autoComplete: 'current-email',
              labelName: 'E-mail',
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
              id: 'admin-login-password_input',
              name: 'password',
              placeholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
              labelName: 'Mot de passe',
            }}
          />

          <div className="flex justify-center">
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
      </section>
    </main>
  );
}
