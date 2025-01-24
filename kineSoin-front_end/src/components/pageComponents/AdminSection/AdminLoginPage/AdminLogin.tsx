// Purpose: The purpose of this component is to render the login page for the admin.

import CustomButton from '../../../standaloneComponents/Button/CustomButton.tsx';
import { setAdminTokenAndDataInLocalStorage } from '../../../../localStorage/adminLocalStorage.ts';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleAdminLogin } from '../../../../utils/apiUtils.ts';
import DNALoader from '../../../../utils/DNALoader.tsx';

interface AdminLoginProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AdminLogin({ setAdminProfileToken }: AdminLoginProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkCredentials = async (email: string, password: string) => {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await handleAdminLogin(email, password);

      setAdminTokenAndDataInLocalStorage(
        response.token,
        response.name,
        response.id
      );

      setAdminProfileToken(response.token);

      navigate('/admin/therapists');
      setIsLoading(false);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        setIsError(true);
        console.error(error);
      } else {
        console.error(error);
        setIsError(true);
      }
    }
  };

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="flex items-center justify-center min-h-screen w-11/12 mx-auto md:w-full bg-gray-100">
      <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6 text-primaryBlue">
          Connexion administrateur
        </h1>

        {isError ? (
          <p className="text-center text-red-600 font-semibold">
            Email et/ou Mot de passe invalide
          </p>
        ) : null}
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;
            await checkCredentials(email, password);
          }}
          className="space-y-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-primaryBlue"
            >
              Adresse e-mail
            </label>

            <input
              type="email"
              placeholder="E-mail"
              name="email"
              id="admin-email_input"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primaryTeal  p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-primaryBlue"
            >
              Mot de passe
            </label>

            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              id="admin-password_input"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primaryTeal  p-2"
              required
            />
          </div>

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
