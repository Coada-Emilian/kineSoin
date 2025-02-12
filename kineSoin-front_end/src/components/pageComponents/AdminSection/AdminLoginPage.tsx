import CustomButton from '../../standaloneComponents/generalComponents/CustomButton/CustomButton.tsx';
import { setAdminTokenAndDataInLocalStorage } from '../../../localStorage/adminLocalStorage.ts';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { handleAdminLogin } from '../../../utils/apiUtils.ts';
import DNALoader from '../../../utils/DNALoader.tsx';
import logo from '/logos/Main-Logo.png';
import StandardEmailInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardEmailInput.tsx';
import StandardPasswordInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardPasswordInput.tsx';

interface AdminLoginPageProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Email et/ou Mot de passe invalide',
  GENERAL_ERROR: 'Une erreur est survenue. Veuillez réessayer.',
};

export default function AdminLoginPage({
  setAdminProfileToken,
}: AdminLoginPageProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const validateForm = (email: string, password: string) => {
    if (!email || !password || !email.includes('@')) {
      setErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
      return false;
    }
    return true;
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError && error.response?.status === 401) {
      setErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
    } else {
      setErrorMessage(ERROR_MESSAGES.GENERAL_ERROR);
    }
    console.error(error);
  };

  const checkAdminCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const adminEmail = formData.get('email') as string;
      const adminPassword = formData.get('password') as string;

      if (!validateForm(adminEmail, adminPassword)) {
        setIsLoading(false);
        return;
      }

      const response = await handleAdminLogin(adminEmail, adminPassword);
      setAdminTokenAndDataInLocalStorage(
        response.token,
        response.name,
        response.id
      );
      setAdminProfileToken(response.token);
      navigate('/admin/therapists');
    } catch (error) {
      handleError(error);
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
        <Link to="/public/home">
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
