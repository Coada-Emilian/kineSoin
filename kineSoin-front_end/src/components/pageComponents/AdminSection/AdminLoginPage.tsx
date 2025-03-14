import { FormEvent, useEffect } from 'react';
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
  const { navigate } = useGlobalContext();

  const { adminProfileToken, setAdminProfileToken } =
    useAuthentificationContext();

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
            // setLoading(true);
            // checkAdminCredentials(e).finally(() => setLoading(false));
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
              inputId: 'admin-login-email_input',
              inputName: 'email',
              inputPlaceholder: 'Entrez votre adresse e-mail',
              autoComplete: 'current-email',
            }}
          />

          <StandardPasswordInputRefactor
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
                type: 'basicBtn',
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
