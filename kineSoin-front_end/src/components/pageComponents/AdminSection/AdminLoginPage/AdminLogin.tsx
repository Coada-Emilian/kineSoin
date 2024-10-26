/**
 * @fileoverview This component renders the admin login form. It allows
 * administrators to enter their email and password to log in to the admin
 * panel. On successful login, the admin token and data are stored in
 * local storage, and the user is redirected to the therapists page.
 *
 * @module AdminLogin
 *
 * @requires ../../../standaloneComponents/Button/CustomButton.tsx
 * @requires ../../../../axios.ts
 * @requires ../../../../localStorage/adminLocalStorage.ts
 * @requires react
 * @requires axios
 * @requires react-router-dom
 *
 * @typedef {Object} AdminLoginProps
 * @property {React.Dispatch<React.SetStateAction<string | null>>} setAdminProfileToken -
 * A function to update the admin profile token state.
 *
 * @param {AdminLoginProps} props - The props for the component.
 *
 * @returns {JSX.Element} The rendered admin login form.
 *
 * @example
 * // Using the AdminLogin component
 * import AdminLogin from './AdminLogin';
 *
 * const App = () => {
 *   const [adminProfileToken, setAdminProfileToken] = useState<string | null>(null);
 *   return <AdminLogin setAdminProfileToken={setAdminProfileToken} />;
 * };
 */

import CustomButton from '../../../standaloneComponents/Button/CustomButton.tsx';
import axios from '../../../../axios.ts';
import { setAdminTokenAndDataInLocalStorage } from '../../../../localStorage/adminLocalStorage.ts';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface AdminLoginProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AdminLogin({ setAdminProfileToken }: AdminLoginProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkCredentials = async (email: string, password: string) => {
    try {
      setIsError(false);

      const response = await axios.post('/admin/login', {
        email,
        password,
      });

      setAdminTokenAndDataInLocalStorage(
        response.data.token,
        response.data.name,
        response.data.id
      );

      setAdminProfileToken(response.data.token);

      navigate('/admin/therapists');
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
              Adresse email
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
