// Purpose: Provide the TherapistInput component which displays the therapist's profile details input fields.

import { ITherapist } from '../../../../../../../@types/ITherapist';

interface TherapistOutputProps {
  therapist: ITherapist;
  isDiplomaOutput?: boolean;
  isExperienceOutput?: boolean;
  isSpecialtyOutput?: boolean;
  isDescriptionOutput?: boolean;
  isLicenceCodeOutput?: boolean;
}

export default function TherapistOutput({
  therapist,
  isDiplomaOutput,
  isExperienceOutput,
  isSpecialtyOutput,
  isDescriptionOutput,
  isLicenceCodeOutput,
}: TherapistOutputProps) {
  return (
    <div
      className={isLicenceCodeOutput ? 'md:text-2xl flex gap-1' : 'md:text-2xl'}
    >
      <h4 className="font-bold ">
        {isDiplomaOutput
          ? 'Diplôme :'
          : isExperienceOutput
            ? 'Experience :'
            : isSpecialtyOutput
              ? 'Spécialité :'
              : isDescriptionOutput
                ? 'Description :'
                : isLicenceCodeOutput
                  ? 'Code ADELI :'
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
                : isLicenceCodeOutput
                  ? therapist.licence_code
                  : ''}
      </span>
    </div>
  );
}
