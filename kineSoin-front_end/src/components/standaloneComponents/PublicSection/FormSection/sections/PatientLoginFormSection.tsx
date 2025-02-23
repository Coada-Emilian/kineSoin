import { Link } from 'react-router-dom';
import StandardEmailInput from '../../../generalComponents/StandardInputs/StandardEmailInput';
import StandardPasswordInput from '../../../generalComponents/StandardInputs/StandardPasswordInput';

export default function PatientLoginFormSection() {
  return (
    <>
      <StandardEmailInput isPatientLoginPageEmailInput />

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
