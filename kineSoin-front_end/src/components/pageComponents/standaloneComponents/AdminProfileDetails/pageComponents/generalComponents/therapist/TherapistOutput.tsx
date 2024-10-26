import { ITherapist } from '../../../../../../../@types/ITherapist';

interface TherapistOutputProps {
  therapist: ITherapist;
  isDiplomaOutput?: boolean;
  isExperienceOutput?: boolean;
  isSpecialtyOutput?: boolean;
  isDescriptionOutput?: boolean;
}

export default function TherapistOutput({
  therapist,
  isDiplomaOutput,
  isExperienceOutput,
  isSpecialtyOutput,
  isDescriptionOutput,
}: TherapistOutputProps) {
  return (
    <div className="md:text-2xl">
      <h4 className="font-bold ">
        {isDiplomaOutput
          ? 'Diplôme :'
          : isExperienceOutput
            ? 'Experience :'
            : isSpecialtyOutput
              ? 'Spécialité :'
              : isDescriptionOutput
                ? 'Description :'
                : ''}
      </h4>

      <span className="italic font-normal">
        {isDiplomaOutput
          ? therapist.diploma
          : isExperienceOutput
            ? therapist.experience
            : isSpecialtyOutput
              ? therapist.specialty
              : isDescriptionOutput
                ? therapist.description
                : ''}
      </span>
    </div>
  );
}
