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
