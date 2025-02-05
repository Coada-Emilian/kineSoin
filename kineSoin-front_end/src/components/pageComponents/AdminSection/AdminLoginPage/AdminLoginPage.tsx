// Purpose: The purpose of this component is to render the login page for the admin.

import CustomButton from '../../../standaloneComponents/Button/CustomButton.tsx';
import { setAdminTokenAndDataInLocalStorage } from '../../../../localStorage/adminLocalStorage.ts';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleAdminLogin } from '../../../../utils/apiUtils.ts';
import DNALoader from '../../../../utils/DNALoader.tsx';
import logo from '/logos/Main-Logo.png';
import StandardEmailInput from '../../standaloneComponents/StandardInputs/StandardEmailInput.tsx';
import StandardPasswordInput from '../../standaloneComponents/StandardInputs/StandardPasswordInput.tsx';

interface AdminLoginPageProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AdminLoginPage({
  setAdminProfileToken,
}: AdminLoginPageProps) {
  // Error message state
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Function to check admin credentials
  const checkAdminCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsLoading(true);

      // Check for empty email or password
      if (!adminEmail || !adminPassword) {
        setErrorMessage('Email et/ou Mot de passe invalide');
        return;
      }

      // Send credentials to login function
      const response = await handleAdminLogin(adminEmail, adminPassword);

      // Store token and data in local storage
      setAdminTokenAndDataInLocalStorage(
        response.token,
        response.name,
        response.id
      );
      setAdminProfileToken(response.token);

      // Navigate to therapists page
      navigate('/admin/therapists');
    } catch (error) {
      // Handle error - 401 Unauthorized or other errors
      if (error instanceof AxiosError && error.response?.status === 401) {
        setErrorMessage('Email et/ou Mot de passe invalide');
      } else {
        setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      }
      console.error(error);
    } finally {
      // Ensure loading state is reset
      setIsLoading(false);
    }
  };

  const [adminEmail, setAdminEmail] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');

  if (isLoading) {
    return DNALoader();
  }

  return (
    <main className="flex items-center justify-center min-h-screen w-11/12 mx-auto md:w-full bg-gray-100">
      <section className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-center mb-6 text-primaryBlue">
          Connexion administrateur
        </h1>
        <img
          src={logo}
          alt="kinesoin"
          className="w-14 md:w-16 xl:w-20 2xl:w-24 mx-auto mb-6"
        />

        {errorMessage ? (
          <p className="text-center text-red-600 font-semibold">
            {errorMessage}
          </p>
        ) : null}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await checkAdminCredentials(e);
          }}
          className="space-y-4"
        >
          <StandardEmailInput
            isAdminEmailInput
            setAdminEmail={setAdminEmail}
            adminEmail={adminEmail}
          />

          <StandardPasswordInput
            isAdminPasswordInput
            adminPassword={adminPassword}
            setAdminPassword={setAdminPassword}
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
