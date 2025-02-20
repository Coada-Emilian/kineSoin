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
