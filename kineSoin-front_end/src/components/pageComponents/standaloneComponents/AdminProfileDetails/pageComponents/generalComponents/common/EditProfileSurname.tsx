import { ITherapist } from '../../../../../../../@types/ITherapist';

interface EditProfileSurnameProps {
  therapist?: ITherapist;
}

export default function EditProfileSurname({
  therapist,
}: EditProfileSurnameProps) {
  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="name" className="font-semibold">
        Prénom :
      </label>
      <input
        type="text"
        name="surname"
        id="therapist_surname"
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={therapist && therapist.surname}
      />
    </div>
  );
}
