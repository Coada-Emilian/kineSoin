import { IPatient } from '../../../../../../@types/IPatient';
import PatientAddress from '../generalComponents/patient/PatientAddress';
import PatientGenderAge from '../generalComponents/patient/PatientGenderAge';
import PatientPhoneNumber from '../generalComponents/patient/PatientPhoneNumber';
import PatientTherapist from '../generalComponents/patient/PatientTherapist';

interface PatientSectionProps {
  patient: IPatient;
}
export default function PatientSection({ patient }: PatientSectionProps) {
  return (
    <>
      <PatientGenderAge patient={patient} />
      <PatientAddress patient={patient} />
      <PatientPhoneNumber patient={patient} />
      <PatientTherapist patient={patient} />
    </>
  );
}
