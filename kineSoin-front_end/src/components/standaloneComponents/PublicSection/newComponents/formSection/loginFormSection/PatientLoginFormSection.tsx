import { Link } from 'react-router-dom';
import { useAuthentificationContext } from '../../../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import DNALoader from '../../../../../../utils/DNALoader';
import { usePatientLoginMutation } from '../../../../../../utils/functions/public_section/mutations/usePatientLoginMutation';
import CustomBtn from '../../../../generalComponents/customButton/newComponents/CustomButtonRefactor';
import StandardEmailInputRefactor from '../../../../generalComponents/standardInputs/newInputs/StandardEmailInputRefactor';
import StandardPasswordInputRefactor from '../../../../generalComponents/standardInputs/newInputs/StandardPasswordInputRefactor';
import mainLogo from '/logos/Main-Logo.png';

export default function PatientLoginFormSection() {
  const { navigate } = useGlobalContext();

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
    // Render the form section with the corresponding background image and form content
    <section className="md:p-48 xl:p-56 2xl:p-72 bg-patientConnectionPage bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative">
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Connexion Patient
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {handlePatientLogin.error && (
            <p className="text-center text-red-600 font-medium mb-2">
              {handlePatientLogin.error.message}
            </p>
          )}

          <StandardEmailInputRefactor
            emailInput={{
              id: 'patient-login-email_input',
              placeholder: 'Entrez votre adresse e-mail',
              name: 'email',
              autoComplete: 'current-email',
              labelName: 'E-mail',
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
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

          <div className="flex items-center justify-center">
            <CustomBtn
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
