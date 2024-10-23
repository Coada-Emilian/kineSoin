import { ITherapist } from '../../../../../../@types/ITherapist';
import Diploma from '../generalComponents/therapist/Diploma';
import EditDiploma from '../generalComponents/therapist/EditDiploma';
import EditExperience from '../generalComponents/therapist/EditExperience';
import EditSpecialty from '../generalComponents/therapist/EditSpecialty';
import EditTherapistDescription from '../generalComponents/therapist/EditTherapistDescription';
import Experience from '../generalComponents/therapist/Experience';
import Specialty from '../generalComponents/therapist/Specialty';
import TherapistDescription from '../generalComponents/therapist/TherapistDescription';

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
