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
