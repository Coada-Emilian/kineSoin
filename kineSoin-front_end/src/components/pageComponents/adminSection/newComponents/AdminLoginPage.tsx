/**
 * AdminLoginPage.tsx
 *
 * This component renders the login page for administrators.
 *
 * Features:
 * - Displays a login form with custom email and password input components
 * - Submits login credentials via a mutation hook (useAdminLoginMutation)
 * - Redirects authenticated admins to the admin therapist list page
 * - Shows a loading animation during login process
 * - Displays an error message on failed login attempts
 *
 * Contexts:
 * - GlobalContext: provides navigation (navigate)
 * - AuthentificationContext: manages admin authentication state and token
 *
 * UI Components:
 * - CustomBtn: styled submit button
 * - StandardEmailInputRefactor / StandardPasswordInputRefactor: form fields
 *
 * Utilities:
 * - DNALoader: loading animation
 */

import { Link } from 'react-router-dom';
import DNALoader from '../../../../utils/DNALoader.tsx';
import { useGlobalContext } from '../../../../utils/contexts/GlobalContext.tsx';
import { useAuthentificationContext } from '../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext.tsx';
import { useAdminLoginMutation } from '../../../../utils/functions/publicSection/mutations/useAdminLoginMutation.ts';
import CustomBtn from '../../../standaloneComponents/generalComponents/customButton/newComponents/CustomButtonRefactor.tsx';
import StandardEmailInputRefactor from '../../../standaloneComponents/generalComponents/standardInputs/newInputs/StandardEmailInputRefactor.tsx';
import StandardPasswordInputRefactor from '../../../standaloneComponents/generalComponents/standardInputs/newInputs/StandardPasswordInputRefactor.tsx';
import logo from '/logos/Main-Logo.png';

export default function AdminLoginPage() {
  // Destructure the necessary variables from the global context
  const { navigate } = useGlobalContext();

  // Destructure the necessary variables from the authentification context
  const { adminProfileToken, setAdminProfileToken, isAdminAuthenticated } =
    useAuthentificationContext();

  // Create a mutation to handle the admin login
  const handleAdminLogin = useAdminLoginMutation(setAdminProfileToken);

  // Handle form submission and call the mutation with form data
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleAdminLogin.mutate(formData);
  };

  // // // Ensure navigation happens only when adminProfileToken is set
  // useEffect(() => {
  //   if (isAdminAuthenticated && adminProfileToken) {
  //     navigate('/admin/therapists');
  //   }
  // }, [isAdminAuthenticated]);

  // If the admin login is pending, display the loader
  if (handleAdminLogin.isPending) {
    return DNALoader();
  }

  return (
    <main className="min-h-screen w-11/12 mx-auto md:w-full flex items-center justify-center bg-gradient-to-r from-white to-gray-200">
      <section className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <h1 className="mb-6 text-center text-2xl font-semibold italic text-primaryBlue">
            Connexion Administrateur
          </h1>

          <Link to="/">
            <img
              src={logo}
              alt="kinesoin"
              className="mx-auto mb-6 w-14 md:w-16 xl:w-20 2xl:w-24"
            />
          </Link>

          {handleAdminLogin.error && (
            <p className="text-center font-semibold text-red-600">
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
