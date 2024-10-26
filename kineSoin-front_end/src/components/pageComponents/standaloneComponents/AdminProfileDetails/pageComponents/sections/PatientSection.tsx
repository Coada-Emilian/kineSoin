/**
 * @file PatientSection.tsx
 * @description A React functional component that displays the patient's information section within a profile. This component renders multiple `PatientOutput` components to present various details of the patient, such as age, gender, address, phone number, and associated therapist.
 *
 * @param {Object} props - The props for the PatientSection component.
 * @param {IPatient} props.patient - An object representing the patient's details to be displayed.
 *
 * @returns {JSX.Element} The rendered PatientSection component, which includes outputs for the patient's age, gender, address, phone number, and therapist information.
 */

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
