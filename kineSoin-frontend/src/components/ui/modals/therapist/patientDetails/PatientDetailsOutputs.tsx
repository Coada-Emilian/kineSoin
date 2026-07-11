import type { ITherapistPatientDetails } from '../../../../../@types/interfaces/therapistInterfaces';
import { hasValues } from '../../../../../utils/functions/admin/adminEntityProfile/hasValues';
import EntityAddressOutput from '../../../outputs/EntityAddressOutput';
import EntityAgeAndGenderOutput from '../../../outputs/EntityAgeAndGenderOutput';
import EntityEmailOutput from '../../../outputs/EntityEmailOutput';
import EntityTelephoneNumberOutput from '../../../outputs/EntityTelephoneNumberOutput';

interface PatientDetailsOutputsProps {
  patientDetails: ITherapistPatientDetails | undefined;
}

export default function PatientDetailsOutputs({
  patientDetails,
}: PatientDetailsOutputsProps) {
  return (
    <>
      {hasValues(String(patientDetails?.age), patientDetails?.gender) && (
        <EntityAgeAndGenderOutput
          age={patientDetails?.age ? String(patientDetails?.age) : ''}
          gender={patientDetails?.gender}
        />
      )}

      {hasValues(
        patientDetails?.street_name,
        patientDetails?.street_number,
        patientDetails?.city,
        patientDetails?.postal_code
      ) && (
        <EntityAddressOutput
          street_name={patientDetails?.street_name}
          street_number={patientDetails?.street_number}
          city={patientDetails?.city}
          postal_code={patientDetails?.postal_code}
        />
      )}

      {hasValues(patientDetails?.prefix, patientDetails?.phone_number) && (
        <a
          href={`tel:${patientDetails?.prefix}${patientDetails?.phone_number}`}
          className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
        >
          {' '}
          <EntityTelephoneNumberOutput
            prefix={patientDetails?.prefix}
            phone_number={patientDetails?.phone_number}
          />
        </a>
      )}

      {hasValues(patientDetails?.email) && (
        <a
          href={`mailto:${patientDetails?.email}`}
          className="hover:animate-pulse hover:ease-in-out hover:delay-200 hover:scale-110"
        >
          {' '}
          <EntityEmailOutput email={patientDetails?.email} />
        </a>
      )}
    </>
  );
}
