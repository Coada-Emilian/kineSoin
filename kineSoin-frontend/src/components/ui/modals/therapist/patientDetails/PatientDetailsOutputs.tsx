import type { ITherapistPatientDetails } from '../../../../../@types/interfaces/therapistInterfaces';
import EntityAddressOutput from '../../../outputs/EntityAddressOutput';
import EntityEmailOutput from '../../../outputs/EntityEmailOutput';
import EntityNameOutput from '../../../outputs/EntityNameOutput';
import EntityTelephoneNumberOutput from '../../../outputs/EntityTelephoneNumberOutput';

interface PatientDetailsOutputsProps {
  patientDetails: NoInfer<ITherapistPatientDetails> | undefined;
}

export default function PatientDetailsOutputs({
  patientDetails,
}: PatientDetailsOutputsProps) {
  return (
    <>
      <EntityNameOutput
        name={patientDetails?.name || ''}
        surname={patientDetails?.surname || ''}
      />
      <EntityAddressOutput
        street_name={patientDetails?.street_name || ''}
        street_number={patientDetails?.street_number || ''}
        city={patientDetails?.city || ''}
        postal_code={patientDetails?.postal_code || ''}
      />
      <EntityTelephoneNumberOutput
        prefix={patientDetails?.prefix || ''}
        phone_number={patientDetails?.phone_number || ''}
      />
      <EntityEmailOutput email={patientDetails?.email || ''} />
    </>
  );
}
