import { IAffliction } from '../../../../../../@types/IAffliction';
import { ITherapist } from '../../../../../../@types/ITherapist';

interface EditProfileNameProps {
  therapist?: ITherapist | null;
  affliction?: IAffliction | null;
}

export default function EditProfileName({
  therapist,
  affliction,
}: EditProfileNameProps) {
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor={`${therapist ? 'therapist_name' : ''}${affliction ? ' affliction_name' : ''}`.trim()}
        className="font-semibold"
      >
        Nom :
      </label>
      <input
        type="text"
        name="name"
        id={`${therapist ? 'therapist_name' : ''}${affliction ? ' affliction_name' : ''}`.trim()}
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={
          (therapist && therapist.name) ||
          (affliction && affliction.name) ||
          undefined
        }
      />
    </div>
  );
}
