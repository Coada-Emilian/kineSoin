/**
 * @file TherapistOutput.tsx
 * @description A React functional component for displaying therapist details. Depending on the provided props, it can render the diploma, experience, specialty, description, or license code of the therapist.
 *
 * @param {Object} props - The props for the TherapistOutput component.
 * @param {ITherapist} props.therapist - The therapist object containing relevant information, such as diploma, experience, specialty, description, and license code.
 * @param {boolean} [props.isDiplomaOutput] - Indicates if the diploma should be displayed.
 * @param {boolean} [props.isExperienceOutput] - Indicates if the experience should be displayed.
 * @param {boolean} [props.isSpecialtyOutput] - Indicates if the specialty should be displayed.
 * @param {boolean} [props.isDescriptionOutput] - Indicates if the description should be displayed.
 * @param {boolean} [props.isLicenceCodeOutput] - Indicates if the license code should be displayed.
 *
 * @returns {JSX.Element} The rendered TherapistOutput component with appropriate information based on the provided props.
 */

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
