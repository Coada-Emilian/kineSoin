import { Link } from 'react-router-dom';

import StandardEmailInput from '../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../../generalComponents/StandardInputs/StandardPasswordInput';

export default function PatientLoginFormSection() {
  return (
    <>
      <StandardEmailInput
        emailInput={{
          inputId: 'patient-login-email_input',
        }}
      />

      <StandardPasswordInput
        passwordInput={{
          inputId: 'patient-login-password_input',
          inputName: 'password',
          inputPlaceholder: 'Entrez votre mot de passe',
          labelContent: 'Mot de passe',
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
    </>
  );
}
