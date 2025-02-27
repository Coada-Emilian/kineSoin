import { IParticularEntityDetails } from '../../../../../../../@types/customTypes';
import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/standardTypes';
import GeneralInput from './GeneralInput';
import GeneralOutput from './GeneralOutput';
import DiplomaOutputRefactor from './Outputs/DiplomaOutputRefactor';
import LicenceCodeOutputRefactor from './Outputs/LicenceCodeOutputRefactor';

interface ProfileSectionRefactorProps {
  isProfileEditing?: boolean;
  entityType: string | undefined;
  entity:
    | ITherapist
    | IPatient
    | IAffliction
    | IMedic
    | IInsurance
    | null
    | undefined;
}

export default function ProfileSectionRefactor({
  isProfileEditing,
  entityType,
  entity,
}: ProfileSectionRefactorProps) {
  const entityDetails: IParticularEntityDetails = entity
    ? {
        licence_code:
          'licence_code' in entity
            ? entity.licence_code || undefined
            : undefined,
        amc_code:
          entity && 'amc_code' in entity
            ? entity.amc_code || undefined
            : undefined,
        insurance_code:
          entity && 'insurance_code' in entity
            ? entity.insurance_code || undefined
            : undefined,
        diploma:
          entity && 'diploma' in entity
            ? entity.diploma || undefined
            : undefined,
        experience:
          entity && 'experience' in entity
            ? entity.experience || undefined
            : undefined,
        specialty:
          entity && 'specialty' in entity
            ? entity.specialty || undefined
            : undefined,
        phoneNumber:
          entity && 'phoneNumber' in entity
            ? typeof entity.phoneNumber === 'string'
              ? entity.phoneNumber
              : undefined
            : undefined,
        description:
          entity && 'description' in entity
            ? entity.description || undefined
            : undefined,
      }
    : {};

  return (
    <section className="mb-2 md:text-2xl">
      <LicenceCodeOutputRefactor licence_code={entityDetails.licence_code} />
      <DiplomaOutputRefactor diploma={entityDetails.diploma} />

      {/* {isTherapistProfileSection &&
        (isProfileEditing ? (
          <>
            <GeneralInput therapist={therapist} isTherapistLicenceCodeInput />
            <GeneralInput therapist={therapist} isTherapistDiplomaInput />
            <GeneralInput therapist={therapist} isTherapistExperienceInput />
            <GeneralInput therapist={therapist} isTherapistSpecialtyInput />
            <GeneralInput therapist={therapist} isTherapistPhoneNumberInput />
            <GeneralInput therapist={therapist} isTherapistDescriptionInput />
          </>
        ) : (
          <>
            <GeneralOutput therapist={therapist} isProfileLicenceCodeOutput />
            <GeneralOutput therapist={therapist} isTherapistDiplomaOutput />
            <GeneralOutput therapist={therapist} isTherapistExperienceOutput />
            <GeneralOutput therapist={therapist} isTherapistSpecialtyOutput />
            <GeneralOutput therapist={therapist} isTherapistPhoneNumberOutput />
            <GeneralOutput therapist={therapist} isTherapistDescriptionOutput />
          </>
        ))}

      {isPatientProfileSection && (
        <>
          <GeneralOutput patient={patient} isPatientAgeGenderOutput />
          <GeneralOutput patient={patient} isPatientAddressOutput />
          <GeneralOutput patient={patient} isPatientPhoneNumberOutput />
          <GeneralOutput patient={patient} isPatientTherapistOutput />
        </>
      )}

      {isAfflictionProfileSection &&
        (isProfileEditing ? (
          <>
            <GeneralInput affliction={affliction} isAfflictionRegionInput />
            <GeneralInput
              affliction={affliction}
              isAfflictionInsuranceCodeInput
            />
            <GeneralInput affliction={affliction} isAfflictionOperatedInput />
            <GeneralInput
              affliction={affliction}
              isAfflictionDescriptionInput
            />
          </>
        ) : (
          <>
            <GeneralOutput affliction={affliction} isAfflictionRegionOutput />
            <GeneralOutput
              affliction={affliction}
              isAfflictionInsuranceCodeOutput
            />
            <GeneralOutput affliction={affliction} isAfflictionOperatedOutput />
            <GeneralOutput
              affliction={affliction}
              isAfflictionDescriptionOutput
            />
          </>
        ))}

      {isMedicProfileSection &&
        (isProfileEditing ? (
          <>
            <GeneralInput medic={medic} isMedicAddressInput />
            <GeneralInput medic={medic} isMedicPhoneNumberInput />
            <GeneralInput medic={medic} isMedicLicenceCodeInput />
          </>
        ) : (
          <>
            <GeneralOutput medic={medic} isMedicAddressOutput />
            <GeneralOutput medic={medic} isMedicPhoneNumberOutput />
            <GeneralOutput medic={medic} isMedicLicenceCodeOutput />
          </>
        ))}

      {isInsuranceProfileSection && (
        <>
          {isProfileEditing ? (
            <>
              <GeneralInput insurance={insurance} isInsuranceAddressInput />
              <GeneralInput insurance={insurance} isInsurancePhoneNumberInput />
              <GeneralInput insurance={insurance} isInsuranceAMCCodeInput />
            </>
          ) : (
            <>
              <GeneralOutput insurance={insurance} isInsuranceAddressOutput />
              <GeneralOutput
                insurance={insurance}
                isInsurancePhoneNumberOutput
              />
              <GeneralOutput insurance={insurance} isInsuranceAMCCodeOutput />
            </>
          )}
        </>
      )} */}
    </section>
  );
}
