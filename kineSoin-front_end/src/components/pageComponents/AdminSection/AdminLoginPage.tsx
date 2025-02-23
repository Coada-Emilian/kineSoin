import CustomButton from '../../standaloneComponents/generalComponents/CustomButton/CustomButton.tsx';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DNALoader from '../../../utils/DNALoader.tsx';
import logo from '/logos/Main-Logo.png';
import StandardEmailInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardEmailInput.tsx';
import StandardPasswordInput from '../../standaloneComponents/generalComponents/StandardInputs/StandardPasswordInput.tsx';
import { checkAdminCredentials } from './utils/authentificationUtil.ts';

interface AdminLoginPageProps {
  setAdminProfileToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function AdminLoginPage({
  setAdminProfileToken,
}: AdminLoginPageProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
        <form
          onSubmit={(e) =>
            checkAdminCredentials(e, {
              setAdminProfileToken,
              setErrorMessage,
              setIsLoading,
              navigate,
            })
          }
          className="space-y-4"
        >
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
