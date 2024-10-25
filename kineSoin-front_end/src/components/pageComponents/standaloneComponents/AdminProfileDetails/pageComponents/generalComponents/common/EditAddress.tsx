import { IInsurance } from '../../../../../../../@types/IInsurance';
import { IMedic } from '../../../../../../../@types/IMedic';

interface EditAddressProps {
  medic?: IMedic;
  insurance?: IInsurance;
}

export default function EditAddress({ medic, insurance }: EditAddressProps) {
  return (
    <>
      <div className="flex gap-2 items-center mb-2 ">
        <label htmlFor="medic-street_number" className="font-semibold">
          Numero rue :
        </label>
        <input
          type="text"
          name="street_number"
          id="medic-street_number"
          className="border-2 border-gray-300 rounded-md px-2 italic"
          placeholder={medic?.street_number || insurance?.street_number || ''}
        />
      </div>

      <div className="flex gap-2 items-center mb-2 ">
        <label htmlFor="medic-street_name" className="font-semibold">
          Nom rue :
        </label>
        <input
          type="text"
          name="street_name"
          id="medic-street_name"
          className="border-2 border-gray-300 rounded-md px-2 italic"
          placeholder={medic?.street_name || insurance?.street_name || ''}
        />
      </div>

      <div className="flex gap-2 items-center mb-2 ">
        <label htmlFor="medic-postal_code" className="font-semibold">
          Code postal :
        </label>
        <input
          type="text"
          name="postal_code"
          id="medic-postal_code"
          className="border-2 border-gray-300 rounded-md px-2 italic"
          placeholder={medic?.postal_code || insurance?.postal_code || ''}
        />
      </div>

      <div className="flex gap-2 items-center mb-2 ">
        <label htmlFor="medic-city" className="font-semibold">
          Ville :
        </label>
        <input
          type="text"
          name="city"
          id="medic-city"
          className="border-2 border-gray-300 rounded-md px-2 italic"
          placeholder={medic?.city || insurance?.city || ''}
        />
      </div>
    </>
  );
}
