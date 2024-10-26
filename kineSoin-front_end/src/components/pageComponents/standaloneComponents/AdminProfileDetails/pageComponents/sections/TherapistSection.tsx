/**
 * @file TherapistSection.tsx
 * @description A React functional component that displays the therapist's information section within a profile. This component renders either input or output fields for various therapist details based on the editing state, allowing for both viewing and editing of the therapist's license code, diploma, experience, specialty, and description.
 *
 * @param {Object} props - The props for the TherapistSection component.
 * @param {boolean} props.isProfileEditing - A flag indicating whether the profile is currently in editing mode.
 * @param {ITherapist} props.therapist - An object representing the therapist's details to be displayed or edited.
 * @param {string} props.description - The current description of the therapist.
 * @param {React.Dispatch<React.SetStateAction<string>>} props.setDescription - A function to update the therapist's description in state.
 *
 * @returns {JSX.Element} The rendered TherapistSection component, which includes inputs or outputs for the therapist's license code, diploma, experience, specialty, and description based on the editing state.
 */

import { ITherapist } from '../../../../../../@types/ITherapist';
import TherapistInput from '../generalComponents/therapist/TherapistInput';
import TherapistOutput from '../generalComponents/therapist/TherapistOutput';

interface TherapistSectionProps {
  isProfileEditing: boolean;
  therapist: ITherapist;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function TherapistSection({
  isProfileEditing,
  therapist,
  description,
  setDescription,
}: TherapistSectionProps) {
  return (
    <>
      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <TherapistInput therapist={therapist} isLicenceCodeInput />
        ) : (
          <TherapistOutput therapist={therapist} isLicenceCodeOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <TherapistInput therapist={therapist} isDiplomaInput />
        ) : (
          <TherapistOutput therapist={therapist} isDiplomaOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <TherapistInput therapist={therapist} isExperienceInput />
        ) : (
          <TherapistOutput therapist={therapist} isExperienceOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <TherapistInput therapist={therapist} isSpecialtyInput />
        ) : (
          <TherapistOutput therapist={therapist} isSpecialtyOutput />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <TherapistInput
            therapist={therapist}
            description={description}
            setDescription={setDescription}
            isDescriptionInput
          />
        ) : (
          <TherapistOutput therapist={therapist} isDescriptionOutput />
        )}
      </section>
    </>
  );
}
