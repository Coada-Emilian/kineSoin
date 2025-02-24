import { Link } from 'react-router-dom';

import StandardPasswordInput from '../../../generalComponents/StandardInputs/StandardPasswordInput';
import StandardEmailInput from '../../../generalComponents/StandardInputs/StandardEmailInput';

export default function PatientLoginFormSection() {
  return (
    <>
      <StandardEmailInput
        emailInput={{
          inputId: 'patient-login-email_input',
        }}
      />

      <StandardPasswordInput isPatientLoginPagePasswordInput />

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
