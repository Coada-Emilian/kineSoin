import { Link, useNavigate } from 'react-router-dom';
import { useAuthentificationContext } from '../../../../utils/contexts/AuthentificationContext/useAuthentificationContext';
import { usePatientLoginMutation } from '../../../../utils/hooks/public/usePatientLoginMutation';
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
    <section className="bg-[url('/images/patientConnexionPage_mainAlt.webp')] md:p-48 xl:p-56 2xl:p-72 bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative">
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-white/95 backdrop-blur-sm shadow-xl p-8 rounded-xl italic">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Connexion Patient
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {handlePatientLogin.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
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

          <div className="text-xs mb-4 text-center mt-4">
            <p>
              Pas encore membre?{' '}
              <Link to="/registerPatient" className="text-primaryRed">
                Inscrivez-vous ici !
              </Link>
            </p>
          </div>

          <div className="flex justify-center mt-6">
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
