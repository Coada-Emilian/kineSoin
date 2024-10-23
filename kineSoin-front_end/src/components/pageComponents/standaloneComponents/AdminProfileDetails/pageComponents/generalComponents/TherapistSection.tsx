import { ITherapist } from '../../../../../../@types/ITherapist';
import Diploma from './Diploma';
import EditDiploma from './EditDiploma';
import EditExperience from './EditExperience';
import EditSpecialty from './EditSpecialty';
import EditTherapistDescription from './EditTherapistDescription';
import Experience from './Experience';
import Specialty from './Specialty';
import TherapistDescription from './TherapistDescription';

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
          <EditDiploma therapist={therapist} />
        ) : (
          <Diploma therapist={therapist} />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditExperience therapist={therapist} />
        ) : (
          <Experience therapist={therapist} />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditSpecialty therapist={therapist} />
        ) : (
          <Specialty therapist={therapist} />
        )}
      </section>

      <section className="mb-2 md:text-2xl">
        {isProfileEditing ? (
          <EditTherapistDescription
            therapist={therapist}
            description={description}
            setDescription={setDescription}
          />
        ) : (
          <TherapistDescription therapist={therapist} />
        )}
      </section>
    </>
  );
}
