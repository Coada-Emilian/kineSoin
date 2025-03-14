import { Link } from 'react-router-dom';
import mainLogo from '/logos/Main-Logo.png';
import { useGlobalContext } from '../../../../../../utils/contexts/GlobalContext';
import DNALoader from '../../../../../../utils/DNALoader';
import { checkPatientCredentials } from '../../../../../../utils/componentUtils/pageComponents/functions/publicSection/loginPage/authentificationUtils';
import CustomBtn from '../../../../generalComponents/CustomButton/CustomButtonRefactor';
import { useAuthentificationContext } from '../../../../../../utils/contexts/authentificationContexts/AuthentificationGlobalContext';
import StandardEmailInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardEmailInputRefactor';
import StandardPasswordInputRefactor from '../../../../generalComponents/StandardInputs/new_inputs/StandardPasswordInputRefactor';

export default function PatientLoginFormSection() {
  const { errorMessage, setError, isLoading, setLoading, navigate } =
    useGlobalContext();

  const { setPatientProfileToken } = useAuthentificationContext();

  if (isLoading) {
    return DNALoader();
  }

  return (
    // Render the form section with the corresponding background image and form content
    <section className="md:p-48 xl:p-56 2xl:p-72 bg-patientConnectionPage bg-cover py-24 px-4 bg-no-repeat bg-center content-center justify-center mb-6 rounded-bl-[75px] gap-12 flex md:items-center md:px-16 md:w-full md:h-fit md:relative">
      <div className="opacity-90 max-w-80 font-normal text-sm h-fit my-auto lg:text-base w-10/12 md:w-2/3 text-primaryBlue bg-gradient-to-r from-white to-gray-200 p-6 rounded-3xl italic">
        <form
          onSubmit={(e) => {
            setLoading(true);
            checkPatientCredentials(e, {
              setError,
              setPatientProfileToken,
              navigate,
            }).finally(() => setLoading(false));
          }}
        >
          <h2 className="text-xl font-semibold text-center text-primaryBlue mb-2">
            Connexion Patient
          </h2>

          <img src={mainLogo} alt="Kinesoin" className="w-14 mx-auto mb-4" />

          {errorMessage && (
            <p className="text-center text-red-600 font-medium mb-2">
              {errorMessage}
            </p>
          )}

          <StandardEmailInputRefactor
            emailInput={{
              id: 'patient-login-email_input',
              placeholder: 'Entrez votre adresse e-mail',
              name: 'email',
              autoComplete: 'current-email',
            }}
          />

          <StandardPasswordInputRefactor
            passwordInput={{
              inputId: 'patient-login-password_input',
              inputName: 'password',
              labelName: 'Mot de passe',
              inputPlaceholder: 'Entrez votre mot de passe',
              autoComplete: 'current-password',
            }}
          />

          <div className="text-xs mb-4 text-center mt-4">
            <p>
              Pas encore membre?{' '}
              <Link to="/registerPatient" className="text-primaryRed">
                Inscrivez-vous ici
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center">
            <CustomBtn
              btn={{
                type: 'basicBtn',
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
