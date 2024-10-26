import { ITherapist } from '../../../../../../../@types/ITherapist';

interface TherapistInputProps {
  therapist: ITherapist;
  isDiplomaInput?: boolean;
  isExperienceInput?: boolean;
  isSpecialtyInput?: boolean;
  isDescriptionInput?: boolean;
  description?: string;
  setDescription?: React.Dispatch<React.SetStateAction<string>>;
}

export default function TherapistInput({
  therapist,
  isDiplomaInput,
  isExperienceInput,
  isSpecialtyInput,
  isDescriptionInput,
  description,
  setDescription,
}: TherapistInputProps) {
  return (
    <div
      className={
        isDescriptionInput
          ? 'flex flex-col gap-2 justify-start mb-2'
          : 'flex gap-2 items-center mb-2 '
      }
    >
      <label
        htmlFor={`${isDiplomaInput ? 'therapist-diploma_input' : isExperienceInput ? 'therapist-experience_input' : isSpecialtyInput ? 'therapist-specialty_input' : isDescriptionInput ? 'therapist-description_input' : ''}`}
        className="font-semibold"
      >
        {isDiplomaInput
          ? 'Diplôme :'
          : isExperienceInput
            ? 'Expérience :'
            : isSpecialtyInput
              ? 'Spécialité :'
              : isDescriptionInput
                ? 'Description :'
                : ''}
      </label>

      {isDescriptionInput ? (
        <textarea
          name="description"
          id="therapist_description"
          className="border-2 border-gray-300 rounded-md px-2 font-normal italic "
          rows={7}
          placeholder={therapist.description}
          value={description}
          onChange={(e) => {
            if (setDescription) {
              setDescription(e.target.value);
            }
          }}
        ></textarea>
      ) : (
        <input
          type="text"
          name={`${isDiplomaInput ? 'diploma' : isExperienceInput ? 'experience' : isSpecialtyInput ? 'specialty' : ''}`}
          id={`${isDiplomaInput ? 'therapist-diploma_input' : isExperienceInput ? 'therapist-experience_input' : isSpecialtyInput ? 'therapist-specialty_input' : ''}`}
          className="border-2 border-gray-300 rounded-md px-2 italic"
          placeholder={
            isDiplomaInput
              ? therapist.diploma
              : isExperienceInput
                ? therapist.experience
                : isSpecialtyInput
                  ? therapist.specialty
                  : ''
          }
        />
      )}
    </div>
  );
}
