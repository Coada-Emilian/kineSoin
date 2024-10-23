import { ITherapist } from '../../../../../../@types/ITherapist';
import Diploma from '../generalComponents/Diploma';
import EditDiploma from '../generalComponents/EditDiploma';
import EditExperience from '../generalComponents/EditExperience';
import EditSpecialty from '../generalComponents/EditSpecialty';
import EditTherapistDescription from '../generalComponents/EditTherapistDescription';
import Experience from '../generalComponents/Experience';
import Specialty from '../generalComponents/Specialty';
import TherapistDescription from '../generalComponents/TherapistDescription';

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
