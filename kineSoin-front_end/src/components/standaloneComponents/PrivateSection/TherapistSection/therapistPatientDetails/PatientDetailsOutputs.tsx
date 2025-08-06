import { usePatientsContext } from '../../../../../utils/contexts/therapistSectionContext/PatientsContext';
import { useTherapistContext } from '../../../../../utils/contexts/therapistSectionContext/TherapistContext';
import { useUIContext } from '../../../../../utils/contexts/therapistSectionContext/UIContext';
import {
  AddressOutputRefactor,
  EmailOutputRefactor,
  NameOutputRefactor,
  PhoneNumberOutputRefactor,
} from '../../../generalComponents/standardOutputs';
import InsuranceNameOutput from '../../../generalComponents/standardOutputs/InsuranceNameOutput';
import TherapistOutput from '../../../generalComponents/standardOutputs/TherapistOutput';
import InsuranceValidityOutput from './InsuranceValidityOutput';
import TherapistDropdownInput from './TherapistDropdownInput';

export default function PatientDetailsOutputs() {
  const { patientDetails } = usePatientsContext();

  const { isPatientProfileEditing } = useUIContext();

  const { therapistProfiles } = useTherapistContext();

  return (
    <>
      <NameOutputRefactor
        name={patientDetails?.name}
        surname={patientDetails?.surname}
      />

      <AddressOutputRefactor
        city={patientDetails?.city}
        postal_code={patientDetails?.postal_code}
        street_name={patientDetails?.street_name}
        street_number={patientDetails?.street_number}
      />

      <PhoneNumberOutputRefactor
        prefix={patientDetails?.prefix}
        phone_number={patientDetails?.phone_number}
      />

      <EmailOutputRefactor email={patientDetails?.email} />

      {isPatientProfileEditing ? (
        <TherapistDropdownInput
          therapistId={patientDetails?.therapist.id ?? 0}
          therapistFullName={`${patientDetails?.therapist.name} ${patientDetails?.therapist.surname}`}
          therapistProfiles={therapistProfiles}
        />
      ) : (
        <TherapistOutput
          therapist_name={patientDetails?.therapist.name}
          therapist_surname={patientDetails?.therapist.surname}
        />
      )}

      <InsuranceNameOutput
        insuranceName={patientDetails?.insurance_details.insurance.name}
      />

      <InsuranceValidityOutput />
    </>
  );
}
