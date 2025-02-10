import { ITherapist } from '../../../../../../../@types/ITherapist';
import CommonInput from './CommonInput';
import GeneralOutput from './GeneralOutput';

interface ProfileSectionProps {
  isProfileEditing?: boolean;
  therapist?: ITherapist;
  isTherapistProfileSection?: boolean;
}

export default function ProfileSection({
  isProfileEditing,
  therapist,
  isTherapistProfileSection,
}: ProfileSectionProps) {
  return (
    <section className="mb-2 md:text-2xl">
      {isProfileEditing ? (
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
      )}
    </section>
  );
}
