import { Link, useNavigate } from 'react-router-dom';
import { useAuthentificationContext } from '../../../../hooks/context/useAuthentificationContext';
import { usePatientLoginMutation } from '../../../../hooks/public/usePatientLoginMutation';
import CustomButton from '../../../ui/buttons/CustomButton';
import DNALoader from '../../../ui/DNALoader';
import EmailInput from '../../../ui/inputs/EmailInput';
import PasswordInput from '../../../ui/inputs/PasswordInput';
import mainLogo from '/logos/new-logo.webp';

export default function PatientLoginFormSection() {
  const navigate = useNavigate();

  const { setPatientProfileToken } = useAuthentificationContext();

  const handlePatientLogin = usePatientLoginMutation(
    setPatientProfileToken,
    navigate
  );

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handlePatientLogin.mutate(formData);
  };

  if (handlePatientLogin.isPending) {
    return DNALoader();
  }

  return (
    <section className="relative flex items-center justify-center bg-[url('/images/patientConnexionPage_mainAlt.webp')] bg-cover bg-center bg-no-repeat py-24 px-4 md:p-32 md:px-16 md:w-full md:h-fit mb-6 rounded-bl-[75px] shadow-2xl">
      <div className="w-full max-w-md bg-white/85 backdrop-blur-sm rounded-3xl shadow-xl p-8 md:p-10">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <Link to="/" className="flex justify-center">
            <img src={mainLogo} alt="Kinesoin" className="w-16 md:w-20" />
          </Link>

          <h2 className="text-xl md:text-2xl font-semibold text-center text-primaryBlue italic">
            Connexion Patient
          </h2>

          <p className="text-center text-sm text-gray-500">
            Accédez à votre espace patient
          </p>

          {handlePatientLogin.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-center text-red-600 text-sm">
                {handlePatientLogin.error.message}
              </p>
            </div>
          )}

          <EmailInput
            input={{
              id: 'patient-login-email_input',
              placeholder: 'Entrez votre adresse e-mail',
              name: 'email',
              autoComplete: 'current-email',
              labelName: 'E-mail',
            }}
          />

          <PasswordInput
            input={{
              id: 'patient-login-password_input',
              name: 'password',
              labelName: 'Mot de passe',
              placeholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
            }}
          />

          <div className="text-xs md:text-sm text-center text-gray-600">
            Pas encore membre ?{' '}
            <Link
              to="/registerPatient"
              className="text-primaryRed font-medium hover:underline"
            >
              Inscrivez-vous ici !
            </Link>
          </div>

          <div className="flex justify-center mt-2">
            <CustomButton
              btn={{
                type: 'basic',
                text: 'Connexion',
                style: 'normal',
              }}
              type="submit"
            />
          </div>
        </form>
      </div>
    </section>
  );
}
