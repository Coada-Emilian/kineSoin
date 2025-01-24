// Purpose: Provide the PatientSection component which displays the patient's profile details.

import { IPatient } from '../../../../../../@types/IPatient';
import PatientOutput from '../generalComponents/patient/PacientOutput';

interface PatientSectionProps {
  patient: IPatient;
}
export default function PatientSection({ patient }: PatientSectionProps) {
  return (
    <>
      <PatientOutput patient={patient} isAgeGenderOutput />

      <PatientOutput patient={patient} isAddressOutput />

      <PatientOutput patient={patient} isPhoneNumberOutput />

      <PatientOutput patient={patient} isTherapistOutput />
    </>
  );
}
