import {
  IAffliction,
  IInsurance,
  IMedic,
  IPatient,
  ITherapist,
} from '../../../../../../../@types/types';
import GeneralInput from './GeneralInput';
import GeneralOutput from './GeneralOutput';

interface ProfileSectionProps {
  isProfileEditing?: boolean;
  therapist?: ITherapist;
  isTherapistProfileSection?: boolean;
  isPatientProfileSection?: boolean;
  patient?: IPatient;
  isAfflictionProfileSection?: boolean;
  affliction?: IAffliction;
  isMedicProfileSection?: boolean;
  medic?: IMedic;
  isInsuranceProfileSection?: boolean;
  insurance?: IInsurance;
}

export default function ProfileSection({
  isProfileEditing,
  therapist,
  isTherapistProfileSection,
  isPatientProfileSection,
  patient,
  isAfflictionProfileSection,
  affliction,
  isMedicProfileSection,
  medic,
  isInsuranceProfileSection,
  insurance,
}: ProfileSectionProps) {
  return (
    <section className="mb-2 md:text-2xl">
      {isTherapistProfileSection &&
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
      )}
    </section>
  );
}
