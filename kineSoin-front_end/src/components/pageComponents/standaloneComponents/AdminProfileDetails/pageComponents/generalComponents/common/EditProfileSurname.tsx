/**
 * @file EditProfileSurname.tsx
 * @description A React functional component that renders an editable surname field for therapist or medic profiles. The input field label and placeholder dynamically update based on the profile type passed as props.
 *
 * @param {Object} props - The props for the EditProfileSurname component.
 * @param {ITherapist | null} [props.therapist] - Optional therapist object containing profile details, including the surname.
 * @param {IMedic | null} [props.medic] - Optional medic object containing profile details, including the surname.
 *
 * @returns {JSX.Element} The rendered EditProfileSurname component, displaying an input field with a dynamic label and placeholder based on the profile type.
 */

import { IMedic } from '../../../../../../../@types/IMedic';
import { ITherapist } from '../../../../../../../@types/ITherapist';

interface EditProfileSurnameProps {
  therapist?: ITherapist | null;
  medic?: IMedic | null;
}

export default function EditProfileSurname({
  therapist,
  medic,
}: EditProfileSurnameProps) {
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor={`${therapist ? 'therapist_surname' : medic ? 'medic_surname' : ''}`}
        className="font-semibold"
      >
        Prénom :
      </label>
      <input
        type="text"
        name="surname"
        id={`${therapist ? 'therapist_surname' : medic ? 'medic_surname' : ''}`}
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={therapist ? therapist.surname : medic ? medic.surname : ''}
      />
    </div>
  );
}
