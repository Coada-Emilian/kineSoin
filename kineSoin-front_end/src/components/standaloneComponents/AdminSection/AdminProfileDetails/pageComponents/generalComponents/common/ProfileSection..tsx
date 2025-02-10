import { IAffliction } from '../../../../../../../@types/IAffliction';
import { IPatient } from '../../../../../../../@types/IPatient';
import { ITherapist } from '../../../../../../../@types/ITherapist';
import CommonInput from './CommonInput';
import GeneralOutput from './GeneralOutput';

interface ProfileSectionProps {
  isProfileEditing?: boolean;
  therapist?: ITherapist;
  isTherapistProfileSection?: boolean;
  isPatientProfileSection?: boolean;
  patient?: IPatient;
  isAfflictionProfileSection?: boolean;
  affliction?: IAffliction;
}

export default function ProfileSection({
  isProfileEditing,
  therapist,
  isTherapistProfileSection,
  isPatientProfileSection,
  patient,
  isAfflictionProfileSection,
  affliction,
}: ProfileSectionProps) {
  return (
    <section className="mb-2 md:text-2xl">
      {isTherapistProfileSection &&
        (isProfileEditing ? (
          <>
            <CommonInput therapist={therapist} isTherapistLicenceCodeInput />
            <CommonInput therapist={therapist} isTherapistDiplomaInput />
            <CommonInput therapist={therapist} isTherapistExperienceInput />
            <CommonInput therapist={therapist} isTherapistSpecialtyInput />
            <CommonInput therapist={therapist} isTherapistDescriptionInput />
          </>
        ) : (
          <>
            <GeneralOutput therapist={therapist} isProfileLicenceCodeOutput />
            <GeneralOutput therapist={therapist} isTherapistDiplomaOutput />
            <GeneralOutput therapist={therapist} isTherapistExperienceOutput />
            <GeneralOutput therapist={therapist} isTherapistSpecialtyOutput />
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
            <CommonInput affliction={affliction} isAfflictionRegionInput />
            <CommonInput
              affliction={affliction}
              isAfflictionInsuranceCodeInput
            />
            <CommonInput affliction={affliction} isAfflictionOperatedInput />
            <CommonInput affliction={affliction} isAfflictionDescriptionInput />
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
    </section>
  );
}
