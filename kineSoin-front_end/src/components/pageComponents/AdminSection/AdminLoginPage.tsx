import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DNALoader from '../../../utils/DNALoader.tsx';
import logo from '/logos/Main-Logo.png';
import { checkAdminCredentials } from '../../../utils/pageUtils/AdminSection/AdminLoginPageUtils/authentificationUtil.ts';
import StandardEmailInput from '../../standaloneComponents/generalComponents/StandardInputs/new_inputs/StandardEmailInput.tsx';
import StandardPasswordInput from '../../standaloneComponents/generalComponents/StandardInputs/new_inputs/StandardPasswordInput.tsx';
import { useGlobalContext } from '../../../utils/contexts/GlobalContext.tsx';
import { useAuthentificationContext } from '../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext.tsx';
import CustomBtn from '../../standaloneComponents/generalComponents/CustomButton/CustomButtonRefactor.tsx';

export default function AdminLoginPage() {
  const { errorMessage, setError, isLoading, setLoading, navigate } =
    useGlobalContext();

  const { adminProfileToken, setAdminProfileToken } =
    useAuthentificationContext();

  // // Ensure navigation happens only when adminProfileToken is set
  useEffect(() => {
    if (adminProfileToken && adminProfileToken !== null) {
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
            setLoading(true);
            checkAdminCredentials(e, {
              setAdminProfileToken,
              setError,
            }).finally(() => setLoading(false));
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
              labelName: 'Mot de passe',
            }}
          />

          <div className="flex justify-center">
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
      </section>
    </main>
  );
}
