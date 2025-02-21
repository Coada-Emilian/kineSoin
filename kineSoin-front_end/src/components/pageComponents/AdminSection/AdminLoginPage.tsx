/*
 * This file contains the AdminLoginPage component, which handles the login process for administrators.
 * It imports necessary components and utilities, manages form state and validation,
 * and handles the submission of login credentials to the server. It also displays a loading state
 * and any error messages that may occur during the login process.
 *
 * Imported components and utilities:
 * - CustomButton: A customizable button component.
 * - setAdminTokenAndDataInLocalStorage: A utility function to store admin data in local storage.
 * - useState: React hook to manage component state.
 * - Link, useNavigate: React Router components for navigation.
 * - DNALoader: A component to display a loading animation.
 * - logo: Path to the main logo image.
 * - StandardEmailInput, StandardPasswordInput: Input components for email and password fields.
 * - handleAdminLogin: A function to handle the admin login API call.
 *
 * Interface:
 * - AdminLoginPageProps: Props interface for the AdminLoginPage component.
 *
 * AdminLoginPage Component:
 * - Manages form state (errorMessage, isLoading).
 * - Handles form submission with checkAdminCredentials function.
 * - Validates form data and calls handleAdminLogin API.
 * - Sets admin data in local storage and updates state.
 * - Displays loading animation and error messages.
 */

import CustomButton from '../../standaloneComponents/generalComponents/CustomButton/CustomButton.tsx';
import { setAdminTokenAndDataInLocalStorage } from '../../../localStorage/adminLocalStorage.ts';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DNALoader from '../../../utils/DNALoader.tsx';
import logo from '/logos/Main-Logo.png';
import StandardEmailInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardEmailInput.tsx';
import StandardPasswordInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardPasswordInput.tsx';
import { handleAdminLogin } from '../../../utils/apiUtils/publicApiUtils.tsx';

interface AdminLoginPageProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AdminLoginPage({
  setAdminProfileToken,
}: AdminLoginPageProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkAdminCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const adminEmail = formData.get('email') as string;
      const adminPassword = formData.get('password') as string;

      if (!adminEmail || !adminPassword) {
        setIsLoading(false);
        setErrorMessage('Veuillez remplir tous les champs');
        return;
      } else if (!adminEmail.includes('@')) {
        setIsLoading(false);
        setErrorMessage('Veuillez entrer une adresse email valide');
        return;
      }

      const response = await handleAdminLogin(adminEmail, adminPassword);
      if (response) {
        setAdminTokenAndDataInLocalStorage(
          response.token,
          response.name,
          response.id
        );
        setAdminProfileToken(response.token);
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
      navigate('/admin/therapists');
    } catch (error) {
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
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
        <form onSubmit={checkAdminCredentials} className="space-y-4">
          <StandardEmailInput isAdminEmailInput />

          <StandardPasswordInput isAdminPasswordInput />
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
