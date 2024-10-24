import { IMedic } from '../../../../../../../@types/IMedic';

interface EditPhoneNumberProps {
  medic: IMedic;
}

export default function EditPhoneNumber({ medic }: EditPhoneNumberProps) {
  return (
    <div className="flex gap-2 items-center mb-2 ">
      <label htmlFor="medic-phone_number" className="font-semibold">
        Numero telephone :
      </label>
      <input
        type="text"
        name="phone_number"
        id="medic-phone_number"
        className="border-2 border-gray-300 rounded-md px-2 italic"
        placeholder={medic.phone_number || ''}
      />
    </div>
  );
}
