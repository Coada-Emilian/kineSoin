import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../../standaloneComponents/generalComponents/CustomButton/CustomButton.tsx';
import DNALoader from '../../../utils/DNALoader.tsx';
import logo from '/logos/Main-Logo.png';
import { checkAdminCredentials } from '../../../utils/pageUtils/AdminSection/AdminLoginPageUtils/authentificationUtil.ts';
import StandardEmailInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardEmailInput.tsx';
import StandardPasswordInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardPasswordInput.tsx';

interface AdminLoginPageProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
  adminProfileToken: string | null;
}

export default function AdminLoginPage({
  setAdminProfileToken,
  adminProfileToken,
}: AdminLoginPageProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Ensure navigation happens only when adminProfileToken is set
  useEffect(() => {
    if (adminProfileToken) {
      navigate('/admin/therapists');
    }
  }, [adminProfileToken]);

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="flex items-center justify-center min-h-screen w-11/12 mx-auto md:w-full bg-gradient-to-r from-white to-gray-200 ">
      <section className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm">
        <form
          onSubmit={(e) => {
            setIsLoading(true);
            checkAdminCredentials(e, {
              setAdminProfileToken,
              setErrorMessage,
            }).finally(() => setIsLoading(false));
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

          {errorMessage && (
            <p className="text-center text-red-600 font-semibold">
              {errorMessage}
            </p>
          )}

          <StandardEmailInput
            emailInput={{
              inputId: 'admin-login-email_input',
              inputName: 'email',
              inputPlaceholder: 'Entrez votre adresse e-mail',
              autoComplete: 'current-email',
            }}
          />

          <StandardPasswordInput
            passwordInput={{
              inputId: 'admin-login-password_input',
              inputName: 'password',
              inputPlaceholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
            }}
          />

          <div className="flex justify-center">
            <CustomButton
              btnText="Se connecter"
              normalButton
              btnType="submit"
            />
          </div>
        </form>
      </section>
    </main>
  );
}
