/**
 * AdminLoginPage Component
 *
 * This component represents the login page for the admin section of the application.
 * It allows administrators to log in by providing their email and password.
 *
 * The component uses the following:
 * - **useMutation** from TanStack Query to handle the login process by calling `checkAdminCredentials` function.
 * - **useGlobalContext** and **useAuthentificationContext** to manage global navigation and authentication states.
 * - A form with input fields for the admin's email and password, and a custom button to submit the form.
 *
 * **Main Functionality:**
 * - On successful login, the admin is redirected to the '/admin/therapists' page.
 * - The login form is submitted via the `onSubmit` handler, which extracts email and password values, and triggers the mutation to authenticate the admin.
 * - A loading state is displayed (using the `DNALoader` component) while the login request is pending.
 * - If the login attempt fails, an error message is shown to the user.
 *
 * **Detailed Flow:**
 * 1. When the form is submitted, the entered email and password are sent to the `checkAdminCredentials` function via the `handleAdminLogin` mutation.
 * 2. If the login is successful, the admin's profile token (`adminProfileToken`) is set in the `AuthentificationContext`.
 * 3. The `useEffect` hook listens for changes to `adminProfileToken`. Once it is set, the user is redirected to the `/admin/therapists` page.
 * 4. If the login is in progress, a loader is displayed. If an error occurs, the error message is shown on the page.
 *
 * **UI/UX Notes:**
 * - The form is styled using Tailwind CSS, ensuring responsiveness across devices.
 * - The page layout is centered, with a gradient background and a clean form container.
 * - The logo is clickable and links to the home page.
 *
 * **Context and State Management:**
 * - **useGlobalContext:** Used to manage navigation and redirection after successful login.
 * - **useAuthentificationContext:** Used to store and manage the admin profile token.
 *
 * **Key Dependencies:**
 * - `useMutation` from `@tanstack/react-query` for handling the login mutation.
 * - `StandardEmailInputRefactor` and `StandardPasswordInputRefactor` for the email and password input fields.
 * - `CustomBtn` for the login button.
 * - `DNALoader` for displaying the loading state.
 *
 * @component
 */

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DNALoader from '../../../utils/DNALoader.tsx';
import logo from '/logos/Main-Logo.png';
import { checkAdminCredentials } from '../../../utils/pageUtils/AdminSection/AdminLoginPageUtils/authentificationUtil.ts';
import { useGlobalContext } from '../../../utils/contexts/GlobalContext.tsx';
import { useAuthentificationContext } from '../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext.tsx';
import CustomBtn from '../../standaloneComponents/generalComponents/CustomButton/CustomButtonRefactor.tsx';
import StandardEmailInputRefactor from '../../standaloneComponents/generalComponents/StandardInputs/new_inputs/StandardEmailInputRefactor.tsx';
import StandardPasswordInputRefactor from '../../standaloneComponents/generalComponents/StandardInputs/new_inputs/StandardPasswordInputRefactor.tsx';
import { useMutation } from '@tanstack/react-query';

export default function AdminLoginPage() {
  // Destructure the necessary variables from the global context
  const { navigate } = useGlobalContext();

  // Destructure the necessary variables from the authentification context
  const { adminProfileToken, setAdminProfileToken } =
    useAuthentificationContext();

  // Create a mutation to handle the admin login
  const handleAdminLogin = useMutation({
    mutationKey: ['adminLogin'],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      checkAdminCredentials(email, password),
    onSuccess: (data) => {
      setAdminProfileToken(data);
    },
  });

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const adminEmail = formData.get('email') as string;
            const adminPassword = formData.get('password') as string;

            handleAdminLogin.mutate({
              email: adminEmail,
              password: adminPassword,
            });
          }}
          className="space-y-4"
        >
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
